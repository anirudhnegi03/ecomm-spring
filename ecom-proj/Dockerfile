FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B

COPY . .

RUN mvn clean package -DskipTests

CMD ["java", "-jar", "target/ecom-proj-0.0.1-SNAPSHOT.jar"]
