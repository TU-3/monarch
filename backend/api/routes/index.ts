import express from 'express';

import orgsRouter from './orgs';
import projectsRouter from './projects';
import tasksRouter from './tasks';

const apiRouter = express.Router();

apiRouter.use('/orgs', orgsRouter);
apiRouter.use('/projects', projectsRouter); 
apiRouter.use('/tasks', tasksRouter);   

export default apiRouter;