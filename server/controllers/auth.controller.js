import jwt from 'jsonwebtoken';
import config from '../../config/config';

const signin = async (req, res) => {
    const { body: { email, password } } = req;
    try {
        const user = await User.findOne({ email, password });
        const { _id, name, email } = user;
        if (!user) {
            return res.status(401).json({
                error: 'User not found'
            });
        }
        if (!user.authenticate(password)) {
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
        return res.status(401).json({ error: 'Could not sign in'})
    }
}

const signout = (req, res) => {
    res.clearCookie('t');
    return res.status(200).json({ message: 'Signed out'})
}

export default { signIn, signOut }