import React, {Component} from 'react';
import {singlePost, update} from './apiPost';
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';


 class EditPost extends Component {
     constructor() {
         super()
         this.state = {
             id: '',
             title:'',
             body:'',
             redirectToProfile:false,
             error:'',
             loading:false,
             chkPrivate:false
         }
         this.onCheckChange=this.onCheckChange.bind(this);
     } 
     // 
     onCheckChange(e) {
         this.setState({
             [e.target.name] : e.target.checked
         })
     }
     //-------------------------------------------------------------------------------
     init = postId => {
        singlePost(postId).then(data=> {
            if( typeof data === 'undefined') {
                this.setState({redirectToProfile:true});
            }
            else if (data.error) {
                this.setState({redirectToProfile:true});
            }
            else{
                 this.setState({
                     id: data._id, 
                     title: data.title, 
                     body: data.body,
                     error: '',
                     chkPrivate:data.chkPrivate
                    });
                }
        }) 
    }
    //----------------------------------------------------------------------
    componentDidMount() {
        
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }
      //----------------------------------------------------------------------------------
      handleChange = name => event=> {
        this.setState({error: ""});
        const value=event.target.value;
        this.postData.set(name, value);
        this.setState({[name]: value});
}
//--------------------------------------------------------------------------------------
isValid = ()=> {
    const {title, body} = this.state;
    if(title.length === 0 || body.length === 0 ) {
        this.setState({error: "Alanlara giriş yapınız !", loading:false})
        return false;
    }
    return true;
}

//-----------------------------------------------------------------------------------
clickSubmit = event => {
   event.preventDefault();
   this.setState({loading:true});

   if(this.isValid()) {
       const postId = this.state.id
       const token = isAuthenticated().token;

       const {title, body, chkPrivate} = this.state;
       const postData = { title,body, chkPrivate};

       update(postId, token, postData) 
               .then(data=> {
                   if(data.error) this.setState({error: data.error});
                   else {
                       this.setState({
                           loading:false,
                           title:'',
                           body:'',
                           redirectToProfile: true
                       })
                       
                   } 
                       
       });

   }
};
     //-----------------------------------------------------------------------   
     editPostFrom = (title, body, ckhPrivate) => (
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
            <div className="form-group">
                <input type="checkbox" 
                    checked={this.state.chkPrivate} 
                    onChange = {this.handleChange("ckhPrivate")}
                    value={ckhPrivate} />
                Private
            </div>
            <button onClick= {this.clickSubmit} className="btn btn-raised btn-primary">Güncelle</button>

        </form>
    )
     //---------------------------------------------------------------------------
    render() {
        const {title, body, redirectToProfile,ckhPrivate} = this.state;
        if(redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }
        return (
          <div className="container">
                <h2 className= "mt-5 mb-5">{title}</h2>
                {this.editPostFrom(title, body,ckhPrivate)}
          </div>  
        );
    }
}
 export  default EditPost; 