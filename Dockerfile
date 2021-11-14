FROM node:16.13.0-alpine3.14 as frontend
WORKDIR /static
COPY frontend .
RUN npm ci
RUN npm run build

FROM maven:3.8.3-openjdk-11-slim as backend
WORKDIR /source
COPY backend .
COPY --from=frontend /static/dist/library-management/ ./src/main/resources/static
RUN mvn package -DskipTests

FROM openjdk:11
WORKDIR /app
COPY --from=backend /source/target/library-management.jar .
ENTRYPOINT ["java", "-jar", "library-management.jar"]
