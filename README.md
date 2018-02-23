### Clone
Run the command: `git clone https://github.com/MagnusGreiff/server.git` and it will download the source code.

### Installation
When standing in the root directory run the command: `npm install` and it will install all the dependencies.

### Starting the server
To start the server run the command `npm start` and it will start om port 3000 or if DBWEBB_PORT if defined it will use that instead.


### Testing
Run the command: `make test` to test the source code.


### Docker Testing
To run the tests in a docker container please use the following commands: `make test1` <- node 8.6.0, `make test2` <- node 8.3.0, `make test3` <- node 8.1.0

### Run the code via docker
To start the server via docker run the command: `make start-docker`.
