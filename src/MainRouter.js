import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile  from './user/EditProfile';
import FindPeople  from './user/FindPeople';

import NewPost  from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';



const MainRouter = () => (
    <div>
            <Menu/>

        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/post/new/:userId" component={NewPost}></Route>
            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <Route exact path="/post/edit/:postId" component={EditPost}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/user/edit/:userId" component={EditProfile}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/user/findpeople/:userId" component={FindPeople}></Route>
            
            
        </Switch>
    </div>
)
export default MainRouter;
    