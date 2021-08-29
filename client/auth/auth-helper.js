import signOut from './api-auth';

const authenticate = (jwt, cb) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
}

const isAuthenticated = () => {
    if (typeof window === 'undefined' || !sessionStorage.getItem('jwt')) {
        return false;
    }
    return JSON.parse(sessionStorage.getItem('jwt'))
}

const clearJWT = (cb) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('jwt');
    }
    cb();
    signOut().then(data => document.cookie = 't=; expires=Thu, 01 jAN 1970 00:00:00 UTC; path=/');
}

export default { authenticate, isAuthenticated, clearJWT }