import React from 'react';
import TreeSpecies from './TreeSpecies.js';

// Creates a Container for Each Column of Tree Constraints
export default class Column extends React.Component {

  handleSelectClick = (selected, source, columns) => {
    var destinationId = (source.id === 'column-1') ? 'column-2': 'column-1'
    var destination = columns[destinationId]
    var selectedArray = Array.from(selected).map(val => val.value)
    
  this.props.handleClick(
    selectedArray, 
    source, 
    destination, 
    columns)
  }
  render() {

    return (
      <div className="column is-one-third">
        <div className="box" style={{height: '100%'}}>
          <h2 className="title">
            {this.props.column.title}
          </h2>
          <div className="select is-multiple is-small is-primary is-focused">
            <select id={this.props.column.id} multiple number="10" size="10">
              {this.props.species.map(animal => (
                <TreeSpecies 
                  key={animal.id} 
                  animal={animal} 
                  data = {this.props.data}
                  handleClick={this.props.handleClick}
                />
              ))}
            </select>
            
            <button
              className='button is-primary is-centered'
              onClick={() => this.handleSelectClick(
                document.getElementById(this.props.column.id).selectedOptions,
                  this.props.data['columns'][this.props.column.id],
                  this.props.data['columns'])}              
            >
            Move Across</button>
          </div>
            
        </div>
        
      </div>
    );
  }
}

