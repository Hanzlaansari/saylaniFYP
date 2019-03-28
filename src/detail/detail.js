import React , {Component} from 'react'
import Footer from '../home/component/footer'
import Slider from '../home/component/slider'
import Nav from '../home/component/nav'
import {connect} from 'react-redux'
import sale from '../home/actions/action'
import img1 from '../mainshow/img/stamp-text-help-wanted-inside-260nw-186245453.jpg'
import {Link} from 'react-router-dom'
class Detail extends Component{
    componentDidMount(){
        var type = this.props.match.params.type;
        var id = this.props.match.params.id;
        fetch('/detail?type=' + type +"&id="+id)
        .then((res)=> res.text())
        .then((data)=>{
            var b = JSON.parse(data)
            this.props.dispatch(sale([b]))
        })
        .then((err)=> console.log(err))
    }
    render(){
        return(

          <div>
                <Nav />
                <Slider />     
            <div style={{marginTop:'100px'}}  className='ad-details-main row'>
            <h2 style={{textAlign:'center'}}>Property Detail</h2>

                {/*  */}

                {/*  */}
                
                {this.props.sold.map((value,index)=>{
                    
                    return <div key={index} className="container">
                        <div className="card">
                            <div className="container-fliud">
                                <div className="row">
                                    <div className="preview col-md-8 col-lg-8">

                                        <div className="preview-pic tab-content">
                                            <div className="tab-pane active" id="pic-1"><img src={value.images || img1} /></div>
                                        
                                        </div>
                                       </div>
                                    <div className="details col-md-4 col-lg-4 detail-col">
                                        <h4 className="price"> title:- <span>{value.title}</span></h4>
                                        {/* <h3 className="product-title"> title:- {value.title}</h3> */}
                                        <div className="rating ">
                                            <h4 className="price">Property type: <span>{value.property_type}</span></h4>
                                            {/* <span className="review-no">{value.property_type}</span> */}
                                            
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">Property sub_type: <span>{value.sub_type}</span></h4>

                                        {/* <span className="review-no">Property sub_type:{value.sub_type}</span> */}
                                        </div>
                                        <div className="rating">
                                        <h4 className="price">Budget: <span>PKR: {value.budget}</span></h4>
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">City:<span> {value.city}</span></h4>
                                            {/* <span className="review-no">Location: {value.location}</span> */}
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">Location:<span> {value.location}</span></h4>
                                        {/* <span className="review-no">Location: {value.location}</span> */}
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">Land Area:<span> {value.land_area}</span></h4>
                                        {/* <span className="review-no">Land Area: {value.land_area}</span> */}
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">unit Area:<span>  {value.unit_area}</span></h4>
                                        {/* <span className="review-no">unit Area: {value.unit_area}</span> */}
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">Bedrooms:<span>   {value.bedrooms}</span></h4>
                                        {/* <span className="review-no">Bedrooms: {value.bedrooms}</span> */}
                                        </div>
                                        <div className="rating">
                                            <h4 className="price">Bathrooms: <span>{value.bathrooms}</span></h4>
                                        {/* <span className="review-no">Bathrooms: {value.bathrooms}</span> */}
</div>



                                        <div className="rating">
                                            <h4 className="price">Description:</h4>
</div>
                                        <div className="rating rating-height">
                                        <p className="product-description">{value.description}</p>
                                      </div>
                                    
                                        <div className="action">
                                            <Link to={'/profile/' + value.user_id}> <button className="add-to-cart btn btn-default" type="button">Owener</button></Link> 
                                         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    </div>








                 
                })}
        
               

                </div>
                <Footer />
            </div>
          
        )
    }
}
var funn = (store) => {
    return {
        sold: store.zameenReducer,

    }
}
export default connect(funn)(Detail);