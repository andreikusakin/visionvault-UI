FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14
RUN npm install -g serve
COPY --from=build /app/build ./build

ENV PORT=5000

# Expose the port the app runs on
EXPOSE $PORT

# Run the app. Note that we use "0.0.0.0:$PORT"
CMD ["sh", "-c", "serve -s build -l tcp://0.0.0.0:$PORT"]