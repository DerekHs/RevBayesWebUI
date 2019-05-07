import React from 'react';
import { codeGenerate } from './codeGenerate.js'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from '../../actions/species.js';


class GenerateButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange() {

        var dataContainer = document.getElementsByClassName('resultsContainer')[0];

        // Changing the content of the upload file
        dataContainer.textContent = codeGenerate(this.props.currentState);

        document.getElementById('results').style.display = 'block';

        var blob = new Blob([dataContainer.textContent], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        var a = document.getElementById("json-download");
        var fileName = a.getAttribute("data-file");
        
        a.download    = fileName;
        a.href        = url;
        a.textContent = "Download";
    }


    render() {
        return (
            <div
                style={{width: '100%'}}
                align='center'>
                <div className="level">
                    <p style={{width: '100%'}}>


                    {/* Generate Button */}
                    <button 
                        className='button is-primary is-rounded'
                        style={{ WebKitTransition: '150ms all linear', transition: '150ms all linear'}}
                        onClick={() => this.handleChange(true)}
                        type='submit'>
                        Generate
                    </button>
                    </p>
                </div>

                <div 
                    id="results"
                    style={{display: 'none'}}
                >
                    <a 
                        className='button is-primary' 
                        style={{display: 'inline', margin: '8px 16px', padding:'8px 20px', backgroundColor: '#686a69', border: '0',
                        color: '#f9fdfe', fontFamily: 'lato, sans-serif', fontSize: '100%', 
                        letterSpacing: '0.05em', lineHeight: '1.5', textTransform: 'uppercase',
                        WebKitTransition: '150ms all linear', transition: '150ms all linear'}}  
                        id="json-download" 
                        data-file='revscript.Rev'></a>
                    <pre 
                        style={{marginTop: '1.5rem'}}
                        className="level">
                       <code 
                            style={{textAlign: 'left'}}
                            className='resultsContainer'>
                       </code>
                    </pre>
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
      addAnimal,
      addConstraint,
      removeConstraint
    },
      dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GenerateButton);
  