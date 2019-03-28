import React, {Component} from 'react'
import img1 from './images/a.jpg'
import img2 from './images/b.jpg'
import img3 from './images/c.jpg'
import img4 from './images/d.jpg'
export default class Chairman extends Component{
    render(){
        return(
            <div className="container">
            
            <h2 style={{textAlign:'center',margin:'50px 0 30px 0'}}>Aboute Team</h2>
            
                <div style={{ margin: '50px 0 30px 0' }} className="row">
            <div style={{margin: '20px 0 0px 0'}} className="col-md-5 col-sm-12">
            <div style={{width:'200px',height:'200px',borderRadius:'100%',margin:'0 auto'}}>
                            <img style={{ width: '200px', height: '200px', borderRadius: '100%' }} src={img4} alt="syv" />
                            <h4 className="chairmanh1" style={{ margin: '10px 0 10px 40px ' }}>Hanzla Ansari</h4>
            </div>
            
            </div>
                    <div style={{ margin: '50px 0 0px 0' }} className="col-md-5 col-sm-12">
            
                        <div style={{ width: '200px', height: '200px', borderRadius: '100%', margin: '0 auto' }}>
                            <img style={{ width: '200px', height: '200px', borderRadius: '100%' }} src={img1} alt="syv" />
                            <h4 className="chairmanh1" style={{ margin: '10px 0 50px 40px ' }}>Zeeshan Ahmad</h4>
                        </div>
            </div>
       
            </div>
                <div style={{ margin: '50px 0 30px 0' }} className="row">
                    <div style={{ margin: '20px 0 0px 0' }} className="col-md-5 col-sm-12">
                        <div style={{ width: '200px', height: '200px', borderRadius: '100%', margin: '0 auto' }}>
                            <img style={{ width: '200px', height: '200px', borderRadius: '100%' }} src={img3} alt="syv" />
                            <h4 className="chairmanh1" style={{ margin: '10px 0 10px 40px ' }}>Abid Hussain</h4>
                        </div>

                    </div>
                    <div style={{ margin: '50px 0 0px 0' }} className="col-md-5 col-sm-12">

                        <div style={{ width: '200px', height: '200px', borderRadius: '100%', margin: '0 auto' }}>
                            <img style={{ width: '200px', height: '200px', borderRadius: '100%' }} src={img2} alt="syv" />
                            <h4 className="chairmanh1" style={{ margin: '10px 0 50px 40px ' }}>Zohaib Ahmad</h4>
                        </div>
                    </div>

                </div>
               
            </div>
        )
    }
}
