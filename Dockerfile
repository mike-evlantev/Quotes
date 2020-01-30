# Docker will run a Node.js 10.15.3-alpine runtime
FROM node:10.15.3-alpine

# Working directory where package.json and package-lock.json live
# WORKDIR /usr/src/app
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g pm2

# Copy code base (with dependencies) to WORKDIR from above
COPY . ./

# Expose ports for API and ES
EXPOSE 3000
EXPOSE 9200

# Command that starts the app
CMD npm run start

# https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/

# https://github.com/micheleriva/the-quotes-database/blob/master/src/server/index.js