import React, { Component } from 'react'
import img1 from './images/building_construction_facade_117416_1280x720.jpg'
import img2 from './images/building_construction_facade_117838_1280x720.jpg'
import img3 from './images/building_facade_architecture_123298_1280x720.jpg'
export default class Slider extends Component {
    render() {
        return (
            <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item itm active">
                        <img className="d-block w-100" src={img1} alt="First slide" />
                            <div className=" captions carousel-caption d-none d-md-block">
                                <h1>Rent Zameen</h1>
                                <h3 style={{color:'white',textAlign:'left'}}>Zameen.pk is the first and largest property portal in Pakistan</h3>
                                
                            </div>
                    </div>
                    <div className="carousel-item itm">
                        <img className=" w-100" src={img2} alt="Second slide" />
                            <div className=" captions carousel-caption d-none d-md-block">
                                <h1>Sale Zameen</h1>
                                <h3 style={{ color: 'white', textAlign: 'left' }}>Zameen.pk connects buyers with sellers and tenants with landlords for highly user-friendly real estate experience.</h3>
                            </div>
                    </div>
                        <div className="carousel-item itm">
                        <img className=" w-100" src={img3} alt="Third slide" />
                            <div className="captions carousel-caption d-none d-md-block">
                                <h1>Wanted Zameen</h1>
                                <h3 style={{ color: 'white', textAlign: 'left' }}>The company is also the pioneer of large-scale real estate events and frequently organizes expos locally . </h3>
                            </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            </div>
            )
        }
}