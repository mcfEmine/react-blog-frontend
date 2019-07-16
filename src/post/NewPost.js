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
           loading:false,
           redirectToProfile:false,
           chkPrivate:false
        }
        this.onCheckChange = this.onCheckChange.bind(this);
    }
     //----------------------------------------------------------------------------
     onCheckChange(e) {
        //console.log(e.target.checked);
         this.setState({
             [e.target.name] : e.target.checked
         })
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
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const {title, body, chkPrivate} = this.state;
        const postData = { title,body, chkPrivate};
        create(userId, token, postData) 
                .then(data=> {
                    if(data.error) this.setState({error: data.error});
                    else {
                        this.setState({
                            loading:false,
                            title:'',
                            body:'',
                            chkPrivate:false,
                            redirectToProfile: true
                        })
                        
                    } 
                        
        });

    }
};
//---------------------------------------------------------------------------------------------------
    componentDidMount() {
        this.postData=new FormData();
        this.setState({user:isAuthenticated().user})
    }
    //-------------------------------------------------------------------------
    isValid = ()=> {
        const {title, body} = this.state;
        if(title.length === 0 || body.length === 0 ) {
            this.setState({error: "Alanlara giriş yapınız !", loading:false})
            return false;
        }
        return true;
    }
    //--------------------------------------------------------------------------
        newPostFrom = (title, body,chkPrivate) => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Başlık</label>
                <input 
                onChange={this.handleChange("title")} 
                type="text" 
                className="form-control" 
                value={title} />
             </div>

            <div className="form-group">
                <label className="text-muted"> Içerik</label>
                <textarea onChange = {this.handleChange("body")}
                    type="text" className="form-control"
                    value={body}>
                </textarea>
            </div>
             <div className="form-group"> <input type="checkbox" name="chkPrivate" checked={this.state.chkPrivate} onChange={this.onCheckChange} /> Private <br/> </div>
            
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Gönder</button>

        </form>
    )
   
    //-------------------------------------------------------------------------
    render() {
        const{title, body, user ,error, loading, redirectToProfile,chkPrivate}  = this.state;
        if(redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className = "container">
                 <h2 className="mt-5 mb-5">Create Post </h2>
                 <div  className="alert alert-danger" 
                    style={{display:error ? "" : "none"}}>
                        {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Lütfen bekleyiniz..</h2>
                    </div>
                ) : ("")}

                 {this.newPostFrom(title, body,chkPrivate)}    

            </div>
        )
    }

}

export default NewPost