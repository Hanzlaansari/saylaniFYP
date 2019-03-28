import React , {Component} from 'react'
class About extends Component{
    render(){
        return(
          <div className="container">
          <div className="row"><h1 className="about-h1">About Us</h1></div>
          <div className="row">
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-10 col-md-10">
                        <h5 className="about-h5">WHAT IS ZAMEEN.pk?</h5>
                        <p>Zameen.pk is the first and largest property portal in Pakistan and is among the top five property portals in the world. It was founded in 2006 and has since revolutionised the real estate industry of Pakistan by connecting buyers and sellers online in a highly convenient way, making it a household name among Pakistanis around the world. With over 350,000 new listings each month, and over 5 million monthly users, it is the pioneering property portal of Pakistan, with more than 12,500 agencies registered.</p>
          
                        <h5 className="about-h5">What do we do?</h5>
                        <p>Zameen.pk connects buyers with sellers and tenants with landlords for highly user-friendly real estate experience. The extensive listings and projects on offer provide something for everyone when it comes to property.</p>
                        <p>The team uses a 360-degree marketing strategy, covering all aspects of the projects, and helps buyers on every step of the way, with transparency guaranteed.</p>
                        <h5 className="about-h5">Zameen Expos
</h5>
                        <p>The company is also the pioneer of large-scale real estate events and frequently organizes expos both locally and internationally. It holds widely attended expos in Karachi, Lahore, and Islamabad, and since 2017, it has also expanded its events to Dubai, with the Pakistan Property Show. An astounding 400,000 people visit Zameen Expos every year, and can explore property options with over 500 exhibitors.</p>
                        </div>
          <div className="col-lg-1 col-md-1"></div>
                    
          </div>
          </div>
        )
    }
}
export default About;