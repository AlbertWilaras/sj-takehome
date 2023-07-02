import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";
import { useEffect, useState } from "react";
import JobTitle from "./JobTitle";
import JobSummary from "./JobSummary";
import JobBox from "./JobBox/JobBox";
import {
  AccountCircle,
  CalendarMonth,
  Construction,
  LocationOn,
} from "@mui/icons-material";
import { JobModel } from "../../Models/JobModel";
import { getJobMatches } from "../../api";
import dayjs from "dayjs";
import { ShiftModel } from "../../Models/ShiftModel";
import JobButtons from "./JobButtons";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

const formatPhoneNumber = (phoneNumber: string) => {
  return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
    3,
    6
  )} ${phoneNumber.substring(6)}`;
};

const formatShift = (shift: ShiftModel, timeZone: string) => {
  const startDate = dayjs(shift.startDate)
    .tz(timeZone)
    .format("MMM DD, ddd h:mm A");
  const endDate = dayjs(shift.endDate).tz(timeZone).format("h:mm A z");
  return `${startDate} - ${endDate} `;
};

const Job = () => {
  const [jobs, setJobs] = useState<JobModel[] | undefined>();
  const [index, setIndex] = useState<number>(0);
  const [currentJob, setCurrentJob] = useState<JobModel | undefined>();

  useEffect(() => {
    (async () => {
      const data = await getJobMatches();
      setJobs(data);
      if (data.length > 0) {
        setCurrentJob(data[0]);
      }
      setIndex(0);
    })();
  }, []);

  const removeJob = (jobId: string) => {
    if (!jobs) {
      return;
    }
    const cur = showNext();
    setIndex(cur - 1);
    setJobs(jobs.filter((job) => job.jobId !== jobId));
  };

  const showPrev = () => {
    const prev = index - 1;
    setIndex(prev);
    if (jobs) {
      setCurrentJob(jobs[prev]);
    }
    return prev;
  };

  const showNext = () => {
    const next = index + 1;
    setIndex(next);
    if (jobs) {
      setCurrentJob(jobs[next]);
    }
    return next;
  };

  if (!currentJob || !jobs) {
    return (
      <p>No Jobs Available. Please check again later or widen your search.</p>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ margin: "1rem" }}>
        <CardMedia component="img" src={currentJob?.jobTitle.imageUrl} />
        <CardContent sx={{ padding: "0 0.5rem" }}>
          <JobTitle
            jobTitle={currentJob?.jobTitle.name}
            companyName={currentJob.company.name}
          />
          <JobSummary
            distance={currentJob.milesToTravel}
            hourlyRate={currentJob.wagePerHourInCents}
          />
          <JobBox BoxIcon={CalendarMonth} title={"Shift Dates"}>
            {currentJob.shifts.map((shift, index) => {
              return (
                <p key={index}>
                  {formatShift(shift, currentJob.company.address.zoneId)}
                </p>
              );
            })}
          </JobBox>
          <Divider />
          <JobBox BoxIcon={LocationOn} title={"Location"}>
            <p>{currentJob.company.address.formattedAddress}</p>
            <sub>{`${currentJob.milesToTravel} miles from your job search location`}</sub>
          </JobBox>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={1}>
              <IconButton disabled={index <= 0} onClick={showPrev}>
                <ArrowBackIos fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                disabled={index >= jobs.length - 1}
                onClick={showNext}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          {currentJob.requirements && (
            <>
              <JobBox BoxIcon={Construction} title={"Requirements"}>
                {currentJob.requirements.map((listItem, index) => {
                  return <p key={index}>- {listItem}</p>;
                })}
              </JobBox>
              <Divider />
            </>
          )}
          <JobBox BoxIcon={AccountCircle} title={"Report To"}>
            <p>
              {currentJob.company.reportTo.phone
                ? `${currentJob.company.reportTo.name} ${formatPhoneNumber(
                    currentJob.company.reportTo.phone
                  )}`
                : `${currentJob.company.reportTo.name}`}
            </p>
          </JobBox>
          <JobButtons jobId={currentJob.jobId} removeJob={removeJob} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Job;
