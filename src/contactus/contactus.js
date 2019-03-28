import React, { Component } from 'react'
import Nav from '../home/component/nav'
import Slider from '../home/component/slider'
import Footer from '../home/component/footer'
class Contactus extends Component {
    state = {
        display:false
    }
    submit=()=>{
     
var name = this.refs.name.value;
var email = this.refs.email.value;
var message = this.refs.message.value;
if(name===""){
    alert('name required')
    this.refs.name.focus();
    
}
       else if (email === "") {
            alert('email required')
            this.refs.email.focus();

        }
       else if (message === "") {
            alert('message required')
            this.refs.message.focus();

        } else{
          this.setState({display:true})
            var options = {
                method:'POST',
                body:JSON.stringify({name:name,email:email,message:message}),
                headers:{
                    'Content-type':'application/json'
                }
            }
    fetch('/contact',options)
            .then((res) =>res.json())
            .then((data)=>{
                if(data.send===true){
                    alert('successfully sent message')
                }
                else if(data.send===false){
                    alert('Enter valid mail')
                }
                
            })
            .catch((err)=>
            {   
                console.log(err)       
            }
           )
        }
    }
    render() {
        return (
            <div>
                <Nav />
                <Slider/>
           <div className="container">
           
                 <div className="row">

            <h2 style={{textAlign:'center',margin:  '100px 0 0 0'}}>Contact us</h2>

            </div>
                 <div className="row">

                 <div className="col-md-3 col-lg-3 col-sm-1"></div>
                 <div className="col-md-6 col-lg-6 col-sm-10">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" ref="name" className="form-control" placeholder="Please Enter Your Name" />
                        </div>
                        <div className="form-group">
                            <label >Email address</label>
                                <input type="email" ref="email" className="form-control"  placeholder="Please Enter Your Email"/>
  </div>
                        <div className="form-group">
                            <label>Your Message</label>
                                <textarea className="form-control" ref="message"  rows="6"></textarea>
                        </div>
                        <button onClick={this.submit} type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
                            {this.state.display === true ?
                                <p className="text-center" style={{ fontSize: '30px', color: 'red' }}>Please wait...</p>
                                : ""}
                 </div>
                 <div className="col-md-3 col-lg-3 col-sm-1"></div>
                 </div>
               
             </div>
                <Footer />
            </div>
        )
    }
}
export default Contactus;