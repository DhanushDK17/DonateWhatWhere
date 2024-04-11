This repository contains Backend (Spring boot), Angular frontend and Description Generator Service

** Backend Server **
1. Before you start the spring boot server, Please add the mongodb url to the properties file
2. use ./mvnw spring-boot:run to start the server
3. All APIs except ones prefixed with api/auth/ and some more will need auth tokens in its header

** Description Service **
1. Activate python venv inside descriptionai/descriptionservice
3. install packages from requirements.txt
2. start the service using uvicorn main:app --reload
