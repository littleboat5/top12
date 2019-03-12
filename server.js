const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist')); //serves /dist/index.html

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

console.log("server.js")
console.log(process.env)

app.listen(port, ()=>{
    console.log(`top12 server started at port: ${port}`);
});
