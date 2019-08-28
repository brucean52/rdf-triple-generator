const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/tripleRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/triple', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});