import list from './api-user';
import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;
        try {
           setUsers(await list(signal));
        } catch(error) {
            console.log(error);
        }
        return () => abortController.abort();
    }, []);
}