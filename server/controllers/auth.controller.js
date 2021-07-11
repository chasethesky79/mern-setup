import jwt from 'jsonwebtoken';
import config from '../../config/config';
import expressJwt from 'express-jwt';
import User from '../models/user.model';

const signIn = async (req, res) => {
    const { body } = req;
    try {
        const user = await User.findOne({ "email": body.email });
        const { _id, name, email } = user;
        if (!user) {
            return res.status(401).json({
                error: 'User not found'
            });
        }
        if (!user.authenticate(body.password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
    } catch (err) {
        console.log(`ERROR ${JSON.stringify(err)}`);
        return res.status(401).json({ error: 'Could not sign in'})
    }
}

const signOut = (req, res) => {
    res.clearCookie('t');
    return res.status(200).json({ message: 'Signed out'})
}

const requireSignIn = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['RS256']
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile?._id === req.auth?._id;
    if (!authorized) {
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
}

export default { signIn, signOut, requireSignIn, hasAuthorization }