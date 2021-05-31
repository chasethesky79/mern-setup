import User from '../models/user.model';
import merge from 'lodash.merge';
import handleError from '../utils/error-handler';

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: 'Successfully signed up !!'
        })
    } catch (err) {
        return handleError(res, err, 400);
    }
}

const list = async (req, res) => {
    try {
        const users = await User.find().select('name email updated created');
        res.json(users);
    } catch(err) {
        return handleError(res, err, 400);
    }
}

const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user
        next()
    } catch(err) {
        return handleError(res, err, 400);
    }
}

const read = (req, res) => {
    req.profile = merge(req.profile, { hashed_password: undefined, salt: undefined });
    return res.json(req.profile);
}

const update = async (req, res) => {
    try {
        let user = req.profile;
        user = merge(user, req.body, { updated: Date.now() });
        await user.save();
        user = merge(user, { hashed_password: undefined, salt: undefined });
        return res.status(200).json(user);
    } catch (err) {
        return handleError(res, err, 400);
    }
}

const remove = async (req, res) => {
    try {
        const user = req.profile;
        const deletedUser = merge((await user.remove()), { hashed_password: undefined, salt: undefined });
        return res.status(200).json(deletedUser);
    } catch (err) {
        return handleError(res, err, 400);
    }
}

export default { create, list, userByID, remove, read, update }


