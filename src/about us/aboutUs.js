import React , {Component} from 'react'
import About from './component/about'
import Nav from '../home/component/nav'
import Slider from '../home/component/slider'
import Footer from '../home/component/footer'
class AboutUs extends Component{
    render(){
        return(
            <div>
            <Nav/>
                <Slider/>
                <About/>
                <Footer/>
            </div>
        )
    }
}
export default AboutUs;