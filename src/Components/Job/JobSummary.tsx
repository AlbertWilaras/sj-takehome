import { Grid } from "@mui/material";

const formatDistance = (distance: number) => {
  return distance.toFixed(1);
};

const formatHourlyRate = (hourlyRateInCents: number) => {
  const hourlyRate = hourlyRateInCents / 100;
  return hourlyRate.toFixed(2);
};

interface JobSummaryProps {
  distance: number;
  hourlyRate: number;
}

const JobSummary = ({ distance, hourlyRate }: JobSummaryProps) => {
  return (
    <div className="job-summary">
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <sub>Distance</sub>
        </Grid>
        <Grid item>
          <sub>Hourly Rate</sub>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <h1>{formatDistance(distance)} miles</h1>
        </Grid>
        <Grid item>
          <h1>
            <sup>$</sup>
            {formatHourlyRate(hourlyRate)}
          </h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobSummary;
