const express = require('express');

const actionsRouter = require('./routers/actionsRouter.js');
const projectsRouter = require('./routers/projectsRouter');

const server = express();


server.use(express.json());


server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);

//for URL's that start with /api/
//server.use("/api/projects", projectsRouter);
//server.use("/api/actions", actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>App is Up!</h2>`);
});



module.exports = server;

