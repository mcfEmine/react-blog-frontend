// include helper methods

//------------------USER'S PROFILE-----------------------------
export const  read = (userId, token ) => {
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
//---------------------------ALL USERS------------------------------------------------
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET" })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err));
}
//----------------------------REMOVE PROFILE--------------------------------------
export const remove = (userId, token ) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
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
//--------------------UDPATE PROFILE-------------------------------------------
export const update = (userId, token, user) =>  {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err))
}
