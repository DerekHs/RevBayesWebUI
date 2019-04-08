import { ADD_ANIMAL, ADD_CONSTRAINT, REMOVE_CONSTRAINT } from './actions';

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
