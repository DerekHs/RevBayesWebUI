import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from '../../actions/species.js';
import { resetData } from '../../components/treeConstraints/helperFunction.js';

class Parser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
}

    onChange(e) {
        e.preventDefault();

        let file = document.getElementById('fileUp').files[0];
        let fileName = file.name;

        console.log(fileName);

        console.log(file);
        const formData = new FormData();
    

        formData.append("file", file);
        formData.append("filename", fileName);

        fetch("http://127.0.0.1:5000/templates/api/upload", {
            method: "POST",
            mode:'no-cors',
            body: formData
        
          }).then(res => res.json())
          .then(data => {data['TAXA'].map(animal => (
              this.props.addAnimal(animal)
          ))})
          .catch(err => console.log(err))

        resetData(this.props.appState.species)

        
    }



  render() {
    return (

        
        <div className="file is-large" onSubmit={this.onFormSubmit} style={{position: 'relative'}}>
          <label className="file-label">
            <input 
                className="file-input"
                onChange={(e) => this.onChange(e)}
                type="file"
                name="file"
                id="fileUp"
                multiple
            />
            <span className="file-cta">
              <span className="file-label">
                Choose File(s)...
              </span>
            </span>
          </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Parser);

