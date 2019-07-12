import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth';

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            username:"",
            password: "",
            error: "",
            redirectToReferer: false,
            loading:false
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
        this.setState({loading:true})
        const {username, password} = this.state;
        const user = {username,password};
        console.log(user); 
        signin(user)
        .then(data=> {
            if(!data.success) {
                
                this.setState({error:data.message, loading:false})
            }
             
            else{
                // authenticate user
                authenticate(data, () =>{ // 2. parametre callback func.
                    this.setState({redirectToReferer:true})
                })

            }
            
        });

    };

    //--------------------------------------------------------------------------------
    signinForm = (username, password) => (

        <form>
            <div className="form-group">
                <label className="text-muted"> Kullanıcı Ad</label>
                <input 
                onChange={this.handleChange("username")} 
                type="text" 
                className="form-control" 
                value={username} />

            </div>
            <div className="form-group">
                <label className="text-muted"> Şifre</label>
                <input 
                onChange={this.handleChange("password")} 
                type="password" 
                className="form-control"
                value={password}/>
            </div>
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Giriş</button>

        </form>
    )

    //-------------------------------------------------------------------------------

    render() {

        const{username, password,error, redirectToReferer, loading}  = this.state
            if(redirectToReferer) {
                return <Redirect to="/" />
            }


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Üye Giriş </h2>
                <div 
                    className="alert alert-danger" 
                    style={{display:error ? "" : "none"}}>
                    {error}
                </div>
                { loading ? ( <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div> ) :( "")  }

               {this.signinForm(username, password)} 
            </div>
        ); 
    }
}
export default Signin;


