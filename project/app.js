
var cors = require('cors')
var express = require('express');
//require('express-async-errors')
var path = require('path');
const bcrypt =require('bcrypt')

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan')
var userRouter = require('./routes/route');




var app = express();


app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', 'views');
//app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(
    bodyParser.json({
        parameterLimit:100000,
        limit:"50mb",
        extended:true
    })
)
//mongodb+srv://houdamestiri94:haroun123@cluster0.9qmhrll.mongodb.net/JobData?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/JobData')
.then(() => {
    console.log('database connected')
    
}).catch(()=>{
    console.log('Something wrong !!!!!!!!!!');   
})

app.use("/",userRouter)



 server = app.listen(3000, () =>console.log('Running at port 3000'));
module.exports=server