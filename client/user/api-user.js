const create = async (user) => {
    try {
        const response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            signal
        })
        return await response?.json();
    }
    catch(err) {
       console.log(err);
    }
}

const read = async (params, credentials, signal) => {
    const { userId } = params;
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.t}`
            }
        });
        return await response?.json();
    } catch(err) {
        console.log(err)
    }
}