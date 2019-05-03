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
import Parser from "./components/importFiles/Parser.js";

// Title Import
import Title from "./components/title/Title.js";

// Substitution Model
import SubChoices from "./components/substitutionModel/SubChoices.js";


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


  // Sets the active tab
  setActiveTab(new_active) {
    this.setState({...this.state, active_tab: new_active })
  }


  // Handles a constraint click to set the current state
  handleConstraintClick(itemIds, source, destination, columns) {
    this.setState({...this.state, data: {...this.state.data, 
        'columns': handleConstraintClick(itemIds, source, destination, columns)}})
  }


  render() {
    return (
      <div className="container">
      
        {/* Renders the Title and Subtitle Component */}
        <Title />


        {/* NavBars Of Tabs */}
        <div className="tabs">
          <ul>
            <li className={this.state.active_tab === 1 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(1)}>File</a>
            </li>
            <li className={this.state.active_tab === 2 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(2)}>Substitution Model</a>
            </li>
            <li className={this.state.active_tab === 3 ? "is-active" : undefined}>
              <a onClick={() => this.state.active_tab !== 3 ? this.setActiveTab(3): resetData(this.props.appState.species)}>Tree Constraints</a>
            </li>
            <li className={this.state.active_tab === 4 ? "is-active" : undefined}>
              <a onClick={() => this.setActiveTab(4)}>Code</a>
            </li>
          </ul>
        </div>
       

        {/* Import Files Tab */}
        {this.state.active_tab === 1 && <Parser/>}



        {/* Substitution Model Tab */}
        {this.state.active_tab === 2 && <SubChoices/>}


        {/*  ------------------  */}
        { /* Tree Constraint Tab */}
        {/*  ------------------  */}
        
        {this.state.active_tab === 3 && 
          <div className="level">
              <div className="columns is-multiline is-mobile">
                
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
                        className="input" 
                        type="text" 
                        placeholder="Input Constraint Name">
                      </input>
                    </div>

                  </div>


                  {/* Button to Create Constraint */}
                  <button 
                    className="button is-primary is-outlined"
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

                  {/* Reset Button calls f: resetData */}
                  <button 
                    className="button is-primary is-outlined"
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
        {this.state.active_tab === 4 && 
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
