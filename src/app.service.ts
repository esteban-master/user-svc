import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import commonEnv from './config/CommonEnv.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject(commonEnv.KEY)
    private readonly commonEnvConfig: ConfigType<typeof commonEnv>,
  ) {}

  async validateUser({ email, name }: { email: string; name: string }) {
    const findUser = await this.findUser(email);
    if (findUser) {
      const [accessToken, refreshToken] = await this.createTokens({
        email: findUser.email,
        id: findUser.id,
      });

      const user = await this.updateRefreshToken({
        userId: findUser.id,
        refreshToken,
      });

      return {
        ...user,
        accessToken,
        refreshToken,
      };
    }
    return await this.createUser({ email, name });
  }

  async createTokens({ email, id }: { email: string; id: string | number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { email, id },
        { secret: this.commonEnvConfig.JWT_ACCESS_SECRET, expiresIn: '1h' },
      ),
      this.jwt.signAsync(
        { email, id },
        { secret: this.commonEnvConfig.JWT_REFRESH_SECRET, expiresIn: '15d' },
      ),
    ]);
    return [accessToken, refreshToken];
  }

  async createUser({ email, name }: { email: string; name: string }) {
    try {
      const createUser = await this.prisma.user.create({
        data: { email, name },
      });
      const [accessToken, refreshToken] = await this.createTokens({
        email,
        id: createUser.id,
      });
      const user = await this.updateRefreshToken({
        userId: createUser.id,
        refreshToken,
      });
      return { ...user, accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  async updateRefreshToken({
    userId,
    refreshToken,
  }: {
    userId: number;
    refreshToken: string;
  }) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
}
