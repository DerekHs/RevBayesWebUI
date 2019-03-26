import React from 'react';

export default class TreeSpecies extends React.Component {
  render() {
    var sourceId;
    var destinationId;
    if (this.props.data['columns']['column-1']['speciesId'].includes(this.props.animal.name)) {
      sourceId = 'column-1';
      destinationId = 'column-2';
    } else {
      sourceId = 'column-2';
      destinationId = 'column-1';
    }
    
    return (
      // Container for the draggable animal components
          
          <option
            key={this.props.animal.id} 
            value={this.props.animal.id}
            onDoubleClick={() => this.props.handleClick(
              new Array(this.props.animal.name),
              this.props.data['columns'][sourceId],
              this.props.data['columns'][destinationId],
              this.props.data['columns']
            )}
            style={{color: '#000', backgroundColor: '#fff', border: '1px #fff solid'}}
          >
            {this.props.animal.name}
          </option> 
       
    );
  }
}