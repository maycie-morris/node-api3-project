// code away!
const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json());

server.use('/api/users', userRouter);


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('Server is running!')
})