const express = require('express');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
