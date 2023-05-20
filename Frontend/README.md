# Job Management Application

This is a job management application that allows you to create and track jobs for retrieving random images from the Unsplash API. Jobs can be created on the client side, and their status and results can be viewed in real time.

## Features

- Create new jobs and retrieve their IDs
- View a list of jobs with their status
- Display the results of completed jobs (random food images from Unsplash)

## Technologies Used

- Backend: Node.js with Express
- Frontend: React
- UI Framework: Material-UI

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   git clone https://github.com/your-username/job-management.git

2. Navigate to the project directory:

   cd job-management

3. Install the dependencies for both the backend and frontend:

   cd backend
   npm install

   cd ../frontend
   npm install

### Usage

1. Start the backend server:

   cd backend
   npm start

   The backend server will be running at [http://localhost:3000](http://localhost:3000).

2. Start the frontend development server:

   cd frontend
   npm start

   The frontend development server will be running at [http://localhost:3001](http://localhost:3001).

3. Open your browser and navigate to [http://localhost:3001](http://localhost:3001) to access the Job Management application.

### API Endpoints

- `POST /jobs`: Creates a new job and returns its ID.
- `GET /jobs`: Retrieves a list of all jobs.
- `GET /jobs/{jobId}`: Retrieves a specific job by its ID.

### Job Execution

Jobs are executed in the background by periodically checking for pending jobs and retrieving random food images from the Unsplash API. The delay for each job execution is random and can take between 5 seconds to 5 minutes, with a 5-second step.

### Highload Considerations

The application is designed to handle high loads with multiple pending jobs. Jobs are processed asynchronously, and the job management system can scale to handle a large number of concurrent requests.

### File-based Data Storage

The application uses file-based storage to store job data. Jobs are stored in a JSON file named `jobDB.json`. This simple storage solution avoids the need for a database and keeps the application setup simple.

## Time Report

The following is a breakdown of the time spent on each section and other aspects of the project:

- Understanding the Task: 10mins
  - Familiarizing myself with the requirements and clarifying any ambiguities.
  - Analyzing the expected functionality and desired outcomes.

- Backend Development: 1.5 hours
  - Setting up the backend server using the chosen Node.js framework (Express).
  - Implementing the necessary API endpoints for creating, retrieving, and updating jobs: 1 hour
  - Integrating the Unsplash API and handling job execution and result retrieval: 30 mins
  - Testing and debugging the backend functionality.

- Frontend Development: 1.5 hour
  - Setting up the React project and installing necessary dependencies.
  - Designing and implementing the UI components using Material-UI.
  - Implementing data fetching and state management for displaying jobs and their results.
  - Handling user interactions, such as creating new jobs and filtering job statuses.
  - Styling the UI to achieve the desired look and feel.
  - Testing and debugging the frontend functionality.

- Documentation and Readme: 0.5 hour
  - Writing the project documentation, including the README file.
  - Providing clear setup instructions and explanations of the implemented solution.
  - Reviewing and proofreading the documentation for accuracy and clarity.

