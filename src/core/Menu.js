
//--- https://fezvrasta.github.io/bootstrap-material-design/docs/4.0/bootstrap-components/navs/

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path)=> {
    if(history.location.pathname===path) return {color:"#ff9900"}
    else return {color: "#009688"}
}

//-------------------------------------------------------------------------------------

const Menu = ({history}) => (
    <div>
       
<ul className="nav nav-tabs">
  <li className="nav-item" >
    <Link className="nav-link" to="/" style={isActive(history,"/")} >Ana Sayfa</Link>
  </li>
  
  { !isAuthenticated() && (
    <>
<li className="nav-item">
<Link className="nav-link" to = "/signin" style={isActive(history,"/signin")}>Üye Girişi</Link>
</li>
<li className="nav-item">
< Link className="nav-link" to = "/signup" style={isActive(history,"/signup")}>Üye Ol</Link>
</li>
</>
  )}

 
{ isAuthenticated() && (
   <>
    <li className="nav-item">
    <a className="nav-link" 
            onClick={()=> signout(() => history.push('/') )}
            style={
                (isActive(history,"/signup"),
                 {cursor: "pointer", color:"#009688"})  }>Çıkış </a>
    </li>

<li className="nav-item">
  <Link to={`/user/${isAuthenticated().user._id}`} 
   style={
            (isActive(history, `/user/${isAuthenticated().user._id}`
            )
            ) 
          } 
    className="nav-link" >
   {`${isAuthenticated().user.name}'s profile`} 

  </Link>

</li>
   </>
)}
</ul>
   </div>
);

export default withRouter(Menu);

