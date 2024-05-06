const express = require('express')
const app = express()
const port = 4000
const router=require('./routes/router');
const requestLogger=require('./utils/requestLogger');
const errorHandler = require('./utils/errorHandler');
const userRouter=require('./routes/userRouter');
const cookieParser=require('cookie-parser');

//Connect to Database
const db=require('./dbConnection');
const cors=require('cors')

//This Middleware will allow us to read the body of the content to read the Req
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));

app.use(requestLogger);

app.use("/router",router)

app.use("/user",userRouter);

//Used to Serve Static site generated through npm run build in React Project
app.use("/",express.static('./build'));

app.get ("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'));
})

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// app.post('/p', (req, res) => {
//     console.log(req.body);
//     res.send({ success: true, message: "Request Completed" });
// });
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})