FROM node:12-alpine
ENV NODE_ENV production
RUN apk add --no-cache bash python2 g++ make
WORKDIR "/app"
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
USER node
CMD ["npm", "run", "start"]
