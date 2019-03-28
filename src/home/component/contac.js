import React , {Component} from 'react'
import {Link} from 'react-router-dom'
export default class Jumbo extends Component{
render(){
    return(
        <div className="container jumbotr"> 
        <div className="jumbotron">
            <h1 className="display-4">Hi, User</h1>
            <p className="lead">Zameen provides the best and secure platform for booking and selling of Zameen all over the Pakistan.</p>
            <hr className="my-4"/>
                <p>You Can ask, anything about zameen</p>
                <p className="lead">
                    <Link to="/contactus" className="btn btn-primary btn-lg"  role="button">Contact Us</Link>
                </p>
</div>
</div>
    )
}
}
