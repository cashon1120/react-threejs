import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';
import Header from './components/Header'

const MyLoadingComponent = () => {
  return <div className="loading">Loading...</div>
};

const Home = Loadable({
  loader: () => import ('./routes/Home'),
  loading: MyLoadingComponent
});

// 各种几何体

const Geometry = Loadable({
  loader: () => import ('./routes/Geometry'),
  loading: MyLoadingComponent
});

const Line = Loadable({
  loader: () => import ('./routes/Line'),
  loading: MyLoadingComponent
});

const Ion = Loadable({
  loader: () => import ('./routes/Ion'),
  loading: MyLoadingComponent
});


function App() {
  return (
    <Fragment>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/geometry' exact component={Geometry}/>
        <Route path='/line' exact component={Line}/>
        <Route path='/ion' exact component={Ion}/>
      </Switch>
    </BrowserRouter>
  </Fragment>
  );
}

export default App;
