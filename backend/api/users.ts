import express from 'express';
import { getAllUsers } from '../services/UserService'; // adjust the path

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', async (_req, res) => {
    try {
      const allUsers = await getAllUsers();
      console.log(allUsers);
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  