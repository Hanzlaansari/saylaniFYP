import React , {Component} from 'react'
import Slider from '../home/component/slider'
import Footer from '../home/component/footer'
import Nav from '../home/component/nav'
import img1 from '../home/component/images/user-solid.svg'
class Userprofile extends Component{
  state={
      fname:'',
      lname:'',
      email:'',
      cell:'',
      img:''
    //   img:''
  }
  
    componentDidMount(){
        var id = this.props.match.params.id;
        fetch('/userprofile?id='+id)
        .then((res)=> res.text())
        .then((data)=>{
            var b=JSON.parse(data)
           
            this.setState({fname:b.first_name,lname:b.last_name,email:b.email,cell:b.cell,img:b.img})
        })
        .catch((err)=> console.log(err))
    }
    render(){
        return(
            <div>
                <Nav/>
            <Slider/>
                <div className="Profile container">
                <h2 style={{textAlign:'center'}}>Owner Detail</h2>
                    <div className="Profile-Content ">
                        <div className="profile-image">
                            <img src={ this.state.img ||img1 } alt="abc" />
                        </div>
                        <h5 >First Name:- <span style={{ color: '#ff9f1a' }}>{this.state.fname}</span></h5>
                        <h5 >Last Name:- <span style={{ color: '#ff9f1a' }}>{this.state.lname}</span></h5>
                        {/* <div className='btn-div' >
                           <button className='btn btn-dark' >My Ads</button>
                        </div> */}
                        <h5 >Email:- <span style={{ color: '#ff9f1a' }}>{this.state.email}</span></h5>
                        <h5 >Cell no:- <span style={{ color: '#ff9f1a' }}>{this.state.cell}</span></h5>
                        {/* <div className='btn-div1' >
                            <button className='btn btn-dark' >Edit Profile</button>
                        </div> */}
                    </div>
                </div>

                <Footer/>

            </div>
        )
    }
}
export default Userprofile;