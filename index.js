import express from "express";
import cookieParser from 'cookie-parser';
import config from './server/config';

require('./server/config/dbConnection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use((err, req, res, next) =>{
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({
            error: err.name + ':' + err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('Hello MERN stack developers');
});

app.listen(config.port, ()=>{
    console.log(`listeing on Port: ${config.port}`);
});
