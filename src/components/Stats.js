import React, {Component, Fragment} from 'react';
import Stats from 'stats-js'


class StatsComponent extends Component {
  constructor(props){
    super(props) 
    this.state = {
      stats: null
    }
  }

  componentDidMount(){
    const stats = new Stats();
    this.setState({stats})
    document.getElementById('stats').appendChild(stats.dom);
  }

  update(){
    this.state.stats.update()
  }

  render(){
    return <div className="stats" id="stats"></div>
  }
}

export default StatsComponent