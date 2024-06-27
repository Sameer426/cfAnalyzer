import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const filterData = result.filter(submission => {
//   console.log(1);
//   const isContestant = submission.author.participantType === 'CONTESTANT';
//   const submissionTime = new Date(submission.creationTimeSeconds * 1000); // Convert seconds to milliseconds

//   console.log('submissionTime:', submissionTime);

//   // Additional logging for debugging
//   console.log('isContestant:', isContestant);
//   console.log('submissionTime >= startDateObj:', submissionTime >= startDateObj);
//   console.log('submissionTime <= endDateObj:', submissionTime <= endDateObj);

//   return isContestant && submissionTime >= startDateObj && submissionTime <= endDateObj;
// });

