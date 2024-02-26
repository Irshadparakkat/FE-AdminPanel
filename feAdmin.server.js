const express = require('express');
const path = require('path');

const app = express();
const port = 3100;

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React app for any route other than the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});