Password manager project

Dependencies :

1- backage.json

Config :

1- .env file

you can't find it as it is ignored in .gitignore

example :

create .env file and copy paste the following

PORT = 7000 
MONGO_DNS_SRV = "mongodb+srv://" 
MONGO_AUTH = "rawdaGastan:test" 
MONGO_CLUSTER = "@cluster0.1fxx3.mongodb.net/" 
MONGO_DB_NAME = myFirstDatabase
MONGO_OPTIONS = "?retryWrites=true&w=majority" 

Dockerfile : you will find it --> 
1- clone the project 
2- create .env file as shown in examples in config 
3- in the terminal : cd to the location of the folder 
4- in the terminal : docker build -t codescalers . 
5- in the terminal : docker run -p 3000:3000 codescalers
6- open http://localhost:3000/

Docker-Compose : Same for dockerfile but in terminal write : docker-compose up

If you do not want to use docker:
1- open the terminal then write --> npm i
2- write --> node index.js
3- open http://localhost:3000/

For testing: open the terminal then write --> npm test