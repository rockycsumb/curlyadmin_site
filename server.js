var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');


const app = express();

// enable ssl redirect
app.use(sslRedirect());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));
app.use(cors({origin: 'https://mernstackTEST-shrnureact.run-us-west2.goorm.io'}))

//before deploy to heroku notes
// commented out app.get (below), and added //Serve static assets, also added const path = require('path)
// added this to package.json in scripts> underneath dev, "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// app.get('/', (req, res)=>res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/task', require('./routes/api/task'));

//Define Demo Routes
app.use('/api/demo/users', require('./routes/api/usersDemo'));
app.use('/api/demo/auth', require('./routes/api/authDemo'));
app.use('/api/demo/profile', require('./routes/api/profileDemo'));
app.use('/api/demo/task', require('./routes/api/taskDemo'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
   //Set Static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res)=>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));