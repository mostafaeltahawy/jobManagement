import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Job {
  id: string;
  status: string;
  result: string | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  jobCard: {
    padding: theme.spacing(2),
  },
  image: {
    marginTop: theme.spacing(2),
    width: "20%",
    height: "auto",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState<"pending" | "completed">(
    "pending"
  );

  useEffect(() => {
    fetchJobs();
    setInterval(fetchJobs, 3000); // Fetch jobs every 3 seconds
  }, []);

  const fetchJobs = () => {
    axios
      .get<Job[]>("http://localhost:3000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  const createJob = async () => {
    try {
      const response = await axios.post("http://localhost:3000/jobs");
      const jobId = response.data.id;
      console.log(`Job created with ID: ${jobId}`);

      // Update the state to add the new job instead of replacing the existing jobs
      setJobs((prevJobs) => [
        ...prevJobs,
        { id: jobId, status: "pending", result: null },
      ]);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Controls filter
  const handleStatusFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value as "pending" | "completed");
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Job Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={createJob}
            className={classes.button}
          >
            Create Job
          </Button>
        </Grid>

        <Grid item xs={10}>
          <RadioGroup
            row
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            ({jobs.filter((job) => job.status === "pending").length}){" "}
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            ({jobs.filter((job) => job.status === "completed").length}){" "}
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
          </RadioGroup>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.root}>
        {jobs
          .filter((job) => job.status === statusFilter) //filter based on the status state
          .map((job) => (
            <Grid item xs={6} key={job.id}>
              <Card className={classes.jobCard}>
                <CardContent>
                  <Typography variant="h6">Job ID: {job.id}</Typography>
                  <Typography>
                    Status:{" "}
                    {job.status === "completed" ? "Completed" : "Pending"}
                  </Typography>
                  {/* Show loader for pending and result image if completed */}
                  {job.status === "completed" ? (
                    <img
                      src={job.result || undefined}
                      alt="food"
                      className={classes.image}
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default App;
