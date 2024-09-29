const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8000;
let weatherData = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'project')));

app.get('/', (req, res) => {
  res.send('Welcome to the Weather Journal App!');
});

app.post('/updateWeather', (req, res) => {
  const { temperature, date, userFeelings } = req.body;

  if (typeof temperature !== 'number' || typeof date !== 'string' || typeof userFeelings !== 'string') {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  weatherData = {
    temperature,
    date,
    userFeelings
  };

  res.json(weatherData);
});

app.get('/weatherData', (req, res) => {
  res.json(weatherData);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
