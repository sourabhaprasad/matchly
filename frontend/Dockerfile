FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Don't add `next build` or `next start` for development mode
CMD ["npm", "run", "dev"]
