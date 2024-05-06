// getting-started.js
const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://krishna:admin@mycluster.rdbjkvf.mongodb.net/?retryWrites=true&w=majority&appName=mycluster';

// const DB_LOCAL= 'mongodb://127.0.0.1:27017/test';
// const DB_LOCAL=process.env.DB_LOCAL;

mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>console.log("DB Connect Successful")).catch(err=>console.log(err));

// mongoose.connect(DB_URL).then(()=>console.log("DB Connect Successful")).catch(err=>console.log(err));

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }