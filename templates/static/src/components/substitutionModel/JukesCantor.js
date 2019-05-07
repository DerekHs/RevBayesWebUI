import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { remSubModel, addSubModel } from '../../actions/species.js';


// Class Substitution Model Component
class JukesCantor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: {},
            showingAlert: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.addParams = this.addParams.bind(this)
        this.removeModel = this.removeModel.bind(this)
        this.specifyNRuns = this.specifyNRuns.bind(this)
        this.specifyGens = this.specifyGens.bind(this)
        this.handleClickShowAlert = this.handleClickShowAlert.bind(this)
    }

    // Change the Disabled status of the Input Field 
    handleChange() {
        document.getElementById("outGroupInput").disabled = !document.getElementById("outGroupInput").disabled
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

    // Add Inputted OutGroup to the parameters
    handleInput() {
        this.state.params = {...this.state.params, ['outGroup']: document.getElementById("outGroupInput").value}
    }

    // Add the model with the given parameters to the appState
    addParams() {
        this.props.addSubModel('JukesCantor', this.state.params)
        this.handleClickShowAlert()
    }

    // Remove the JukesCantor Model
    removeModel() {
        this.props.remSubModel('JukesCantor')
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
                    <div className='column one-third'>
                        <div className='box'>
                            <h1><strong>More Information</strong> about <a href="https://www.sciencedirect.com/science/article/pii/B9781483232119500097?via%3Dihub" target="_blank">Jukes-Cantor</a> Substitution Model:</h1>
                            <a href="https://revbayes.github.io/tutorials/ctmc/" target="_blank">https://revbayes.github.io/tutorials/ctmc/</a>
                        </div>
                    </div>
                
                </div>
                <div className='columns'>
                    <div className='column one-half'>
                        <div className='control'>
                            <p className="subtitle is-6">
                                <strong>Number of Independent Runs</strong> (Default of 2)
                            </p>
                            <input 
                                className="input" 
                                id="nRunsInput" 
                                type="text" 
                                placeholder="# of Runs"
                                onInput={this.specifyNRuns}
                            />
                        </div>
                        <div className='control'>
                            <p className="subtitle is-6">
                                <strong>Number of Generations</strong> (Default of 20000)
                            </p>
                            <input 
                                className="input" 
                                id="nGensInput" 
                                type="text" 
                                placeholder="# of Generations"
                                onInput={this.specifyGens}
                            />
                        </div>
                        <div className='section'>
                            <div className='section'>
                                <button className='button is-primary' onClick={this.addParams}>
                                    Add/Update Model
                                </button>
                            </div>
                            <button className='button is-primary' onClick={this.removeModel}>
                                Remove Model
                            </button>
                            <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
                                <strong>Jukes-Cantor Model</strong> successfully added!
                            </div>
                        </div>
                    </div>

                    <div className='column'>
                        
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
      addSubModel,
      remSubModel
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(JukesCantor);
  