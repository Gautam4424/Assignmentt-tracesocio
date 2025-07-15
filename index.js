require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Logs 
if (process.env.debug === 'true') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Using express module in code 
app.use(express.json());


// Main code
app.all('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const method = req.method;
  const body = JSON.stringify(req.body, null, 2);

  const response = `
Welcome to our demo API, here are the details of your request:
***Headers***:
${headers}
***Method***:
${method}
***Body***:
${body}
  `.trim();

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
