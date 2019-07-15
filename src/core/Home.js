import React from "react";
import Posts from '../post/Posts';

const Home = () => (
   <div>
        <div className="jumbotron">
        <h2>Anasayfa</h2>
        <p className ="lead"> Hoşgeldiniz </p>
    </div>
    <div className = "container">
        <Posts/>
    </div>
   </div>


);

export default Home;