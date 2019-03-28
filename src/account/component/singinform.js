import React , {Component} from 'react'
import { connect } from 'react-redux';
import user from '../useraction';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class SignInform extends Component{

login = ()=>{
    let user_email = this.refs.email.value;
    let user_pass = this.refs.password.value;
    if(user_email==="" || user_pass===""){
        alert('all fields are required');
    }
   
    else{
        var url = '/login';
        var data = { username: user_email, password: user_pass  };

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
            .then(response => 
                {

this.props.dispatch(user([response]))
// localStorage.setItem('session',JSON.stringify(response))
this.props.history.push('/home')
                })
            .catch(error =>{
                alert('invalid email or password')
            } );





    }
}




    render(){
        return(
          
            <div className="login-form">
                <form>
                    <h2 className="text-center">Sign in</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input type="email" ref="email" className="form-control" placeholder="Enter email" />				
                    </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" ref="password" className="form-control"  placeholder="Password" />				
            </div>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={this.login} className="btn btn-primary login-btn btn-block">Sign in</button>
                           
                            </div>
                </form>
                        
                            <p className="text-center text-muted small">Don't have an account? <Link to="/singup">Sign up here!</Link></p> 
                <p className="text-center text-muted small"><Link to="/forgetpass">Forget Password?</Link></p> 
              
                        </div>  

                     
        )
    }
}
var funn = (store) => {
    return { data: store.userReducer }
}
export default connect(funn) (withRouter(SignInform));