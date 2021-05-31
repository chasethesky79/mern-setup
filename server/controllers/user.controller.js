import User from '../models/user.model';
import getErrorMessage from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: 'Successfully signed up !!'
        })
    } catch (err) {
        return res.status(400).json({
            error: getErrorMessage(err)
        })
    }
}

export default { create }