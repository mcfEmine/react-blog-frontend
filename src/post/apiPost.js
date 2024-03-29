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
//--------------------------------------------------------------------------------
export const list = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET" ,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
    
    })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err));
}
//------------------------------single post--------------------------------------
export const singlePost = postId => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET" })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err));
}

//------------------------------------------------------------------------
export const listByUser = (userId, token) => {
    
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
        
        })
        .then(response=> { 
            return response.json()
        })
        .catch(err => console.log(err));
}

//------------------------------------------------------------------------------------
export const remove = (postId, token ) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
    })
        .then(response=> { 
            return response.json()
        })
        .catch(err => console.log(err))
}
//-----------------------------------------------------------------------------
export const update = (postId, token, post) =>  {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        },
        body: JSON.stringify(post)
        //body: post
    })
        .then(response=> { // Promise object
            return response.json()
        })
        .catch(err => console.log(err))
}
