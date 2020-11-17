const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({
    hello: "Web 34 from web!",
    environment: process.env.NODE_ENV,
  })
});

//custom middleware

function logger(req, res, next) {
  let currentDate = new Date();
  let formattedDate =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${formattedDate}] ${method}:${url} ${status}`
    console.log(log)
    next()  
}

server.use(logger)

module.exports = server;
