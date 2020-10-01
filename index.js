// code away!
const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json());

server.use('/api/users', userRouter);



server.listen(3000, () => {
    console.log('Server is running!')
})