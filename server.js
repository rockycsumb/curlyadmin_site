const express = require('express');
const connectDB = require('./config/db');

const app = express();


//Connect Database
connectDB();


//before deploy to heroku notes
// commented out app.get (below), and added //Serve static assets, also added const path = require('path)
// added this to package.json in scripts> underneath dev, "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
app.get('/', (req, res)=>res.send('API Running'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
