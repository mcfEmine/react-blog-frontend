import React , {Component} from 'react';
import {isAuthenticated} from '../auth/index';
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';
import DefaultProfile from '../images/images.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs' ;

export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user:{
                following: [], 
                followers: [] 
            },
            redirectToSignin: false,
            following: false, 
            error: ""
        }
    } 
    //---------------------------------------------------------------------------
checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
        // one id has many other ids (followers) and vice versa
        return follower._id === jwt.user._id
    })
    return match
}
//------------------------------------------------------------------------------------
// props olarak pass edilecek.
clickFollowButton = callApi => {
    // bu da çalışır -> const userId = this.props.match.params.userId;

     const userId = isAuthenticated().user._id;
     //const userId= this.props.match.params.userId;
     const token = isAuthenticated().token;

    callApi( userId, token, this.state.user._id)
    .then( data => {
        if(data.error) {
            this.setState({error:data.error})
        }
        else{
            this.setState({user:data, following: !this.state.following})
        }
    })
} 

    //------------------------------------------------------------------------

    init = userId => {
        const token = isAuthenticated().token;
        read (userId, token).then(data => {
            if( typeof data === 'undefined') {
                this.setState({redirectToSignin:true});
            }
            else if (data.error) {
                this.setState({redirectToSignin:true});
            }
             else{
                 let following = this.checkFollow(data)
                 this.setState({user:data, following}) ;
             }
        })
    }

// hata alabilir, redirectToSignin: true olmalı
    //----------------------------------------------------------------------
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId);
       
    }
   //----------------------------------------------------------------------
    componentWillReceiveProps(props) { // props daki değerler değişirse, farket
        const userId = props.match.params.userId
        this.init(userId);
    }
    //---------------------------------------------------------------------
    render() {
        const redirectToSignin = this.state.redirectToSignin
        
        if(redirectToSignin)  {

           return <Redirect to="/signin"/>; 
        
        }
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
                        ? (
                            <div className = "d-inline-block">
                            <Link className="btn btn-raised btn-success mr-5"  to = {`/user/edit/${this.state.user._id}`} >
                                Edit Profile
                            </Link>
                            <DeleteUser userId={this.state.user._id}/>
                        </div>
                        ) : (

                            <FollowProfileButton following = {this.state.following}
                                onButtonClick = {this.clickFollowButton}
                            />
                        )}
                        
               </div>

               </div>
               <div className="row">

               <ProfileTabs followers = {this.state.user.followers}  following = {this.state.user.following} />           

               </div>
            </div>
        )
    }
}
export default Profile