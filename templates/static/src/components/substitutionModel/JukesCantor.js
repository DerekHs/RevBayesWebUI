import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from '../../actions/species.js';


// Class Substitution Model Component
class JukesCantor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: {}
        }
    }


    render() {
        return (
            <div className='container'>
                
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
      removeConstraint
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(JukesCantor);
  