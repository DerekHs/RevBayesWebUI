import { ADD_ANIMAL } from '../actions/actions.js';

const initialState = {
  species: ["hippopottamus"],
  treePartition1: {},
  treePartition2: {},
  dataPartition: ""
}

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANIMAL: 
      return {...state, species: state.species.concat(action.animal)} 
    default: 
      return state;
  }
  
  
}
export default appState;

