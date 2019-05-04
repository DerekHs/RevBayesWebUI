import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { remSubModel, addSubModel } from '../../actions/species.js';


// Class Substitution Model Component
class JukesCantor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.addParams = this.addParams.bind(this)
        this.removeModel = this.removeModel.bind(this)
    }

    handleChange() {
        document.getElementById("outGroupInput").disabled = !document.getElementById("outGroupInput").disabled
    }

    handleInput() {
        this.state.params = {...this.state.params, ['outGroup']: document.getElementById("outGroupInput").value}
    }

    addParams() {
        this.props.addSubModel('JukesCantor', this.state.params)
        alert("Jukes-Cantor Substitution Model Added")
    }

    removeModel() {
        this.props.remSubModel('JukesCantor')
    }



    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column one-half'>
                        <div className='box'>
                            <div className="control">
                                <input 
                                    className="input" 
                                    id="outGroupInput" 
                                    type="text" 
                                    placeholder="Outgroup" 
                                    disabled
                                    onInput={this.handleInput}
                                />
                                <label className="checkbox">
                                    <input type="checkbox" onClick={this.handleChange}/>
                                    Specify Outgroup
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <button className='button is-primary is-outlined' onClick={this.addParams}>
                            Add/Update Jukes-Cantor Model
                        </button>
                        <button className='button is-primary is-outlined' onClick={this.removeModel}>
                            Remove Jukes-Cantor Model
                        </button>
                    </div>
                
                </div>
                <div className='columns'>

                </div>
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
      addSubModel,
      remSubModel
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(JukesCantor);
  