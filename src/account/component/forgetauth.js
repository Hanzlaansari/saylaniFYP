import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class forgetauth extends Component {

    state = {
        email: '',
        code: ''
    }
    componentDidMount() {
        var email = this.props.match.params.email;
        var code = this.props.match.params.auth;

       
        var finalnumber = ''
                   

        for (var z = 0; z < code.length; z++) {
            if (code[z] == 'a') {
                finalnumber += 0;
            }
            else if (code[z] == 'b') {
                finalnumber += 3;
            }
            else if (code[z] == 'c') {
                finalnumber += 1;
            }
            else if (code[z] == 'd') {
                finalnumber += 5;
            }
            else if (code[z] == 'e') {
                finalnumber += 2;
            }
            else if (code[z] == 'f') {
                finalnumber += 7;
            }
            else if (code[z] == 'g') {
                finalnumber += 6;
            }
            else if (code[z] == 'h') {
                finalnumber += 8;
            }
            else if (code[z] == 'j') {
                finalnumber += 9;
            }
            else if (code[z] == 'i') {
                finalnumber += 4;
            }
        }
    
        var f = parseInt(finalnumber)
        this.setState({ email: email, code: f })
    }
    auth = () => {
        var authcode = this.state.code
        var user_email = this.state.email

        var entercode = this.refs.cod.value;
        var user_password = this.refs.password.value;
        var copassword = this.refs.conpassword.value;
     

        if (entercode === "" || user_password === "" || copassword === "") {
            alert('all fields are reqiured')
        }
        else if (authcode != entercode) {
            alert('pin not match')
        }
        else if (user_password !== copassword) {
            alert('password not match')
        }


        else {
            var url = '/update_pass';
            var options = {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({  email: user_email, password: user_password }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((data) => {
                    if (data.update === true) {
                        this.props.history.push('/singin');
                    }
                })
                .catch((err) => console.log(err))


        }

    }
    render() {
        return (
            <div className="login-form">
                <form>
                    <h2 className="text-center">Authantication</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" ref="cod" className="form-control" placeholder="Enter Pin code" />
                        </div>
                    </div>
                   
   
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" ref="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" ref="conpassword" className="form-control" placeholder=" Cooonform Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.auth} className="btn btn-primary login-btn btn-block">Submit</button>

                    </div>
                </form>

            </div>
        )
    }
}
export default withRouter(forgetauth);