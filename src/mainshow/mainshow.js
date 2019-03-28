import React, { Component } from 'react'
import Slider from '../home/component/slider'
import Footer from '../home/component/footer'
import Nav from '../home/component/nav'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import sale from '../home/actions/action'
import img1 from './img/stamp-text-help-wanted-inside-260nw-186245453.jpg'

class Mainsow extends Component {
    state = {
        test: 0,
        type: 0,
        str: '',

    }

    componentDidMount() {
        var str = this.props.match.params.id;
        var newStr = "";
        for (var i = 0; i < str.length; i++) {
            if (i !== 0)
                newStr += str[i]

        }

        this.setState({ str: newStr })
        fetch('/' + newStr)
            .then((res) => res.text())
            .then((data) => {
                if (data === "") {
                }
                else {
                    this.props.dispatch(sale(JSON.parse(data)))

                }
            })
            .catch((err) => console.log(err))
    }
    find = () => {
        // let sel1;
        // let type1;
        let sel1 = '';
        let type1 = '';
        // city
        let city = this.refs.city.value;
        let location = this.refs.location.value;
        if (this.state.test === 1 && this.state.type === 1) {
            type1 = "home"
            sel1 = this.refs.text.value;
        }
        else if (this.state.test === 2 && this.state.type === 2) {
            type1 = "plot"
            sel1 = this.refs.text1.value;
        }
        else if (this.state.test === 3 && this.state.type === 3) {
            type1 = "commercial"
            sel1 = this.refs.text2.value;
        }
      
            var options = {
                method: 'POST',
                body: JSON.stringify({ cityname: city, type: type1, sub_type: sel1,location:location }),
                headers: {
                    'Content-type': 'application/json'
                }
            }

            fetch('/s' + this.state.str, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.found === true) {
                       
                        var finalvalue = data.land
                        this.props.dispatch(sale(finalvalue))
                    }
                    else if (data.found === false) {
                        this.props.dispatch(sale([]))
                       
                    }
                })
                .catch((err) => console.log(err))

        // }
    }

    // home style function
    home = () => {
        this.test = 1;
        // Get the checkbox
        var checkBox = this.refs.home;
        // Get the output text
        var text = this.refs.text;
        // commercial1
        var commercial = this.refs.commercial1;
        var plot = this.refs.plot1;
        // If the checkbox is checked, display the output text
        if (checkBox.checked === true) {
            this.setState({ test: 1, type: 1 })
            // this.post()
            text.style.display = "block";
            plot.style.display = "none"
            commercial.style.display = "none"
        } else {
            this.setState({ test: 0, type: 0 })
            text.style.display = "none";
            plot.style.display = "block";
            commercial.style.display = "block";
        }
    }
    // plot style function
    plot = () => {
        // Get the checkbox
        var checkBox = this.refs.plot;
        // Get the output text
        var text = this.refs.text1;
        var home = this.refs.home1;
        var commercial = this.refs.commercial1;

        // If the checkbox is checked, display the output text
        if (checkBox.checked === true) {
            this.setState({ test: 2, type: 2 })
            // this.post()
            text.style.display = "block";
            home.style.display = "none";
            commercial.style.display = "none";
        } else {
            this.setState({ test: 0, type: 0 })
            text.style.display = "none";
            home.style.display = "block";
            commercial.style.display = "block";
        }
    }
    // commercial style function

    commercial = () => {
        // Get the checkbox
        var checkBox = this.refs.commercial;
        // Get the output text
        var text = this.refs.text2;
        var plot = this.refs.plot1
        var home = this.refs.home1;
        // If the checkbox is checked, display the output text
        if (checkBox.checked === true) {
            this.setState({ test: 3, type: 3 })
            // this.post()
            text.style.display = "block";
            plot.style.display = "none";
            home.style.display = "none";
        } else {
            this.setState({ test: 0, type: 0 })
            text.style.display = "none";
            home.style.display = "block";
            plot.style.display = "block";
        }
    }
    render() {

        return (
            // search
            
            <div><Nav/>
            <Slider/>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-10 col-lg-10">
                        <h4 className="search-h1">Search properties in Pakistan</h4>
                    </div>
                    <div className="col-md-2 col-lg-2"></div>

                </div>


                {/* <button type="button" className="btn btn-outline-success btn-lg">Success</button> */}
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12"></div>

                    <div className="col-lg-4 col-md-3 col-sm-6">

                        <form>
                            <div className="form-group">
                                <label className="search-label1">Find City</label>
                                <input type="text" className="form-control" ref="city" aria-describedby="emailHelp" placeholder="Search for City" />
                            </div>
                                <div className="form-group">
                                    <label className="search-label1">Find Location</label>
                                    <input type="text" className="form-control" ref="location" aria-describedby="emailHelp" placeholder="Search for Location" />
                                </div>
                            <div className="form-group">
                                <label className="search-label1">Property Type</label>
                                {/* <h5 style={{margin:'2px'}}>Based on <a href="acv">Drop Down Menu - CSS Animation by DevTips</a></h5> */}
                                {/* <!-- home --> */}
                                <span ref="home1" style={{ display: 'block' }}>Home: <input type="checkbox" ref="home" onChange={this.home} /></span>
                                <br></br>
                                <select style={{ display: 'none' }} ref="text">
                                    <option value="house">House</option>
                                    <option value="flat">Flat</option>
                                    <option value="upper">Upper portion</option>
                                    <option value="lower">Lower portion</option>
                                    <option value="farm">Farm house</option>
                                    <option value="room">Room</option>


                                </select>
                                {/* plot */}
                                <span ref="plot1" style={{ display: 'block' }}>Plots: <input type="checkbox" ref="plot" onClick={this.plot} /></span>
                                <br></br>
                                <select style={{ display: 'none' }} ref="text1">
                                    <option value="residentail">Residentail plot</option>
                                    <option value="commercial">Commercial plot</option>
                                    <option value="agricultural">Agricultural land</option>
                                    <option value="industrail">Industrail land</option>



                                </select>
                                {/* commercial */}
                                <span ref="commercial1" style={{ display: 'block' }}>Commercial: <input type="checkbox" ref="commercial" onClick={this.commercial} /></span>

                                <select style={{ display: 'none' }} ref="text2">
                                    <option value="office">Office</option>
                                    <option value="shop">Shop</option>
                                    <option value="warehouse">Warehouse</option>
                                    <option value="factory">Factory</option>
                                    <option value="building">Building</option>
                                </select>


                            </div>

                            <button onClick={this.find} className="btn btn-primary find-b" type="button">Find</button>
                        </form>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-12"></div>

                </div>

















                {/* repeateable */}
<h2>Related Properties</h2>
                <div className="row main-card-div" >
                <div className="col-md-12 col-lg-12 col-sm-12">
                        

                    {(this.props.sold !== undefined && this.props.sold !== "" && this.props.sold.length !== 0) ?

                        this.props.sold.map((value, index) => {
                            return  <div key={index} style={{float:"left",margin:'0'}} className="pcard col-md-3 card" style={{ width: '18rem' }}>
                               <img  className="card-img-top card-img" src={value.images || img1} alt="Card-image-cap" />
                                <div className="card-body">
                                    <h5 className="card-title p-t">{value.title}</h5>
                                    <h5 className="card-title p-t">PKR:{value.budget}</h5>
                                    <h5 className="card-title p-t">Property-type:{value.property_type}</h5>
                                   
                                    <Link to={'detail/' + value._id + '/' + this.state.str} className="btn btn-primary p-b p-t">Details</Link>
                                </div>
                                
                            </div>
                             
                       
                            
                        })


                        : <div className="container">
                            <div className="col-md-2 col-lg-2"></div>
                            <div className="col-md-8 col-lg-8">
                                <h2>Showing Result</h2>

                                <h3>Sorry!!! Record not found</h3>
                            </div>
                            <div className="col-md-2 col-lg-2"></div>


                        </div>
                    }

                </div>
                    </div>
                    {/* <div className="col-md-1 col-lg-1 col-sm-1"></div> */}
            </div>
            <Footer/>
            </div>
        )
    }
}

var funn = (store) => {
    return {
        sold: store.zameenReducer,

    }
}
export default connect(funn)(Mainsow);

