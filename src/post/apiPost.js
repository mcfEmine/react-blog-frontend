export const create = (userId, token, post) =>  {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        },
        body: JSON.stringify(post)
    })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err))
}