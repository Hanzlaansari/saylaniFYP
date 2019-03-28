import React , {Component} from 'react'
import {Link} from 'react-router-dom'
export default class Footer extends Component{
    render(){
        return(
            <div className="footer-show">
            <div className="container ">

                <footer className="page-footer font-small stylish-color-dark pt-4">

                    <div className="container text-center text-md-left">

                        <div className="row">

                            <div style={{padding:'20px 0 20px 0'}} className="col-md-4 mx-auto">

                                    <h5 className="font-weight-bold text-uppercase mt-3 mb-4 booking-footer">ZAMEEN.pk</h5>
                                    <a target="_blank" rel="map" href="https://www.google.com/maps/place/D+Ground+People's+Colony+No+1,+Faisalabad,+Punjab,+Pakistan/@31.4050614,73.0993962,15z/data=!3m1!4b1!4m5!3m4!1s0x3922680a54c1915d:0x963e48f49ba43c49!8m2!3d31.4063632!4d73.1069298">  <i className="fas fa-location-arrow booking-footer"></i>  <span className="booking-footer">D-Ground Faisalabad</span></a><br></br>
                                    <a href="mailto:hanzlaansari2656@gmail.com"> <i style={{color:'black'}} class="fas fa-envelope-square"></i>  <span className="booking-footer">ZAMEEN@gmail.com</span><br></br>
                                        <a href="tel:03027269480"> <div><i className="fas fa-tty booking-footer booking-footer"></i><span className="booking-footer">0800-107810</span></div></a>
                                        <div><span className="booking-footer"><Link style={{ marginBottom: '20px' }} className="booking-footer" to="/team">About Team</Link></span></div></a>

                            </div>
               
                          

                           

                            <div className="col-md-2 mx-auto">


                            </div>

                        </div>

                    </div>

 

                </footer>
            </div>
            </div>
        )
    }
}