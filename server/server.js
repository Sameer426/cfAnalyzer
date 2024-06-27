const axios = require('axios');
const express = require('express');

const app = express();

app.use(express.json());

app.post("/api", async (req, res) => {
    const { handle, startDate, endDate } = req.body;
    const url = `https://codeforces.com/api/user.status?handle=${handle}`;
    const ratingurl=`https://codeforces.com/api/user.rating?handle=${handle}`

    try {
        const response = await axios.get(url);
        const ratingResponse=await axios.get(ratingurl)

        const result = response.data.result;
        const ratingResult=ratingResponse.data.result;

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const filterData = result.filter(submission => {
            const isContestant = submission.author.participantType === 'CONTESTANT';
            const submissionTime = new Date(submission.creationTimeSeconds * 1000); 
            return isContestant && submissionTime >= startDateObj && submissionTime <= endDateObj;
        });

        // console.log(ratingResult)
        
        const filterRatingData=ratingResult.filter(submission=>{
            const submissionTime = new Date(submission.ratingUpdateTimeSeconds * 1000); 
            return submissionTime >= startDateObj && submissionTime <= endDateObj;
        })

        const statistics = {};

        filterData.forEach(submission => {
            const problemType = submission.problem.index.replace(/[0-9]/g, '');
            const submissionTime = submission.relativeTimeSeconds; 
            const isCorrect = submission.verdict === 'OK'; 

            

            if (!statistics[problemType]) {
                statistics[problemType] = {
                    bestTime: 1000000000,
                    worstTime: 0,
                    totalTime: 0,
                    totalSubmissions: 0,
                    correctSubmissions: 0,
                };
            }

            const stats = statistics[problemType];
            if (isCorrect) {
                stats.correctSubmissions += 1;
                stats.bestTime = Math.floor(Math.min(stats.bestTime, submissionTime/60));
                stats.worstTime = Math.floor(Math.max(stats.worstTime, submissionTime/60));
                stats.totalTime += Math.floor(submissionTime/60);
            }


            stats.totalSubmissions += 1;
        });

        for (const problemType in statistics) {
            const stats = statistics[problemType];
            stats.averageTime = Math.floor(stats.totalTime / stats.correctSubmissions);
            stats.accuracy =Math.floor((stats.correctSubmissions / stats.totalSubmissions) * 100);
        }

        let totalContest=0;
        let bestRank=1000000;
        let worstRank=0;
        let totalRank=0;
        let totalDelta=0;
        let maxDelta=-1000000;
        let minDelta=1000000;

        // console.log(filterRatingData)


        filterRatingData.forEach(submission=>{
            totalContest++;
            bestRank=Math.min(bestRank,submission.rank);
            worstRank=Math.max(worstRank,submission.rank);
            totalRank+=submission.rank;
            totalDelta+=(submission.newRating-submission.oldRating);
            maxDelta=Math.max(maxDelta,submission.newRating-submission.oldRating);
            minDelta=Math.min(minDelta,submission.newRating-submission.oldRating);
        })

        let averageRank=Math.floor(totalRank/totalContest)

        const ratingStats={totalContest,bestRank,worstRank,totalDelta,maxDelta,minDelta,averageRank}

        res.json({ statistics,ratingStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from Codeforces' });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
