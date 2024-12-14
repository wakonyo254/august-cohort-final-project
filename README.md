# august-cohort-final-project
# Heath Heroes System

Welcome to Health Heroes Site! This project helps users engage in health-related challenges. It's built using Node.js, Ejs templates and a backend system.

Before you run this project locally, ensure you have Node.js in place .

## Getting Started

1. Clone the Repository 

First, you need to clone the repository to your local machine. Open your terminal and run the following command:
git clone <repository-url>

2. Install Dependencies

Run the following commands to install the necessary dependencies to run this application: 

npm install express bcryptjs body-parser dotenv ejs express-mysql-session express-session express-validator mysql2 

3. Configure Environment
Create a .env file in the root folder and modify the following :
DB_HOST=localhost
DB_USER=root
DB_PASSWORD='replace with your password'
DB_NAME= add your database name here
SESSION_SECRET=asdfghjkmnbvcxdyuiuytrsd
PORT=4200

4. Running the application

After installing the dependencies, you can start the application . Open the terminal and run either of the below commands:

npm nodemon server.js
npm node server.js

The above will launch the server and application will be accessible via a url created on the terminal

5. Accessing the application

Open your browser and navigate to the url created on your terminal to view Health Heroes Webpage Applicatuion.

6. Contributing to the project

To contribute to the project follow the steps below:
> Fork the repository.
  Click the Fork button at the top-right of the repository to create a personal copy of the project.
> Clone your Fork
  Clone the forked repository on your local machine 
  git clone <your-forked-repository-url>
> Make desired changes.
> Commit the changes.
> Push to Your Fork.
> Create a pull request.
> Review and merge.