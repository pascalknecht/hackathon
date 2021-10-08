FROM node:alpine

WORKDIR /app

COPY . .

# COPY package.json package.json
RUN npm install
RUN npm run build

CMD ["npx", "next", "start", "-p", "3000"]