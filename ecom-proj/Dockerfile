# Use Eclipse Temurin JDK 17 (stable)
FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Give execute permission to mvnw
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Run the jar
CMD ["java", "-jar", "target/ecom-proj-0.0.1-SNAPSHOT.jar"]
