import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './home/home'
// import Chairman from './chairman/chairman'
import AboutUs from './about us/aboutUs'
import Userauth from './account/component/autantication'
import Mainsow from './mainshow/mainshow'
import Post from './post/post'
import SingIn from './account/signIn'
import Detail from './detail/detail'
import Singup from './account/singup'
import Contactus from './contactus/contactus'
import Userprofile from './profile/profile'
import Showprofile from './profile/userprofile'
import Chairman from './chairman/chairman'
import Forgetmail from './account/component/forgetmail'
import forgetauth from './account/component/forgetauth'
import './App.css';
import store from './redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>

            <Switch>
              <Route path="/forgetpass" component={Forgetmail} />
              <Route path="/forgetauth/:email/:auth" component={forgetauth} />
              <Route path="/team" component={Chairman} />
              <Route path="/profile/:id" component={Userprofile} />
              <Route path="/showprofile" component={Showprofile} />
              <Route path="/contactus" component={Contactus} />
              <Route path="/userauth/:email/:auth" component={Userauth} />
              <Route path="/aboutus" component={AboutUs} />

              <Route path="/singup" component={Singup} />
              <Route path="/singin" component={SingIn} />
              <Route path="/post" component={Post} />

              <Route path="/show:id" component={Mainsow} />
              <Route path="/detail/:id/:type" component={Detail} />
              <Route path="/show?id?city?type?subtype" component={Mainsow} />
              <Route path="/home" component={Home} />
              <Route exact path="/" component={Home} />
            </Switch>

          </div>
        </HashRouter >
      </Provider>

    )
  }
}

export default App;
