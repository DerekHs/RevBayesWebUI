import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addFileName } from '../../actions/species.js';
import Upload from './upload/Upload';

class Parser extends React.Component {
  constructor(props) {
    super(props)
      this.state = {};
      this.onChange = this.onChange.bind(this)
}

    onChange(files) {

	for (var i = 0; i < files.length; i++) {
	    let file = files[i];
	    let filename = file.name;

	    const formData = new FormData();

	    formData.append("file", file);
	    formData.append("filename", filename);

	    this.props.addFileName(filename);

	    fetch("https://www.ocf.berkeley.edu/~jhuelsenbeck/templates/api/upload", {
		method: "POST",
		mode: 'no-cors',
		body: formData
	    }).then(res => res.json())
		.then(data => {data ? data['TAXA'].map(animal => (
		    this.props.addAnimal(animal)
		)) : console.log("No data returned")})
		.catch(err => console.log(err));
	}

    }



  render() {
      return (
	      <div className="Card">
	      <Upload
	  handleChange={this.onChange}
	      />
	      
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
    addFileName
  },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Parser);

