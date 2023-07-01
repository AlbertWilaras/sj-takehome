import { Grid } from '@mui/material';

interface JobSummaryProps {
  distance: number;
  hourlyRate: number;
}

const JobSummary = ({distance, hourlyRate}: JobSummaryProps) => {
  return (
    <div className="job-summary">
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={6}>
          <sub>Distance</sub>
        </Grid>
        <Grid item xs={6}>
          <sub>Hourly Rate</sub>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={6}>
          <h2>{distance} miles</h2>
        </Grid>
        <Grid item xs={6}>
          <h2>{hourlyRate}</h2>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobSummary;
