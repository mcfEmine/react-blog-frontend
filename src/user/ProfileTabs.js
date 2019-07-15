import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/images.png';

import Users from './Users';


class ProfileTabs extends Component {
    render() {
        const  {following, followers, posts} = this.props
        return (
            <div>
               <div className = "row">

                    <div className = "col-md-4">
                        <h3 className="text-primary">Takipçi</h3>
                        <hr/>
                        {followers.map( ( (person, i) => 
                             <div key={i}>

                                
                                    <div>
                                        <Link to = {`/user/${person._id}`}>
                                            <img  className="float-left mr-2" 
                                                src={DefaultProfile}  
                                                style={{height: '30px',
                                                borderRadius:"50%", objectFit:'cover' }}/> 
                                             <div>
                                                <p className="lead">{person.name}</p>     
                                            </div>       
                                        </Link>

                                    </div>

                                
                            </div>
                         ) )}
                    </div>


                    <div className = "col-md-4">
                        <h3 className="text-primary">Takip</h3>
                        <hr/>
                        {following.map( ( (person, i) => 
                             <div key={i}>

                                    <div>
                                        <Link to = {`/user/${person._id}`}>
                                            <img  className="float-left mr-2" 
                                                src={DefaultProfile}  
                                                style={{height: '30px', 
                                                borderRadius:"50%",  objectFit:'cover' }}/> 
                                             <div>
                                                <p className = "lead">{person.name}</p>     
                                            </div>       
                                        </Link>

                                    </div>

                                
                            </div>
                         ) )}
                    </div>
            

                    <div className = "col-md-4">
                    <h3 className="text-primary">Posts</h3>    
                    <hr />
                    {posts.map( ( (post, i) => 
                             <div key={i}>

                                    <div>
                                        <Link to = {`/post/${post._id}`}>
                                     
                                             <div>
                                                <p className = "lead">{post.title}</p>     
                                            </div>       
                                        </Link>

                                    </div>

                                
                            </div>
                         ) )}
                    </div>        
               </div>
                
            </div>
        );
    }
}

export default ProfileTabs;