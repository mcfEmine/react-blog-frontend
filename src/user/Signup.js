import React, {Component} from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name:"",
            username:"",
            email: "",
            password: "",
            error: "",
            contact: "",
            open: false
        }
    }
    //----------------------------------------------------------------------------------
        handleChange = (name) => event=> {
            this.setState({error: ""});
            this.setState({[name]: event.target.value});
    }
   //-----------------------------------------------------------------------------------
    clickSubmit = event => {
        event.preventDefault()
        const {name, username, email, password,contact} = this.state;
        const user = {name,username,email,password,contact};
        //console.log(user); state e ekliyoruz
        signup(user)
        .then(data=> {
            if(!data.success) this.setState({error:data.message}); // {"success":false,"message":" Email önceden var! "}
            else 
               this.setState({
                // clear state
                name:"",
                username: "",
                email: "",
                password: "",
                error: "",
                contact: "",
                open: true  // kayıt başarılı
            });
        });

    };

   
    //--------------------------------------------------------------------------------
    signupForm = (name,username, email, password,contact) => (

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
                <label className="text-muted"> İletişim</label>
                <input 
                onChange={this.handleChange("contact")} 
                type="text" 
                className="form-control" 
                value={contact} />

            </div>
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Üye Ol</button>

        </form>
    )

    //-------------------------------------------------------------------------------

    render() {
        const{name,username, email, password,contact, error, open}  = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Üye Ol </h2>
                <div className="alert alert-danger" style={{display:error ? "" : "none"}}>{error}</div>

                <div className="alert alert-info" style={{display:open ? "" : "none"}}>{error}
                 Yeni kullanıcı başarıyla yaratıldı. Lütfen <Link to="/signin">Login</Link> olunuz. 
                </div>

               {this.signupForm(name,username, email, password,contact)} 
            </div>
        ); 
    }
}
export default Signup;
