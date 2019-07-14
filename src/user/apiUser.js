// include helper methods
/*
fetch('https://jsonplaceholder.typicode.com/404')
  .then(res => {
    if(res.ok) {
      return res;
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  })
  .catch(console.error)
*/

//------------------USER'S PROFILE------------------------------------------
export const  read = (userId, token ) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
    })
        .then(res=> { // Promise object
            if(res.ok) {
                return res.json()
            }
        })
        .catch(err => console.log(err));
}
//---------------------------ALL USERS--------------------------------------------
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

//--------------------------------------------------------------------------
export const follow = (userId, token, followId) =>  {
    
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        },
        body: JSON.stringify({userId, followId})
    })
        .then(response=> { 
            return response.json();
        })
        .catch(err => console.log(err))
}

//------------------------------------------------------------------------------
export const unfollow = (userId, token, unfollowId) =>  {
    
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        },
        body: JSON.stringify({userId, unfollowId})
    })
        .then(response=> { 
            return response.json();
        })
        .catch(err => console.log(err))
}
//---------------------------------------------------------------------
export const findPeople =(userId, token) =>  {
    
    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`${token}`
        }
    })
        .then(response=> { 
            return response.json();
        })
        .catch(err => console.log(err))
}