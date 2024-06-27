import React from 'react';
import "./Analysis.css";

const Analysis = ({ backendData }) => {
  // Sorting problem types alphabetically
  const sortedProblemTypes = Object.keys(backendData.statistics).sort();
  const ratingData = backendData.ratingStats;

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">Codeforces Statistics Analysis</h2>
      <div className="rating-stats-container">
        <h3 className="rating-stats-title">Rating Statistics</h3>
        <ul className="rating-stats-list">
          <li className="rating-statistic-item">Best Rank: <span>{ratingData.bestRank}</span></li>
          <li className="rating-statistic-item">Worst Rank: <span>{ratingData.worstRank}</span></li>
          <li className="rating-statistic-item">Max Delta: <span>{ratingData.maxDelta}</span></li>
          <li className="rating-statistic-item">Min Delta: <span>{ratingData.minDelta}</span></li>
          <li className="rating-statistic-item">Total Contests: <span>{ratingData.totalContest}</span></li>
          <li className="rating-statistic-item">Average Rank: <span>{ratingData.averageRank}</span></li>
          <li className="rating-statistic-item">Total Delta: <span>{ratingData.totalDelta}</span></li>
        </ul>
      </div>
      <div className="problem-type-container">
        {sortedProblemTypes.map((problemType, index) => (
          <div key={index} className="problem-type">
            <h3 className="problem-type-title">{problemType}</h3>
            <ul className="statistics-list">
              <li className="statistic-item">Accuracy: <span className={getAccuracyClassName(backendData.statistics[problemType].accuracy)}>{backendData.statistics[problemType].accuracy}%</span></li>
              <li className="statistic-item">Average Time: <span>{backendData.statistics[problemType].averageTime} minutes</span></li>
              <li className="statistic-item">Best Time: <span>{backendData.statistics[problemType].bestTime} minutes</span></li>
              <li className="statistic-item">Worst Time: <span>{backendData.statistics[problemType].worstTime} minutes</span></li>
              <li className="statistic-item">Correct Submissions: <span>{backendData.statistics[problemType].correctSubmissions}</span></li>
              <li className="statistic-item">Total Submissions: <span>{backendData.statistics[problemType].totalSubmissions}</span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const getAccuracyClassName = (accuracy) => {
  if (accuracy >= 90) {
    return "accuracy high";
  } else if (accuracy >= 60) {
    return "accuracy medium";
  } else {
    return "accuracy low";
  }
};

export default Analysis;
