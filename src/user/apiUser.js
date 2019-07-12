// include helper methods

export const     read = (userId, token ) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
    })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err))
}
//------------------------------------------------------------------------------
