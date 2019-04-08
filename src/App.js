import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Parser from "./components/Parser"
import { addAnimal } from './actions/species.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { active_tab: 1 }
    this.setActiveTab = this.setActiveTab.bind(this)
  } 
  

  setActiveTab(new_active) {
    this.setState({ active_tab: new_active })
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Rev Bayes Code Generator</h1>
        <div className="tabs">
          <ul>
            <li className={this.state.active_tab === 1 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(1)}>File</a>
            </li>
            <li className={this.state.active_tab === 2 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(2)}>Tree Constraints</a>
            </li>
            <li className={this.state.active_tab === 3 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(3)}>Code</a></li>
          </ul>
        </div>
        {this.state.active_tab === 1 && <Parser/>}
        {this.state.active_tab === 2 && 
          <div>
            {this.props.appState.species.map(species => <p>{species}</p>)}
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addAnimal
  },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

