import mongoose from 'mongoose';
import config from './index';

const URI = config.mongoURI;
mongoose.connect(URI, { useNewUrlParser: true });

mongoose.connection.on('connected',()=>{
    console.log('Database sucessfully connected');
});

mongoose.connection.on('error', (err) =>{
    console.log('Database connection error: '+ err);
});

