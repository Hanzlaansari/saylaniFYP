import React, { Component } from 'react'
import { storage } from '../post/firebase/index'
import { withRouter } from 'react-router-dom'
import Nav from '../home/component/nav'
import Slider from '../home/component/slider'
import Footer from '../home/component/footer'
class Showprofile extends Component {
    
    componentDidMount() {

        fetch('/dashbord')
            .then((res) => res.text())

            .then((data) => {
                var b = JSON.parse(data)
                if (b.authanticat === true) {
                    var com = b.user;
                    var fname = com.first_name;
                    var lname = com.last_name;
                    var cell = com.cell;
                    var age = com.age;
                    var location = com.location;
                    var img = com.img;
                    var id = com._id
                    this.setState({ fname: fname, lname: lname, age: age, cell: cell, location: location, img: img, id: id })

                }
                else {

                    this.props.history.push('/singin')
                }
            })
            .catch((err) => console.log(err))

        if (this.state.login === true) {

        }

    }









    constructor(props) {
        super(props);
        this.state = {
         image: null,
         url: '',
         progress: 0,
         display: false,
        fname: '',
        lname: '',
        age: '',
        cell: '',
        location: '',
        img: '',
        id: '',
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
                        this.setState({url});
 this.setState({ display: false })
                        var options = {
                            method: 'POST',
                            body: JSON.stringify({ id: this.state.id, img: this.state.url }),
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }
                        fetch('/profileupdateimg', options)
                            .then((res) => res.json())
                            .then((data) => {
                               
                             

                            })
                            .catch((err) => console.log(err))

                    })

            }
        )
    }
    //    image upload query

    editimg = () => {
        this.setState({ display: true })
    }
    // edit age
    editage = () => {
        let newage = this.refs.editage.value;
        if (newage === "") {
            alert('please enter age')
        }
        else if (newage < 10) {
            alert('please enter valid age')
        }
        else {
       this.setState({ age: newage })
           
            var options = {
                method: 'POST',
                body: JSON.stringify({ id: this.state.id, age: newage }),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            fetch('/profileupdateage', options)
                .then((res) => res.json())
                .then((data) => {
                 
                })
                .catch((err) => console.log(err))
        }
    }
    editcell = () => {

        let newcell = this.refs.editcell.value;
        if (newcell === "") {
            alert('please enter cell no')
        }
        else if (newcell.length < 11) {
            alert('please enter valid number')
        }
        else {
       this.setState({ cell: newcell })
            var options = {
                method: 'POST',
                body: JSON.stringify({ id: this.state.id, cell: newcell }),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            fetch('/profileupdatecell', options)
                .then((res) => res.json())
                .then((data) => {
                 
                })
                .catch((err) => console.log(err))
        }


    }
    editlocation = () => {
        let newlocation = this.refs.editlocation.value;
        if (newlocation === "") {
            alert('please enter location')
        }
        else {
       this.setState({ location: newlocation })
            var options = {
                method: 'POST',
                body: JSON.stringify({ id: this.state.id, location: newlocation }),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            fetch('/profileupdateloc', options)
                .then((res) => res.json())
                .then((data) => {

                })
                .catch((err) => console.log(err))
        }

    }
    render() {

        return (
            <div>
                <Nav />
                
                <Slider />

                <div className="container">

                    {/* <p>image:- {this.state.img}</p> */}

                    <h2 style={{ textAlign: 'center', margin: '50px 0 0 0', color: 'black' }}>Hi ! {this.state.fname} {this.state.lname}</h2>
                    {/* image */}
                    <div style={{ border: '1px solid', padding: '20px 20px 20px 20px', margin: '0 0 20px 0' }} className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <div style={{ width: '150px', height: '150px', borderRadius: '100px', background: 'black' }}>
                                <img src={ this.state.url || this.state.img } style={{ width: '150px', height: '150px', borderRadius: '100px' }} alt="img" />

                            </div>

                            <button onClick={this.editimg} style={{ margin: '10px 0 10px  20px ' }} type="button" class="btn btn-primary">Edit Image</button>



                            {this.state.display === true ?
                                <div style={{ border: '1px solid #ccc', padding: '10px 10px 10px 10px' }}>
                                    <input type="file" onChange={this.handleChange} />
                                    <progress value={this.state.progress} max="100" />
                                    <img ref='img' className="uploadimgg" src={this.state.url} alt="Uploaded" />
                                    <br></br>
                                    <button className="btn btn-primary upload-im" type='button' onClick={this.handleUpload}>Upload</button>


                                </div>
                                : ""}
                            {/* appload img */}
                        </div>
                        <div className="col-md-2"></div>



                        {/* age */}
                        <div className="container">
                            <div className="col-md-2"></div>
                            <div className="col-md-10">
                                <form>

                                    <div class="form-group">
                                        <label htmlFor="exampleInputEmail1">Your age</label>
                                        <input type="number" class="form-control" id="exampleInputEmail1" value={this.state.age || ''} aria-describedby="emailHelp" />
                                    </div>

                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit age</button>


                                    <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>

                                                        <div class="form-group">
                                                            <label htmlFor="recipient-name" class="col-form-label">Age:</label>
                                                            <input type="number" class="form-control" ref="editage" />
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button onClick={this.editage} type="button" class="btn btn-primary">Edit Age</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    {/* cell no */}
                                    <div class="form-group">
                                        <label htmlFor="exampleInputEmail1">Your cell no</label>
                                        <input type="number" class="form-control" id="exampleInputEmail1" value={this.state.cell || ''} aria-describedby="emailHelp" />
                                    </div>

                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#examplecell" data-whatever="@mdo">Edit cell</button>


                                    <div class="modal fade" id="examplecell" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>

                                                        <div class="form-group">
                                                            <label htmlFor="recipient-name" class="col-form-label">cell:</label>
                                                            <input type="number" class="form-control" ref="editcell" />
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button onClick={this.editcell} type="button" class="btn btn-primary">Edit cell</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>










                                    {/* location */}
                                    <div class="form-group">
                                        <label htmlFor="exampleInputEmail1">Your location</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value={this.state.location || ''} aria-describedby="emailHelp" />
                                    </div>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleloc" data-whatever="@mdo">Edit Location</button>


                                    <div class="modal fade" id="exampleloc" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>

                                                        <div class="form-group">
                                                            <label htmlFor="recipient-name" class="col-form-label">Location:</label>
                                                            <input type="text" class="form-control" ref="editlocation" />
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button onClick={this.editlocation} type="button" class="btn btn-primary">Edit Location</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </form>



                            </div>


                        </div>
                        <div className="col-md-2"></div>

                    </div>
                    {/* row age */}

                </div>

                {/* row */}
                <Footer />
            </div>
        )
    }
}

export default (withRouter(Showprofile));