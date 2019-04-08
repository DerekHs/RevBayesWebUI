import React from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import skulpt from 'skulpt'

class Parser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedFile: null}
    this.handleselectedFile = this.handleselectedFile.bind(this)
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0].name
    })
  }

  parseFile = () => {
  }
 
  render() {
    console.log(this.state.selectedFile)
    return (
      <div>
        <input 
          type="file"
          multiple
          onChange={this.handleselectedFile}
        />
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     ...
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     ...
//   },
//     dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Parser);
export default Parser
