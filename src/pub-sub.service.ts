import { PubSub, Subscription, Topic, Message } from '@google-cloud/pubsub';
import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import commonEnv from './config/CommonEnv.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class PubSubService implements OnModuleInit, OnModuleDestroy {
  protected readonly client: PubSub;
  protected readonly subscription: Subscription;
  protected readonly topic: Topic;

  constructor(
    @Inject(commonEnv.KEY) commonEnvConfig: ConfigType<typeof commonEnv>,
  ) {
    this.client = new PubSub({
      projectId: commonEnvConfig.PROJECT_ID,
    });
    this.topic = this.client.topic(commonEnvConfig.PUB_SUB_TOPIC_ID);
    this.subscription = this.topic.subscription(
      commonEnvConfig.PUB_SUB_SUBSCRIPTION_ID,
    );
  }

  onModuleInit() {
    this.subscription
      .on('message', (message: Message) => {
        console.log('MESAJE DATA: ', JSON.parse(message.data.toString()));
        message.ack();
      })
      .on('error', (error) => {
        console.error(error);
      });
  }

  async publicMessage(data: any) {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
      const messageId = await this.topic.publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.subscription.close();
    await this.client.close();
  }
}
