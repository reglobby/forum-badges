const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the demo directory
app.use(express.static(path.join(__dirname, '../demo')));

// Also serve files from the dist directory
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Start the server
app.listen(PORT, () => {
  console.log(`
✨ Forum Badges Demo Server ✨
----------------------------
🌐 Local: http://localhost:${PORT}
📁 Serving from: ${path.join(__dirname, '../demo')}
✅ Ready! Press Ctrl+C to stop.
  `);
}); 