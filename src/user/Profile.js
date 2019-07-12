import React , {Component} from 'react';
import {isAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';


export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user:"",
            redirectToSignin:false
        }
    } 

    init = userId => {
        const token = isAuthenticated().token;
         read(userId, token).then(data=> {
            // hata alabilir, redirectToSignin: true olmalı
                 this.setState({user:data})
        }) 
    }
    //----------------------------------------------------------------------
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId);
       
    }
    //---------------------------------------------------------------------
    render() {
        const redirectToSignin = this.state.redirectToSignin
        if(redirectToSignin) return <Redirect to="/signin"/>;
        return (
            <div className="container">
               <div className="row">
               <div className="col-md-6">
               <h2 className="mt-5 mb-5">Profile</h2>
                <p>{isAuthenticated().user.name} Hoşgeldin.</p>
                <p>E-posta: {isAuthenticated().user.email}</p>

               </div>
               <div className="col-md6">
                   {isAuthenticated().user 
                        && isAuthenticated().user._id == this.state.user._id
                        && (
                            <div className = "d-inline-block mt-5">
                        <Link className="btn btn-raised btn-success mr-5"  to = {`/user/edit/${this.state.user._id}`} >
                            Edit Profile

                        </Link>
                        <button className="btn btn-raised btn-danger">
                              Delete Profile  

                        </button>
                        </div>)
                    } 

               </div>

               </div>
            </div>
        )
    }
}
export default Profile