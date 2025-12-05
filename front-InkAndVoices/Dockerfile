FROM node:24-alpine3.22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app
CMD ["npm", "run", "dev"]