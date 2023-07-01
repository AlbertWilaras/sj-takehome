import './Job.css';

interface JobTitleProps {
  jobTitle: string;
  companyName: string;
}

const JobTitle = ({jobTitle, companyName}: JobTitleProps) => {
  return (
    <div className='job-title'>
        <h2>{jobTitle}</h2>
        <b>{companyName}</b>
    </div>
  );
}

export default JobTitle;
