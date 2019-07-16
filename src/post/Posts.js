import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {list} from "./apiPost";
import { isAuthenticated } from "../auth/index";

class Posts extends Component {
    constructor () {
        super()
        this.state = {
            posts:[]
        }
    }

    componentDidMount() {
        const token = isAuthenticated().token;
        list(token).then(data => { 
            
            if(data.error) {
                console.log("hata", data.error);
            }
            else{
                this.setState({posts: data});   
            }
        })

    }
//----------------------------------------------------------------------------------------------------
// take the user._id

renderPosts = posts => {
    return (

        <div className="row">
 
            { posts.map( (post, i) =>  {
                 const posterId = post.postedBy ?  `/user/${post.postedBy._id}` : ""
                 const posterName = post.postedBy ?  post.postedBy.name : "Unknown" 

           return (
            <div className="col-md-4" key={i}> 
                <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body.substring(0, 100)}</p>
                        <br/>
                        <p className="font-italic mark"> Posted by <Link to= {`${posterId}`}> {posterName} </Link> 
                          on  {new Date(post.created).toDateString()}
                        </p>
                        <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm">
                            Devamını oku
                         </Link>
                </div>
            </div>
           )

            } ) }
        </div>
    )
};
           
    
//--------------------------------------------------------------------------------------------------------
    render() {
        const {posts} = this.state;
        return (
            <div className ="container">
                <h2 className="mt-5 mb-5">{ !posts.length ? 'Yükleniyor lütfen bekleyiniz...' : 'Postalananlar'  } </h2>
                {this.renderPosts(posts)}


            </div>
        );

    }
}
export default Posts;