import express from 'express';
import { UserController } from '../controllers/UserController';


var router = express.Router();

router.get("/:orgId", UserController.getUsersByOrganization);


export default router;