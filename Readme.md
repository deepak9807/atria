
# Project Detail:

## Backend: Python/Django
## DB: Sqlite

##Frontend: ReactJs
## Node: 8+

# Install Application via Docker

step 1: install docker composer  and docker in Linux
https://docs.docker.com/install/linux/docker-ce/ubuntu/
https://docs.docker.com/compose/install/

step 2: Clone the git code.

step 3: cd atria

step 4: Run docker composer 
$ sudo docker-compose up

step 5: Open Browser.
 http:localhost:3000

# REST API Detail.

## Import atria.postman_collection json file in Post

or 
## Base URL: http://13.126.158.36:3000

Store a sensor Data:

Endpoint: http://13.126.158.36:8000/sensor/add/
Method: POST
Body:
{
	"reading":"21",
	"timestamp":"2019-09-11T06:34:22.324850Z",
	"sensorType":"atria"
}

Get sensor Data:http://13.126.158.36:8000/sensor/data?startDate=2019-01-10&endDate=2019-09-11
Endpoint: GET
parmas: startDate, endDate

LineChar API: http://13.126.158.36:8000/sensor/chart?startDate=2019-01-10&endDate=2019-09-11
Endpoint GET:
parmas:startDate, endDate





