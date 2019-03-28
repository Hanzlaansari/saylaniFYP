import React, { Component } from 'react'
import { storage } from '../firebase/index'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
 class CreatePost extends Component {
     state = {
         test: 0,
         type: 0,
         display: 'block',
         id: '',
     }
    componentDidMount(){
        fetch('/dashbord')
        .then((res)=> res.text())
        .then((data)=>{
            var b = JSON.parse(data)
            if (b.authanticat===true){
                this.setState({ id: b.user._id })
            }
            else if(b.authanticat===false){
                this.props.history.push('/singin')
            }
            
      
        } 
            )
        .catch((err)=> console.log(err))
       
     }
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image });
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapshot) => {
                // progress funcion
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({ progress });
            },
            (error) => {
                // error funcion

                console.log(error);
            },
            () => {
                // complete funcion
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(url => {
                        // this.refs.img.src=url;
                        this.setState({ url });
                    })

            }
        )
    }
  
    change =()=>{
let pur =this.refs.purpose.value;
if(pur==="wanted"){
    this.setState({display:'none'})
}
else{
    this.setState({ display: 'block' })
}
    }
    post = () => {
        
        let purpose = this.refs.purpose.value;
       
        let sel1;
        let type1;
        if (this.state.test === 1 && this.state.type === 1) {
            type1 = "home"
            sel1 = this.refs.text.value;
        }
        if (this.state.test === 2 && this.state.type === 2) {
            type1 = "plot"
            sel1 = this.refs.text1.value;
        }
        if (this.state.test === 3 && this.state.type === 3) {
            type1 = "commercial"
            sel1 = this.refs.text2.value;
        }
  

        let city_name = this.refs.city_name.value;
        let location = this.refs.location.value;


        // property detail............................................

        // detail
        let property_title = this.refs.property_title.value;
        let propert_description = this.refs.propert_description.value;
        let budget = this.refs.budget.value;
        let land_area = this.refs.land_area.value;
        let area_unit = this.refs.area_unit.value;
        let bedrooms = this.refs.bedrooms.value;
        let bathrooms = this.refs.bathrooms.value;
        let expire_date = this.refs.expire_date.value;
        let img = this.state.url;
   

        var obj = {
            user_id: this.state.id,
            type: type1,
            sub_type: sel1,//sub type write
            city_name: city_name,
            location: location,
            property_title: property_title,
            propert_description: propert_description,
            budget: budget,
            land_area: land_area,
            area_unit: area_unit,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            expire_date: expire_date,
            images:img,

        }
        if(type1===undefined){
alert("Please select propert type")
this.refs.home.focus();
this.refs.plot.focus();
this.refs.commercial.focus();
        }
        else if (city_name===""){
alert('please enter city')
            this.refs.city_name.focus()
        }
        else if (location === "") {
            alert('please enter location')
            this.refs.location.focus()
        }
        else if (property_title === "") {
            alert('please enter property title')
            this.refs.property_title.focus()
        }
        else if (propert_description === "") {
            alert('please enter description about property')
            this.refs.propert_description.focus()
        }
        else if (budget === "") {
            alert('please enter proprty budget')
            this.refs.budget.focus()
        }
        else if (budget <0) {
          
                alert('Budget must be a positive value')
                this.refs.budget.focus()
            }
        else if (budget < 2000){
                alert('budget is too short')
                this.refs.budget.focus()
            
        }
        else if (land_area==="") {
            alert('please enter proprty area')
            this.refs.land_area.focus()
        }
        else if (land_area <0) {
           
                alert('area must be apositive number')
                this.refs.land_area.focus()
            
          
        }

        else if (this.state.image === null && purpose!=="wanted") {
            alert("Please upload an property image")
        }
        else if (this.state.url === "" && purpose !== "wanted" ) {
            alert("Please Wait, the image is being uploading")
        }
        
        else{
        if (purpose==="sale"){
            var options = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers:
                {
                    'Content-type': 'application/json'
                }
            }
            fetch('/sale', options)
                .then((res) => res.json())
                .then((data) => {
                    if(data.appload===true){
                        alert('proprty added to zameen')
                      this.props.history.push('/home')
                    }
                    
                })
                .catch((err) => console.log((err)))

        }
        else if(purpose==="rent"){
            var options = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers:
                {
                    'Content-type': 'application/json'
                }
            }
            fetch('/rent', options)
                .then((res) => res.json())
                .then((data) =>{
                    alert('proprty added to zameen')
                    this.props.history.push('/home')
                } )
                .catch((err) => console.log((err)))


        }
        else if(purpose==="wanted"){
            var options = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers:
                {
                    'Content-type': 'application/json'
                }
            }
            fetch('/wanted', options)
                .then((res) => res.json())
                .then((data) => {
                    alert('proprty added to zameen')
                    this.props.history.push('/home')
                })
                .catch((err) => console.log((err)))
        }
       
        }
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
            <div className="post">
                <form>
               
                    <div className="container ">

                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8 post-container">
                                <h4 className="post-h">Add a Property</h4>

                                <div className="row">
                                    <div className="small-banner">
                                        <p className="post-p2">PROPERTY TYPE AND LOCATION</p>

                                    </div>
                                    {/* <p className="purpose-form">Purpose</p><br></br> */}

                                    {/*  select buttons*/}

                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                        <div className="col-lg-10 col-md-10 col-sm-10">
                                            <div className="panel panel-primary">
                                                <div className="panel-body">
                                                    <h4 className="text-on-pannel text-primary"><strong className="text-uppercase"> Purpose </strong></h4>

                                                    <select onChange={this.change} ref="purpose">

                                                        <option value="sale">For sale</option>
                                                        <option value="rent">For Rent</option>
                                                        <option value="wanted">Wanted</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    </div>                     {/* property type */}

                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                        <div className="col-lg-10 col-md-10 col-sm-10">
                                            <div className="panel panel-primary">
                                                <div className="panel-body">
                                                    <h4 className="text-on-pannel text-primary"><strong className="text-uppercase">Property type</strong></h4>


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
                                            </div>

                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    </div>




                                    {/* city */}

                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                        <div className="col-lg-10 col-md-10 col-sm-10">
                                            <div className="panel panel-primary">
                                                <div className="panel-body">
                                                    <h4 className="text-on-pannel text-primary"><strong className="text-uppercase">City Name and location</strong></h4>

                                                    <div className="radio-main-div">

                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">

                                                                <input type="text" ref="city_name" className="form-control" id="inputEmail4" placeholder="City Name" />
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className="radio-main-div">

                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">

                                                                <input type="text" ref="location" className="form-control" id="inputEmail4" placeholder="Enter Location" />
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    </div>




                                </div>








                                {/* property details */}
                                <div className="row">
                                    <div className="small-banner">
                                        <p className="post-p2">PROPERTY Details</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <h4 className="text-on-pannel text-primary"><strong className="text-uppercase">Detail</strong></h4>

                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Property Title</label><br></br>
                                                            <input type="text" ref="property_title" className="form-control" id="inputEmail4" placeholder="Property Title" />
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Description</label><br></br>
                                                            <textarea ref="propert_description" className="form-control is-invalid" id="validationTextarea" placeholder="Add Description About Property" ></textarea>
                                                        </div>
                                                    </div>


                                                </div>



                                                {/* price */}
                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Budget: (PKR) </label><br></br>
                                                            <input type="number" className="form-control" ref="budget" placeholder="Enter Budget" />
                                                        </div>
                                                    </div>


                                                </div>

                                                {/* land area */}

                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title"> Land Area</label><br></br>
                                                            <input type="number" className="form-control" ref="land_area" placeholder="Enter Land Area" />
                                                        </div>
                                                    </div>


                                                </div>
                                                {/* land area unit */}
                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Unit</label><br></br>
                                                            <select className="custom-select form-select-option" ref="area_unit">
                                                                <option defaultValue value="s_feet" >Square Feet</option>
                                                                <option value="s_yard">Square Yard</option>
                                                                <option value="s_meter">Square Mater</option>
                                                                <option value="marla">Marla</option>
                                                                <option value="kanal">Kanal</option>
                                                            </select>

                                                        </div>
                                                    </div>


                                                </div>
                                                {/* bedRooms */}
                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Bedrooms</label><br></br>
                                                            <select className="custom-select form-select-option" ref="bedrooms">

                                                                <option defaultValue value="0" >0</option>
                                                                <option  value="1" >1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="10+">10+</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* bathrooms */}
                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Bathrooms</label><br></br>
                                                            <select className="custom-select form-select-option" ref="bathrooms">

                                                                <option defaultValue value="0" >0</option>
                                                                <option  value="1" >1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="10+">10+</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* expiry date */}

                                                <div className="radio-main-div">

                                                    <div className="form-row">
                                                        <div className="form-group col-md-12">
                                                            <label htmlFor="title">Expire After</label><br></br>
                                                            <select className="custom-select form-select-option" ref="expire_date">

                                                                <option defaultValue value="1month" >1 Month</option>
                                                                <option value="3month">3 Month</option>
                                                                <option value="6month">6 Month</option>

                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                </div>
                                {/* add images */}


                                <div style={{ display: this.state.display }} className="row">
                                    <div className="small-banner">
                                        <p className="post-p2">Appload Images</p>







                                    </div>
                                </div>

                                <div style={{display:this.state.display}} className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <h4 className="text-on-pannel text-primary"><strong className="text-uppercase"> Images </strong></h4>
                                            {/* zeeshan img div */}
                                                <div>
                                                    <input type="file" onChange={this.handleChange} />
                                                    <progress value={this.state.progress} max="100" />
                                                    <img ref='img' className="uploadimgg" src={this.state.url} alt="Uploaded" />
                                                    <br></br>
                                                    <button className="btn btn-primary upload-im"  type='button' onClick={this.handleUpload}>Upload</button>

                                                   
                                                </div>
                                                {/* div close here */}
                                                {/* <div className="form-group">
                                                 
                                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                                    <small id="passwordHelpInline" className="text-muted">
                                                        Only two valid images are allowed
    </small>


                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                </div>

                                {/* submit button */}

                                <div className="row">
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">  <button type="button" onClick={this.post} className="btn btn-primary mb-2 btn-lg form-summbit-btn">Add Property</button></div>
                                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                                </div>


                            </div>
                            <div className="col-md-2"></div>


                        </div>

                    </div>

                </form>
            </div>
        )
    }
}
var funn = (store) => {
    return { data: store.userReducer }
}
export default connect(funn)(withRouter(CreatePost));