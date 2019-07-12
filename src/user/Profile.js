import React , {Component} from 'react';
import {isAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';
import DefaultProfile from '../images/images.png';
import DeleteUser from './DeleteUser';

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
    //----------------------------------------------------------------------
    componentWillReceiveProps(props) { // props değişirse... user değişebilir..
        const userId = props.match.params.userId
        this.init(userId);
    }
    //---------------------------------------------------------------------
    render() {
        const redirectToSignin = this.state.redirectToSignin
        if(redirectToSignin) return <Redirect to="/signin"/>;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
               <div className="row">
               <div className="col-md-6">
              
               <img 
                    className="card-img-top" 
                    src={DefaultProfile} alt={this.state.user.name} 
                    style={{width: '100%', height: '15vw', 
                    objectFit:'cover' }}
                />
               </div>
               <div className="col-md6">
               <div className="lead mt-2">
                    <p>Merhaba, {this.state.user.name}</p>
                    <p>E-posta: {this.state.user.email}</p>
                    <p>Kullanıcı Adı: {this.state.user.username}</p>
                    <p>Contact: {this.state.user.contact}</p>
                </div>

                   {isAuthenticated().user 
                        && isAuthenticated().user._id === this.state.user._id
                        && (
                            <div className = "d-inline-block">
                        <Link className="btn btn-raised btn-success mr-5"  to = {`/user/edit/${this.state.user._id}`} >
                            Edit Profile

                        </Link>
                            <DeleteUser userId={this.state.user._id}/>
                        </div>)
                    } 

               </div>

               </div>
            </div>
        )
    }
}
export default Profile