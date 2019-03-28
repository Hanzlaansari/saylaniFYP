import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import img1 from './images/no-avatar.png'
import { Dropdown } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
class Nav extends Component {
    state = {
        show: true,
        login: true,
        img: '',
        id: ''
    }
    componentDidMount() {
        fetch('/dashbord')
            .then((res) => res.text())
            .then((data) => {
                var b = JSON.parse(data)
                if (b.authanticat === true) {
                    this.setState({ show: false, login: true, id: b.user._id, img: b.user.img })

                }
                else {
                    this.setState({ show: true, login: false })
                }



            }
            )
            .catch((err) => console.log(err))


    }
    add = () => {
        if (this.state.login === true) {
            this.props.history.push('/post')
        }
        else if (this.state.login === false) {
            this.props.history.push('/singin')
        }
    }
    logout = () => {
        fetch('/logout')
            .then((res) => res.text())
            .then((data) => {
                this.props.history.push('/singin')
            })
            .catch((err) => console.log(err))

    }

    render() {
        return (
            <div>
                <nav className="navbar mainmenu-area" data-spy="affix" data-offset-top="197">
                    <div className="container">

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="navbar-header smoth">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mainmenu">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>



                                    <Link to="/home" className="navbar-brand ">



                                        <strong style={{ color: 'white' }}>ZAMEEN.pk</strong>
                                    </Link>


                                </div>

                                <div className="collapse navbar-collapse navbar-right" id="mainmenu">


                                    <ul className="nav navbar-nav navbar-right help-menu">
                                        <div className="accountimg">

                                            <Dropdown style={{ borderRadius: '100%', padding: '0' }} >
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '50px', height: '50px', borderRadius: '100%', padding: '0' }}>
                                                    <img src={this.state.img || img1} style={{ width: '100%', height: '50px', borderRadius: '100%' }} alt="sdi" />
                                                </Dropdown.Toggle>

                                                {this.state.show === true ?
                                                    <Dropdown.Menu>

                                                        <Dropdown.Item className="dropdown-home"><Link to="/singin">Sing in</Link></Dropdown.Item>
                                                        <br/>
                                                        <Dropdown.Item className="dropdown-home"><Link to="/singup">Sing up</Link></Dropdown.Item>
                                                   
                                                        </Dropdown.Menu>
                                                        : 
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item className="dropdown-home"><Link to="/showprofile">Profile</Link></Dropdown.Item>
                                                        <br/>
                                                        <Dropdown.Item className="dropdown-home"><span onClick={this.add}>Add Property</span></Dropdown.Item>
                                                        <br/>
                                                        <Dropdown.Item className="dropdown-home"><span onClick={this.logout}>Sing out</span></Dropdown.Item>
                                                        
                                                    </Dropdown.Menu>

                                                    }
                                                
                                            </Dropdown>
    
                                        </div>
                                    </ul>
                                        <ul className="nav navbar-nav primary-menu">
                                            <li className="active"><Link to="/home">Home</Link></li>
                                            <li><Link to="/aboutus">About us</Link></li>
                                            <li><a style={{ cursor: 'pointer' }} onClick={this.add}>Add Property</a></li>
                                            <li><Link to="/contactus">Contact</Link></li>
                                        </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                </nav>

            </div>
                )
            }
        }
export default withRouter(Nav)