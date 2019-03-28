import React , {Component} from 'react'
import Nav from './component/nav'
import Slider from './component/slider'
import Search from './component/search'

import Jumbo from './component/contac'
import Footer from './component/footer'
export default class Home extends Component{
    render(){
        return(
            <div>
            <Nav/>
<Slider/>
                <Search/>
                <Jumbo/>
              
                <Footer/>
            </div>
        )
    }
}