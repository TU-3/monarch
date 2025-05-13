import express from 'express';
import { getOrganizationsFromUser } from '../services/OrganizationService'; 

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    console.error('User ID is required');
  }

  try {
    const allOrgs = await getOrganizationsFromUser(userId); 
    console.log(allOrgs);
    res.json(allOrgs);
  } catch (err) {
    console.error("Error getting organizations of this user: ",err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

export default router;
  