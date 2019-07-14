import React, {Component} from 'react';
import {isAuthenticated} from '../auth/index';
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
     //----------------------------------------------------------------------------------
     handleChange = (name) => event=> {
        this.setState({[name]: event.target.value});
}
//-----------------------------------------------------------------------------------
clickSubmit = event => {
    event.preventDefault()
    if(this.isValid()) {
            
        const {name, username, email, password,contact} = this.state;
        const user = { 
                name,
                username,
                email,
                contact,
                password: password || undefined
            };
        //console.log(user); 
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;

        update(userId, token, user) 
        .then(data=> {
            if(data.error) this.setState({error: data.error});
            else 
                this.setState({redirectToProfile:true});
                
        });

    }
};
    //----------------------------------------------------------------------
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data=> {
            if( typeof data === 'undefined') {
                this.setState({redirectToProfile:true});
            }
            else if (data.error) {
                this.setState({redirectToProfile:true});
            }
            else{
                 this.setState({
                     id: data._id, 
                     name: data.name, 
                     email: data.email, 
                     username:data.username, 
                     contact: data.contact,
                     error: ''
                    });
                }
        }) 
    }
    //----------------------------------------------------------------------
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId);
    }

    //-------------------------------------------------------------------------
    isValid = ()=> {
        const {name, username, email, password} = this.state
        if(name.length === 0 ) {
            this.setState({error: "Ad boş olamaz !"})
            return false;
        }

        if(username.length === 0 ) {
            this.setState({error: "Kullanıcı adı boş olamaz !"})
            return false;
        }

        if(!/^\w+([\.-]?\w+)([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ) {
            this.setState({error: "E-posta geçerli değildir"});
            return false;
        }
        
        if(email.length === 0 ) {
            this.setState({error: "E_posta boş olamaz !"})
            return false;
        }
        
        if(password.length >= 1  && password.length<=5) {
            this.setState({error: "Password en az 6 karakter olmalı!"})
            return false;
        }
        return true;
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
        const{id, name, username, email, contact, password, redirectToProfile, error}  = this.state
        if(redirectToProfile) { // go to profile page
             return <Redirect to = {`/user/${id}`}   />;
        }



        return (
            <div className = "container">
                 <h2 className="mt-5 mb-5">Edit Profile </h2>
                 <div  className="alert alert-danger" 
                    style={{display:error ? "" : "none"}}>
                        {error}
                </div>
                
                 {this.signupForm(name, username, email, contact, password)}    

            </div>
        )
    }

}

export default EditProfile