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