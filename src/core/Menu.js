
//--- https://fezvrasta.github.io/bootstrap-material-design/docs/4.0/bootstrap-components/navs/

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
const isActive = (history, path)=> {
    if(history.location.pathname===path) return {color:"#ff9900"}
    else return {color: "#009688"}
}

export const signout = (next) => {
    if(typeof window !=="undefined") localStorage.removeItem("jwt");
    next()
}

const Menu = ({history}) => (
    <div>
       
<ul className="nav nav-tabs">
  <li className="nav-item" >
  <Link className="nav-link" to="/" style={isActive(history,"/")}>Ana Sayfa</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to = "/signin" style={isActive(history,"/signin")}>Üye Girişi</Link>
  </li>
  <li className="nav-item">
  <Link className="nav-link" to = "/signup" style={isActive(history,"/signup")}>Üye Ol</Link>
  </li>
  
  <li className="nav-item">
    <a  className="nav-link" 
            onClick={()=> signout(() => history.push('/') )}
            style={
                (isActive(history,"/signup"),
                 {cursor: "pointer", color:"#009688"})  }>Çıkış </a>
    </li>
    </ul>
   </div>
)

export default withRouter(Menu);

