#Build static assets from React
FROM openjdk:8-jdk-alpine

ADD target/springboot-docker-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8080