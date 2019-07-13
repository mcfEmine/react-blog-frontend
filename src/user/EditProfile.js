import React, {Component} from 'react';
import {isAuthenticated} from '../auth';
import {read, update} from './apiUser';
import {Redirect} from 'react-router-dom';

export class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name:"",
            email: "",
            password: "",
            username:"",
            contact:"",
            redirectToProfile:false
        }
    }
    //--------------------------------------------------------------------
     //----------------------------------------------------------------------------------
     handleChange = (name) => event=> {
        this.setState({[name]: event.target.value});
}
//-----------------------------------------------------------------------------------
clickSubmit = event => {
    event.preventDefault()
    const {name, username, email, password,contact} = this.state;
    
    const user = { 
            name,
            username,
            email,
            password,
            contact
        };
    //console.log(user); 
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;
    update(userId, token, user)
    .then(data=> {
        this.setState({redirectToProfile:true});
    });

};
    //----------------------------------------------------------------------
    init = userId => {
        const token = isAuthenticated().token;
         read(userId, token).then(data=> {
            // hata alabilir, redirectToProfile: true olmalı
                 this.setState({
                     id: data._id, 
                     name: data.name, 
                     email: data.email, 
                     username:data.username, 
                     contact: data.contact,
                    error: ''
                    });
        }) 
    }
    //----------------------------------------------------------------------
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId);
       
    }
    //--------------------------------------------------------------------------
    signupForm = (name,username, email, contact, password) => (

        <form>
        <div className="form-group">
                <label className="text-muted"> Ad</label>
                <input 
                onChange={this.handleChange("name")} 
                type="text" 
                className="form-control" 
                value={name} />

            </div>
            <div className="form-group">
                <label className="text-muted"> Kullanıcı Ad</label>
                <input 
                onChange={this.handleChange("username")} 
                type="text" 
                className="form-control" 
                value={username} />

            </div>
            <div className="form-group">
                <label className="text-muted"> E_posta</label>
                <input  
                onChange={this.handleChange("email")} 
                type="email" 
                className="form-control"
                value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted"> Şifre</label>
                <input 
                onChange={this.handleChange("password")} 
                type="password" 
                className="form-control"
                value={password}/>
            </div>
            <div className="form-group">
                <label className="text-muted"> Contact</label>
                <input 
                onChange={this.handleChange("contact")} 
                type="text" 
                className="form-control" 
                value={contact} />

            </div>
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Update</button>

        </form>
    )
    //-------------------------------------------------------------------------
    render() {
        const{id, name, username, email, contact, password,redirectToProfile}  = this.state
        console.log("render da  -> " , redirectToProfile);
        if(redirectToProfile) { // go to profile page
             return <Redirect to = {`/user/${id}`}   />;
        }

        return (
            <div className = "container">
                 <h2 className="mt-5 mb-5">Edit Profile </h2>
                 {this.signupForm(name, username, email, contact, password)}    

            </div>
        )
    }

}

export default EditProfile