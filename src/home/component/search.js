import React , {Component} from 'react';
import sale from '../actions/action'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

 class Search extends Component{
   
    state = {
        test: 0,
        type: 0
    }
    // findsale function...............................
     findsale=()=>{

         fetch('/salefind')
.then((res)=> res.text())
.then((data)=> {
    if(data===""){
    }
    else{
    this.props.dispatch(sale(JSON.parse(data)))

    }
})
.catch((err)=> console.log(err))
    }
// find rent function..........................
     findrent = ()=>{
         fetch('/rentfind')
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
// find wanted function.................................
     findwanted = ()=>{
         fetch('/wantedfind')
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



    render(){
        return(
            <div className="container">
                <h4 className="search-h1">Search  properties  in Pakistan</h4>
                
                <Link to="/show:salefind"> <button type="button" onClick={this.findsale} className="btn btn-primary btn-lg search-btn1">Buy</button></Link>
                <Link to="/show:rentfind"> <button type="button" onClick={this.findrent} className="btn btn-primary btn-lg search-btn1">Rent</button></Link>
                <Link to="/show:wantedfind">  <button type="button" onClick={this.findwanted} className="btn btn-primary btn-lg search-btn1">Wanted</button></Link>
               
              

                            

                           
</div>
                
             
            
        )
    }
}
var funn = (store) => {
    return { data: store.landreducer}
}
export default connect(funn)(Search);