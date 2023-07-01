import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider } from '@mui/material';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced from 'dayjs/plugin/advancedFormat';
import { useEffect, useState } from 'react';
import JobTitle from './JobTitle';
import JobSummary from './JobSummary';
import JobBox from './JobBox/JobBox';
import { AccountCircle, CalendarMonth, Construction, LocationOn } from '@mui/icons-material';
import { JobModel } from '../../Models/JobModel';
import { getJobMatches } from '../../api';
import dayjs from 'dayjs';
import { ShiftModel } from '../../Models/ShiftModel';

dayjs.extend(utc);
dayjs.extend(timezone); 
dayjs.extend(advanced); 

const formatPhoneNumber = (phoneNumber: string) => {
  return `(${phoneNumber.substring(0,3)}) ${phoneNumber.substring(3,6)} ${phoneNumber.substring(6)}`;
}

const formatShift = (shift: ShiftModel, timeZone: string) => {
  const startDate = dayjs(shift.startDate).tz(timeZone).format("MMM DD, ddd h:mm A");
  const endDate = dayjs(shift.endDate).tz(timeZone).format("h:mm A z");
  return `${startDate} - ${endDate} `;
}

const Job = () => {

  const [jobs, setJobs] = useState<JobModel[] | undefined>();
  const [currentJob, setCurrentJob] = useState<JobModel | undefined>();

  useEffect(() => {
    (async () => {
      const data = await getJobMatches();
      setJobs(data);
      if (data.length > 0){
        setCurrentJob(data[1]);
      } 
    })();
    }, []);

  if(!currentJob){
    return <p>No Jobs Available. Please check again later or widen your search.</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{margin:"1rem"}}>
          <CardMedia component="img" src={currentJob?.jobTitle.imageUrl}/>
          <CardContent sx={{padding:"0 0.5rem"}}>
            <JobTitle jobTitle={currentJob?.jobTitle.name} companyName={currentJob.company.name}/>
            <JobSummary distance={currentJob.milesToTravel} hourlyRate={currentJob.wagePerHourInCents}/>
            <JobBox BoxIcon={CalendarMonth} title={"Shift Dates"}>
              {currentJob.shifts.map((shift, index) => {
                return <p key={index}>{formatShift(shift, currentJob.company.address.zoneId)}</p>
              })}
            </JobBox>
            <Divider/>
            <JobBox BoxIcon={LocationOn} title={"Location"}>
              <p>{currentJob.company.address.formattedAddress}</p>
              <sub>{`${currentJob.milesToTravel} miles from your job search location`}</sub>
            </JobBox>
            <Divider/>
            {currentJob.requirements && 
            <>
              <JobBox BoxIcon={Construction} title={"Requirements"}>
                {currentJob.requirements.map((listItem, index) => {
                  return <p key={index}>- {listItem}</p>
                })}
              </JobBox>
              <Divider/>
            </>}
            <JobBox BoxIcon={AccountCircle} title={"Report To"}>
              <p>{currentJob.company.reportTo.phone?
              `${currentJob.company.reportTo.name} ${formatPhoneNumber(currentJob.company.reportTo.phone)}`:
              `${currentJob.company.reportTo.name}`}</p>
            </JobBox>
          </CardContent>
          <CardActions>
            <Button>No Thanks</Button>
            <Button>I'll Take it</Button>
          </CardActions>
        </Card>   
    </Box>
  );
}

export default Job;
