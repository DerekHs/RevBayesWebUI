import { ADD_ANIMAL } from './actions';

export function addAnimal (animal) {
    return {
        type: ADD_ANIMAL,
        animal: animal
    }
}