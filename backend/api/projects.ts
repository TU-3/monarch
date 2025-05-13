import express from 'express';
import { getProjectsByOrganization } from '../services/ProjectService';

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/:orgId', async (req, res) => {
    const { orgId } = req.params;
  
    if (!orgId) {
      res.status(400).json({ error: 'Organization ID is required' });
    }
  
    try {
      const allProjects = await getProjectsByOrganization(parseInt(orgId)); 
      res.json(allProjects);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    });
  
  export default router;
