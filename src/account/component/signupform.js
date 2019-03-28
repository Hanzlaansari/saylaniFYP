import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import emailvalidation from './emailvalidation'
import {withRouter} from 'react-router-dom'
 class SignUnform extends Component {
     state = {
         display:false
     }
     submit=()=>{

         let user_email = this.refs.email.value;
         if (!emailvalidation(user_email)) {
             alert("Invalid email format");
         }
         else{
             this.setState({display:true})

        
         
            var digit = "";
          
         var number = Math.floor(Math.random() * 100000 + 1)
         var sNumber = number.toString();
     
         for (var i = 0, len = sNumber.length; i < len; i += 1) {
             if(sNumber.charAt(i)==0){
                 digit+='a'
             }
             else if (sNumber.charAt(i) == 1){
                 digit+='c'
             }
             else if (sNumber.charAt(i) == 2) {
                 digit+='e'
             }
             else if (sNumber.charAt(i) == 3) {
                 digit+='b'
             }
             else if (sNumber.charAt(i) == 4) {
                 digit+='i'
             }
             else if (sNumber.charAt(i) == 5) {
                 digit+='d'
             }
             else if (sNumber.charAt(i) == 6) {
                 digit+='g'
             }
             else if (sNumber.charAt(i) == 7) {
                 digit+='f'
             }
             else if (sNumber.charAt(i) == 8) {
                 digit+='h'
             }
             else if (sNumber.charAt(i) == 9) {
                 digit+='j'
             }
             
             
             
             
             
             
           
            
         }
      
        


var options = {
    method:'POST',
    body: JSON.stringify({ email: user_email, code: number}),
    headers:{
        'Content-type':'application/json'
    }
}
         fetch('/sendcode',options)
.then((res)=> res.json())
.then((data)=>{
    console.log(data)
    if(data.send===true){
        alert('chck your email, and enter code')
        this.props.history.push('/userauth/' + user_email+'/'+digit)
    }
    else if(data.send===false){
        alert('opppppsss there is something rong with your mail')
        // alert('account already exist')
        // this.props.history.push('/singin')
    }
    else if(data.exist===true){
        alert('account already exist')
        this.props.history.push('/singin')
        // alert('opppppsss there is something rong with your mail')
    }
  
} )
.catch((err)=> console.log(err))
    
}
    

}


          
            
     
    render() {
    
        return (
            <div className="signup-form s1">
                <form>
                    <h2>Register</h2>
                    <p className="hint-text st1">Create your account. It's free and only takes a minute.</p>
                    <p className="hint-text st1"><b>After Submitting email ,you will recieve a Pin code by ZAMEEN.pk</b></p>
                    <div className="form-group s2">
                    
                            </div>
                            <div className="form-group s2">
                                <input type="email" ref="email" className="form-control s3"  placeholder="Email" required="required" />
                            </div>
                  
                            
                            <div className="form-group s2">
                                <button type="button" onClick={this.submit} className="btn btn-success btn-lg btn-block">Register Now</button>
                            </div>
    </form>
                        <div className="text-center">Already have an account? <Link className="link-singin" to="/singin">Sign in</Link></div>
                        {this.state.display===true ?
                <p className="text-center" style={{fontSize:'30px',color:'red'}}>Please wait...</p>
                    :   ""}
                    </div>
                    )
                }
}
export default withRouter(SignUnform)