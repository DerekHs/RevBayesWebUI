export function codeGenerate(state) {
    

    /* Each var is relevant information to display in text file */
    var constraints = Object.keys(state.treeConstraints).map(
        constraint =>
            "\n" + constraint + ": " + state.treeConstraints[constraint]
        )

    var speciesArray = state.species

    var numberOfSpecies = state.species.length


    const text = "Number of Species: " + numberOfSpecies 
        + " \n Array of Species: " + speciesArray
        + constraints

    return text
}