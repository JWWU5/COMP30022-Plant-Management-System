const express = require('express');
const cors = require('cors');
const path = require("path")
const app = express();
app.use(cors());
// Accept json data
require("dotenv").config();
app.use(express.json({
    extended: true,
    limit: '50mb'
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ code: 0, message: 'success' });
});

app.use('/api/v1', require('./router'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "..","pvsz-web", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"..", "pvsz-web", "build", "index.html"));
    });
}
app.listen(process.env.PORT || 5000, () => {
    console.log('the server is running:localhost:5000');
});
