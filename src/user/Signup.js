import React, {Component} from 'react';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name:"",
            username:"",
            email: "",
            password: "",
            error: ""
        }
    }
    //----------------------------------------------------------------------------------
        handleChange = (name) => event=> {
            this.setState({[name]: event.target.value});
    }
   //-----------------------------------------------------------------------------------
    clickSubmit = event => {
        event.preventDefault()
        const {name, username, email, password} = this.state;
        const user = {name,username,email,password};
        //console.log(user); state e ekliyoruz
        this.signup(user)
        .then(data=> {
            if(!data.success) this.setState({error:data.message}); // {"success":false,"message":" Email önceden var! "}
            else 
               this.setState({
                // clear state
                name:"",
                username: "",
                email: "",
                password: "",
                error: ""
            });
        });

    };

    //------------------------------------------------------------------------------
    signup = user => {
        return fetch("http://localhost:8080/signup", {
            method: "POST",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
         })
         .then(response=> {
             return response.json();
         })
         .catch(err=> console.log(err))
    }

    //-------------------------------------------------------------------------------

    render() {
        const{name,username, email, password}  = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup </h2>
                <form>
                <div className="form-group">
                        <label className="text-muted"> Name</label>
                        <input 
                        onChange={this.handleChange("name")} 
                        type="text" 
                        className="form-control" 
                        value={name} />

                    </div>
                    <div className="form-group">
                        <label className="text-muted"> UserName</label>
                        <input 
                        onChange={this.handleChange("username")} 
                        type="text" 
                        className="form-control" 
                        value={username} />

                    </div>
                    <div className="form-group">
                        <label className="text-muted"> Email</label>
                        <input  
                        onChange={this.handleChange("email")} 
                        type="email" 
                        className="form-control"
                        value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted"> Password</label>
                        <input 
                        onChange={this.handleChange("password")} 
                        type="password" 
                        className="form-control"
                        value={password}/>
                    </div>
                    <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>

                </form>
            </div>
        ); 
    }
}
export default Signup;
