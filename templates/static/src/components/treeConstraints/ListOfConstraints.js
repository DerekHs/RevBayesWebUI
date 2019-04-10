import React from 'react';
import Constraint from './Constraint.js';




// Creates a Container for Each Column of Tree Constraints
export default class ListOfConstraints extends React.Component {
  render() {
    return (
      <div className="box">
        <h2 className="title">
          {'Tree Constraints'}
        </h2>
          {/* For each key in treeConstraints, add the constraint to the list */}
          <div>
            {Object.keys(this.props.treeConstraints).map(constraint => (
              <Constraint
                constraint={constraint}
                handleClick={this.props.handleClick}
                handlePlaceClick={this.props.handlePlaceClick}
              />
            ))}
          </div>
        
      </div>
    );
  }
}

