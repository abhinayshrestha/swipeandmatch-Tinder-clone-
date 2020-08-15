const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./Routes/authRoute');
const appRoute = require('./Routes/approute');
const fileRoute = require('./Routes/fileRoute');
const cardRoute = require('./Routes/cardRoute');

const app = express();

app.use(cors()); //handling the CORS issue
app.use((bodyParser.urlencoded({ extended : false })));
app.use(bodyParser.json()); //parsing json data in request header 
app.use('/public/uploads',express.static('public/uploads')); //making images available to users

app.use('/check-server', (req, res) => {
    res.json({
        message : 'Server is up and running'
    })
})
app.use('/auth',authRoute); //forwarding to auth routes 
app.use('/app',appRoute);//forwarding to app routes
app.use('/file',fileRoute);
app.use('/cards',cardRoute);
          
//Error Handling with statusCodes     
app.use((error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log(error)
    res.status(status).json({
        message : message,
        data : data
    })
})        

//dataBase connection...
mongoose.connect('your_mongodb_connection_string',{
    useNewUrlParser: true  
   }) 
  .then( res =>{
        console.log('connected');
        //onsuccess listen to incomming request at port 8080  
        app.listen(process.env.PORT || 8080);     
  }).catch( err => console.log(err) );