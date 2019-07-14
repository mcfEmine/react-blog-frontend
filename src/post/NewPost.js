import React, {Component} from 'react';
import {isAuthenticated} from '../auth/index';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom';


export class NewPost extends Component {
    constructor() {
        super();
        this.state = {
           title:'',
           body:'',
           error:'',
           user:{},
           loading:false
        }
    }
     //----------------------------------------------------------------------------------
     handleChange = name => event=> {
         this.setState({error: ""});
         const value=event.target.value;
         this.postData.set(name, value);
         this.setState({[name]: value});
}
//-----------------------------------------------------------------------------------
clickSubmit = event => {
    event.preventDefault();

    this.setState({loading:true});

    if(this.isValid()) {

        //const userId = this.props.match.params.userId;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        const {title, body} = this.state;
        const postData = { 
                title,
                body,
            };

        create(userId, token, postData) 
                .then(data=> {
                    if(data.error) this.setState({error: data.error});
                    else 
                        console.log('New Post:', data);
        });

    }
};
    // //----------------------------------------------------------------------
    // init = userId => {
    //     const token = isAuthenticated().token;
    //     read(userId, token).then(data=> {
    //         if( typeof data === 'undefined') {
    //             this.setState({redirectToProfile:true});
    //         }
    //         else if (data.error) {
    //             this.setState({redirectToProfile:true});
    //         }
    //         else{
    //              this.setState({
    //                  id: data._id, 
    //                  name: data.name, 
    //                  email: data.email, 
    //                  username:data.username, 
    //                  contact: data.contact,
    //                  error: ''
    //                 });
    //             }
    //     }) 
    // }
    //----------------------------------------------------------------------
    componentDidMount() {
        this.postData=new FormData();

        this.setState({user:isAuthenticated().user})


    }

    //-------------------------------------------------------------------------
    isValid = ()=> {

        const {title, body} = this.state;

        if(title.length === 0 || body.length === 0 ) {
            this.setState({error: "Alanlara giriş yapınız !"})
            return false;
        }
        return true;
    }

    //--------------------------------------------------------------------------
        newPostFrom = (title, body) => (

        <form>
       
            <div className="form-group">
                <label className="text-muted"> Title</label>
                <input 
                onChange={this.handleChange("title")} 
                type="text" 
                className="form-control" 
                value={title} />

            </div>
          
          

            <div className="form-group">
                <label className="text-muted"> Body</label>
                <textarea onChange = {this.handleChange("body")}
                    type="text" className="form-control"
                    value={body}>
                </textarea>
            </div>
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>

        </form>
    )
    //-------------------------------------------------------------------------
    render() {
        const{title, body, user ,error, loading}  = this.state;

        return (
            <div className = "container">
                 <h2 className="mt-5 mb-5">Create a new post </h2>
                 <div  className="alert alert-danger" 
                    style={{display:error ? "" : "none"}}>
                        {error}
                </div>
                
                 {this.newPostFrom(title, body)}    

            </div>
        )
    }

}

export default NewPost