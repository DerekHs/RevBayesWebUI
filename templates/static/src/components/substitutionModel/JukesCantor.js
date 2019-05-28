import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

// Redux actions
import { remSubModel, addSubModel } from '../../actions/species.js';

// Import MathJax for math formatting
import MathJax from 'react-mathjax2';


const jcRateMatrixTex = `Q_{JC69} = \\left( \\begin{array}{cccc}
    * & 1/3 & 1/3 & 1/3 \\\\
    1/3 & * & 1/3 & 1/3 \\\\
    1/3 & 1/3 & * & 1/3 \\\\
    1/3 & 1/3 & 1/3 & * \\end{array} \\right)`

// Class Substitution Model Component
class JukesCantor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showingAlert: false
        }
        this.addParams = this.addParams.bind(this)
        this.removeModel = this.removeModel.bind(this)
        this.handleClickShowAlert = this.handleClickShowAlert.bind(this)
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

    // Add the model with the given parameters to the appState
    addParams() {
        this.props.addSubModel('JukesCantor')
        this.handleClickShowAlert()
    }

    // Remove the JukesCantor Model
    removeModel() {
        this.props.remSubModel('JukesCantor')
    }



    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column one-third'>
                        <MathJax.Context input='tex'>
                            <div>
                                <MathJax.Node inline>{jcRateMatrixTex}</MathJax.Node>
                            </div>
                        </MathJax.Context>
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
  