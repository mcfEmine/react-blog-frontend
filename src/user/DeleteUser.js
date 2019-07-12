import React, {Component} from 'react';
import { isAuthenticated } from "../auth";
import {remove} from './apiUser';
import {signout} from '../auth';
import {Redirect} from 'react-router-dom';


    class DeleteUser extends Component {

        state = {
            redirect: false
        };

        deleteAccount = () => {
            const token = isAuthenticated().token;
            const userId = this.props.userId
            remove(userId, token)
            .then(data => {
                if(data.error) {
                    console.log("hata -> data : " , data);
                }
                else{
                    signout( () => {
                        console.log(" User is deleted");
                        this.setState({redirect: true}); // render metodunda kontrol edeceğim..true ise go to anasayfa!
                    })
                }
            })
        }

        //----------------------------------------------------------------------
        deleteConfirmed = ()=> {
            let answer = window.confirm("Bilgilerinizin silinmesini onaylıyor musunuz?")
            if(answer) {
                this.deleteAccount()
            }
        }
        //---------------------------------------------------------------------------------

    render() {
        if(this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger"> Delete Profile</button>
        );
    }
}
export default DeleteUser
