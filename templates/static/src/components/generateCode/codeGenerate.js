import './substitutionModels/jukesCantor.js';
import { jukesCantor } from './substitutionModels/jukesCantor.js';

export function codeGenerate(state) {
    

    var text = {}

    /* Each var is relevant information to display in text file */

    // Load the file into RB
    text['loadFileComments'] = '# Navigate to the working directory and create a new folder called data' +
        '\n# Place the datafile(s) inside the data folder' +
        '\n# (Alternatively change the path from data/filename to the intended path)'
    
    text['loadFile'] = '\ndata <- readDiscreteCharacterData("data/' + state.files[0] + '")'


    // Specify useful variables
    text['usefulVarComments'] = '\n\n# Set some useful variables: Number of Taxa, Number of Branches, and Taxa'

    text['num_taxa'] = '\nnum_taxa <- data.ntaxa()'
    text['num_branches'] = '\nnum_branches <- 2 * num_taxa - 3'
    text['taxa'] = '\ntaxa <- data.taxa()'

    text['vectorComments'] = '\n\n# Set vectors that holds all moves for analysis'
        + '\n# Recall that moves are algorithms used to propose new parameter values during the MCMC simulation.' 
        + '\n# Similarly, we set up a variable for the monitors. '
        + '\n# Monitors print the values of model parameters to the screen and/or log files during the MCMC analysis.'
    text['moves'] = '\nmoves = VectorMoves()'
    text['monitors'] = '\nmonitors = VectorMonitors()'
    

    // Check through Substitution Models
    Object.keys(state.subModels).map(key =>
        {switch(key) {
            case 'JukesCantor':
                text['jcSub'] = (jukesCantor(state));
            
                break;
            default: 
                return
        }
        }
    )


    var fullText = ""

    Object.keys(text).map(key => fullText += text[key])

    return fullText
}