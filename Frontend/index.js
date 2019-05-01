const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    return res.sendFile('index.html', { root: __dirname});
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Started frontend on port ${PORT}`);
});