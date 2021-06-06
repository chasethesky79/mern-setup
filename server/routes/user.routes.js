import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router()

router.route('/api/users')
    .post(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.create)
    .get(authCtrl.requireSignIn, userCtrl.list)

router.route('/api/users/:userId')
    .get(authCtrl.requireSignIn, userCtrl.read)
    .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router;