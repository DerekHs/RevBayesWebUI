import { ADD_ANIMAL, ADD_CONSTRAINT, REMOVE_CONSTRAINT } from '../actions/actions.js';

const initialState = {
  species: [],
  treeConstraints : {
  },
  dataPartition: ""
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
    
    default: 
      return state;
  }
  
  
}
export default appState;

