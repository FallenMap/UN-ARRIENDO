const express = require('express');
const app = express();
const port = process.env.port || 8000;

app.listen(port, err => {
    if(err){
        return console.log("ERROR", err);
    }
    console.log(`Listening on port: ${port}`);
})