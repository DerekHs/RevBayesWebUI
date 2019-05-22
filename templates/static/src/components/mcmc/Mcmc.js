import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addMCMCParams } from '../../actions/species.js';


// Class Substitution Model Component
class Mcmc extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: {'nruns': '2', 
            'ngens': '20000'
        },
            showingAlert: false
        }

        this.handleClickShowAlert = this.handleClickShowAlert.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.addParams = this.addParams.bind(this)
        this.specifyNRuns = this.specifyNRuns.bind(this)
        this.specifyGens = this.specifyGens.bind(this)
    }

    // Show the alert for 2000 ms then make it disappear
    handleClickShowAlert() {
        this.setState({
        showingAlert: true
        });
        
        setTimeout(() => {
        this.setState({
            showingAlert: false
        });
        }, 2000);
    }

    // Change the Disabled status of the Input Field 
    handleChange() {
        document.getElementById("outGroupInput").disabled = !document.getElementById("outGroupInput").disabled
    }

    // Add Inputted OutGroup to the parameters
    handleInput() {
        this.state.params = {...this.state.params, ['outGroup']: document.getElementById("outGroupInput").value}
    }

    // Add the model with the given parameters to the appState
    addParams() {
        Object.keys(this.state.params).map(param =>
            this.props.addMCMCParams(param, this.state.params[param])
        )

        this.handleClickShowAlert()
    }

    // Add the Number of Runs to the parameters
    specifyNRuns() {
        this.state.params = {...this.state.params, ['nruns']: document.getElementById("nRunsInput").value}
    }

    // Add the Number of Generations to the parameters
    specifyGens() {
        this.state.params = {...this.state.params, ['ngens']: document.getElementById("nGensInput").value}
    }


    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column one-half'>
                        <div className='box'>
                            <div className="control">
                                <p className="subtitle is-6">
                                    <strong>Specify Outgroup</strong>
                                </p>
                                <input 
                                    className="input" 
                                    id="outGroupInput" 
                                    type="text" 
                                    placeholder="Outgroup" 
                                    disabled
                                    onInput={this.handleInput}
                                />
                                <label className="checkbox" style={{marginTop: '1em'}}>
                                    <input type="checkbox" onClick={this.handleChange}/>
                                    Specify Outgroup
                                </label>
                            </div>
                        </div>
                    </div>
                    
                
                </div>
                <div className='columns'>
                    <div className='column one-half'>
                        <div className='control'>
                            <p className="subtitle is-6">
                                <strong>Number of Independent Runs</strong>
                            </p>
                            <input 
                                className="input" 
                                id="nRunsInput" 
                                type="text" 
                                defaultValue="2"
                                onInput={this.specifyNRuns}
                            />
                        </div>
                        <div className='control' style={{marginTop:'1.5em'}}>
                            <p className="subtitle is-6">
                                <strong>Number of Generations</strong>
                            </p>
                            <input 
                                className="input" 
                                id="nGensInput" 
                                type="text" 
                                defaultValue="20000"
                                onInput={this.specifyGens}
                            />
                        </div>
                        
                    </div>
                </div>
                <div className='columns'>
                    <div className='column one-half'>
                        
                        <div className='section'>
                            <div className='section'>
                                <button className='button is-primary' onClick={this.addParams}>
                                    Add/Update Params
                                </button>
                            </div>
                            <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
                                <strong>MCMC Parameters</strong> successfully added!
                            </div>
                        </div>
                    </div>

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
      addMCMCParams
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Mcmc);
  