#Build static assets from React
FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Development Env - Starts app on local machine
# EXPOSE 3000
# CMD ["npm", "start"]
#Production Env - Creates static files
RUN npm run build


FROM nginx
#Copy static assets created in 'npm run build' in first stage into nginx static file location
COPY --from=0 /app/build /usr/share/nginx/html