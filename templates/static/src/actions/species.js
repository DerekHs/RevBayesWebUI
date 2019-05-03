import { ADD_ANIMAL, ADD_CONSTRAINT, REMOVE_CONSTRAINT, ADD_SUB_MODEL, ADD_FILE_NAME } from './actions';

export function addAnimal (animal) {
    return {
        type: ADD_ANIMAL,
        animal: animal
    }
}

export function addConstraint (name, constraint) {
    return {
        type: ADD_CONSTRAINT,
        constraint: constraint,
        name: name
    }
}

export function removeConstraint (name) {
    return {
        type: REMOVE_CONSTRAINT,
        name: name
    }
}

export function addSubModel (name, params) {
    return {
        type: ADD_SUB_MODEL,
        name: name,
        params: params
    }
}

export function addFileName (name) {
    return {
        type: ADD_FILE_NAME,
        name: name
    }
}
