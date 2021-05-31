import getErrorMessage from '../helpers/dbErrorHandler';

export default function handleError(res, err, status) {
    return res.status(status).json({
        error: getErrorMessage(err)
    });
}