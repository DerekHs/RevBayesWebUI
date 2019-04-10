import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


import { addAnimal, addConstraint, removeConstraint } from './actions/species.js';

// Tree Constraint Imports
import Column from './components/treeConstraints/Column.js';
import ListOfConstraints from './components/treeConstraints/ListOfConstraints.js';
import { resetData, handleConstraintClick } from './components/treeConstraints/helperFunction.js';

// Generate Code Imports
import GenerateButton from './components/generateCode/GenerateButton.js';

// Parser Imports
import Parser from "./components/importFiles/Parser";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {  
        active_tab: 1 ,
        data: resetData(this.props.appState.species)
    }

    this.setActiveTab = this.setActiveTab.bind(this)

    this.handleConstraintClick = this.handleConstraintClick.bind(this)
  } 

  setActiveTab(new_active) {
    this.setState({...this.state, active_tab: new_active })
  }



  handleConstraintClick(itemIds, source, destination, columns) {
    this.setState({...this.state, data: {...this.state.data, 
        'columns': handleConstraintClick(itemIds, source, destination, columns)}})
  }


  render() {
    return (
      <div className="container"
        style={{marginTop: '2rem'}}>
        <h1 className="title">RevScripter</h1>
        <div className="tabs">
          <ul>
            <li className={this.state.active_tab === 1 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(1)}>File</a>
            </li>
            <li className={this.state.active_tab === 2 ? "is-active" : undefined}>
              <a onClick={() => this.state.active_tab !== 2 ? this.setActiveTab(2): resetData(this.props.appState.species)}>Tree Constraints</a>
            </li>
            <li className={this.state.active_tab === 3 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(3)}>Code</a>
            </li>
          </ul>
        </div>
       
        {this.state.active_tab === 1 && <Parser/>}



        {/*  ------------------  */}
        { /* Tree Constraint Tab */}
        {/*  ------------------  */}
        
        {this.state.active_tab === 2 && 
          <div className="level">
              <div className="columns is-multiline is-mobile"
                style={{minWidth: '100%'}}>
                
                {/* Left Partition Column */}
                <Column 
                  key={Column.id} 
                  column={this.state.data.columns['column-1']} 
                  species={this.state.data.columns['column-1'].speciesId.map(
                    speciesId => this.state.data.speciesList[speciesId])
                  } 
                  data={this.state.data}
                  handleClick={this.handleConstraintClick}
                />
                

                {/* Arrows in between the partition columns */}
                

                {/* Right Partition Column */}
                <Column
                  key={Column.id}
                  column={this.state.data.columns['column-2']}
                  species={this.state.data.columns['column-2'].speciesId.map(
                    speciesId => this.state.data.speciesList[speciesId])
                  }
                  data={this.state.data}
                  handleClick={this.handleConstraintClick}
                />

                 
                
                {/* Right Side Of Tab to Generate the Constraint and Reset */}
                <div className="column is-one-third">
                  <div className="box">
                    <div className="field">

                    {/* Move the two columns into Redux Constraints */}
                    <h2 className="title">Constraint Name</h2>
                    <div className="control">

                    {/* Name the Tree Constraint */}
                      <input 
                        id="nameTreeConstraint"
                        style={{marginBottom: '10px'}} 
                        className="input" 
                        type="text" 
                        placeholder="Input Constraint Name">
                      </input>
                    </div>

                    {/* Button to Create Constraint */}
                    <button 
                      className="button is-primary is-inverted is-outlined"
                      style={{backgroundColor: '#3273dc', fontSize: '1.2rem'}}
                      onClick={() => {
                        const inputId = document.getElementById("nameTreeConstraint").value;
                        document.getElementById("nameTreeConstraint").value='';
                        
                        this.props.addConstraint(inputId, {inputId: {
                          'leftPartition': this.state.data.columns['column-1'], 
                          'rightPartition': this.state.data.columns['column-2'],
                          }
                        
                      })}}
                    >
                      Create Constraint
                    </button>
                  </div>

                  {/* Reset Button calls f: resetData */}
                  <button 
                    className="button is-primary is-inverted is-outlined"
                    style={{backgroundColor: '#f5f5f5', 
                      color: '#363636', 
                      fontSize: '1.2rem'
                    }}
                    onClick={() => this.setState({...this.state, 
                        data: resetData(this.props.appState.species)})}
                    
                  >
                    Reset the Columns
                  </button>
                  </div>
                  
                  
                  {/* List of all created constraints */}
                  <ListOfConstraints
                    treeConstraints={this.props.appState.treeConstraints}
                    handleClick={this.props.removeConstraint}
                    handlePlaceClick={(name) => 
                      {this.setState({...this.state, 
                        data: {...this.state.data, 
                          columns: {
                            'column-1': {...this.state.data.columns['column-1'],
                              speciesId: this.props.appState.treeConstraints[name].inputId['leftPartition'].speciesId
                            },
                            'column-2': {...this.state.data.columns['column-2'],
                              speciesId: this.props.appState.treeConstraints[name].inputId['rightPartition'].speciesId
                            }
                          }
                        }})
                        debugger;
                      }
                      }
                  />
                </div>


                
              </div>
              
                    

          </div>
        }

        {/* END OF TREE CONSTRAINTS TAB */}

        {/*                   */}
        {/* CODE GENERATE TAB */}
        {/*                   */}
        {this.state.active_tab === 3 && 
          <div className="intro-columns">
            <div className="intro-column is-content">
              <div className='intro-content'>
                <h1
                  className='title intro-title'>
                  Download or
                  Copy the
                  RevBayes file and run it!
                </h1>



                {/* Generate Button Component */}
                <GenerateButton 
                  currentState={this.props.appState}
                />
              </div>  
            </div>
            <div className="intro-column is-content">
            </div>
          </div>
        }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
