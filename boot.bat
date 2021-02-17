@echo off

mvn clean install spring-boot:run -Dspring-boot.run.arguments=--server.port=8081  -DskipTests -Dmaven.test.skip=true