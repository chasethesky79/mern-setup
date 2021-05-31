import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router()

router.route('/api/users')
    .post(userCtrl.create)
    .get(userCtrl.list)

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router;