const signIn = async (user) => {
    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const signOut = async () => {
    try {
        const response = await fetch('/auth/signout', {
            method: 'POST'
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}