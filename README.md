# Full Stuck To-Do-Application
## Technology
##### this application is used => MySql, Django with Django Rest Framework, ReactJS with Redux.

## Introductions
This project was made to practice how to implement a backend application with `Django and Django REST Framework` and frontend with `ReactJS and Redux`, implementing endpoints for GET,POST,PATCH,DELETE, also we made a full Authentication system so all of the endpoint need an authorization, And this project it has been tested for the best practice.

## Getting Started
After clone the project you have to follow the instructions:
- Go to [`./frontend`](./frontend) and run this command `npm install` to install all the dependencies.
- After npm modules has been installed run this command `npm run build` to build frontend project and move it to the backend folder.
- Go to [`./backend`](./backend) and run this command to create a virtual env `virtualenv venv` or `python3 -m venv env` and after activated the venv run this command to install all dependencies `pip install -r requirements.txt`
- In the [`./backend/todo/settings.py`](./backend/todo/settings.py) there some variables that used env file so you need to create `.env` in [`./backend`](./backend) and this file you have to specify some variables:
  - SECRET_KEY
  - DEBUG
  - SITE_URL
  - EMAIL_USER
  - EMAIL_PASSWORD
  - MYSQL_NAME
  - MYSQL_HOST
  - MYSQL_PORT
  - MYSQL_USER
  - MYSQL_PASSWORD
- After done with all these step last step is to run the project with this command `python manage.py runserver` make sure you have activate venv
  

Then you can see the project on this URL => http://localhost:8000

## Testing
for testing the project you can run this command `python manage.py test`
if you want to do testing on `Postman` then the base APIs are:
> Todo: http://localhost:8000/home/todos/
> Authentication: http://localhost/auth/users/
> JWT: http://localhost/auth/jwt/