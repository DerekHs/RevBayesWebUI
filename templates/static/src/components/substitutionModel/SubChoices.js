import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint, addSubModel } from '../../actions/species.js';
import JukesCantor from './JukesCantor.js';


// Class Substitution Model Component
class SubChoices extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            active_model: 1
        }
        this.setActiveModel = this.setActiveModel.bind(this)
    }

    // Sets the active model
    setActiveModel(new_model) {
        this.setState({...this.state, active_model: new_model })
    }

    render() {
        return (
            <div className='container'>

                {/* Top Bar */}
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                Type of <strong>Substitution Model</strong>:
                            </p>
                        </div>

                        <div className="level-item">
                            <div className="select">
                                <select>
                                    <option onClick={() => this.setActiveModel(1)}>Jukes-Cantor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </nav>


                {/* Jukes Cantor Substitution Model Selected */}
                {this.state.active_model === 1 && <JukesCantor />}
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
      appState: state.appState
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      addAnimal,
      addConstraint,
      removeConstraint,
      addSubModel
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubChoices);
  