FROM node:12.18.3
WORKDIR /app
ADD . /app
RUN npm i
RUN npm run build
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
