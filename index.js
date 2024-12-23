// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');



const app = express();
const port = 3010;
app.use(express.json());

const data = require('./data.json');
app.use(express.static('static'));

app.post('/students/above-threshold',(request,response) => {
  const { threshold } = request.body;


  if(threshold === undefined) {
    return response.status(400).json({ error: 'Please provide a valid threshold value'});
  }

  const threshold_data = data.filter((data) => data.total > threshold).map((data) => ({
    name: data.name,
    total : data.total,
  }));

  response.json({
    count: threshold_data.length,
    students: threshold_data,
  })

})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


