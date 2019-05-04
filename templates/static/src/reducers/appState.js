import { ADD_ANIMAL, ADD_CONSTRAINT, REMOVE_CONSTRAINT, ADD_SUB_MODEL, REM_SUB_MODEL, ADD_FILE_NAME } from '../actions/actions.js';

const initialState = {
  species: [],
  treeConstraints : {},
  dataPartition: "",
  subModels: {},
  files: []
}

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANIMAL: 
      return {...state, species: state.species.concat(action.animal)}    
    case ADD_CONSTRAINT:
      return {...state, treeConstraints: {...state.treeConstraints, [action.name]: action.constraint}}
    case REMOVE_CONSTRAINT:
      const { [action.name]: value, ...withoutFirst } = state.treeConstraints;
      return {...state, treeConstraints: withoutFirst}
    case ADD_SUB_MODEL:
      return {...state, subModels: {...state.subModels, [action.name]: action.params}}
    case REM_SUB_MODEL:
      if (action.name in state.subModels) {
        const { [action.name]: value, ...withoutFirst } = state.subModels;
        return {...state, subModels: withoutFirst}
      } else {
        return state
      }
    case ADD_FILE_NAME:
      return {...state, files: state.files.concat(action.name)}
    default: 
      return state;
  }
  
  
}
export default appState;

