FROM node:18.12.1-alpine AS development

WORKDIR /app

ENV NODE_ENV development

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "start:migrate:dev"]

FROM node:18.12.1-alpine AS build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:18.12.1-alpine AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build /app/prisma ./prisma
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]