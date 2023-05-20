const express = require("express");
const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");

const app = express();
app.use(cors());

let jobDB = [];

// Load jobs from the file on server startup
fs.readFile("jobDB.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading jobDB.json:", err);
  } else {
    jobDB = JSON.parse(data);
  }
});

// Function to write jobs to the file
const writeJobsToFile = () => {
  fs.writeFile("jobDB.json", JSON.stringify(jobDB, null, 2), (err) => {
    if (err) {
      console.error("Error writing jobDB.json:", err);
    }
  });
};

// Create new job
app.post("/jobs", (req, res) => {
  const id = uuidv4();
  const newJob = {
    id,
    status: "pending",
    result: null,
  };

  jobDB.push(newJob);

  writeJobsToFile();
  res.json({ id });
});

// retrieve jobs 
app.get("/jobs", (req, res) => {
  jobDB = JSON.parse(fs.readFileSync("jobDB.json"));
  res.json(jobDB);
});

// retrieve single job
app.get("/jobs/:id", (req, res) => {
  const job = jobDB.find((job) => job.id === req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found." });
  }
});

// update the jobs status with the random delay
const updateJobStatus = () => {
  const jobData = fs.readFileSync("jobDB.json", "utf8");
  const jobDB = JSON.parse(jobData);

  for (let i = 0; i < jobDB.length; i++) {
    const job = jobDB[i];
    if (job.status === "pending" && job.result === null) {
      axios
        .get("https://api.unsplash.com/photos/random", {
          params: {
            query: "food",
            client_id: "vFGL0hbiwxv2G-u5WzBvFX35Isxzb3v1_1sUAAiUim8",
          },
        })
        .then((response) => {
          jobDB[i].status = "completed";
          jobDB[i].result = response.data.urls.regular;

          writeJobsToFile();
          console.log(`Job ID ${job.id} completed. Image URL added.`);
        });
      break; //One update at a time
    }
  }
};

// Random delay between 5 seconds to 5 minutes with 5 seconds step
setInterval(updateJobStatus, Math.floor(Math.random() * 300000) + 5000);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
