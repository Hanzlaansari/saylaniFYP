import React, { Component } from 'react'
import { connect } from 'react-redux'
import sale from '../actions/action'
import img1 from './images/building_construction_facade_117416_1280x720.jpg';

class Show extends Component {
         componentDidMount() {
             fetch('/salefind')
                 .then((res) => res.text())
                 .then((data) => {
                     if (data === "") {
                     }
                     else {
    var b = JSON.parse(data)
                         this.props.dispatch(sale(b))
                     }
                 })
                 .catch((err) => console.log(err))
         }
    render() {
        return (


            <div className="container">
                {(this.props.sold !== undefined && this.props.sold !== "") ?

                     this.props.sold.map((value, index) => {
                        return <div key={index} className="show-main">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <img src={img1} alt="" />
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <ul className="show-list">
                                        <li>PKR <b>{value.budget}</b></li>
                                        <li><i className="fal fa-map-marker-alt"></i>{value.location}`,`{value.city}</li>
                                        <li><b>{value.title}</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    })
                    

                  : <div>
                     <h2>Showing Result</h2>
                      <div className="row">
                         <p>Sorry!!! Record not found</p>
                       </div>
                    </div>
                } 


            </div>
        )
    }
}
var funn = (store) => {
    return {
        sold: store.zameenReducer,
      
    }
}
export default connect(funn)(Show);