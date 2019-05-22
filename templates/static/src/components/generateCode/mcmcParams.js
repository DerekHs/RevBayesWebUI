export function mcmcParams(state) {

    var text = {}

    var mcmcState = state.mcmcParams

    // Check if there's an outgroup specified
    
    var outGroupVar
    ('outGroup' in mcmcState) ? outGroupVar = mcmcState['outGroup'] : outGroupVar = ""
    text['outGroup'] = '\n\nout_group = clade("' + outGroupVar + '")'

    // Variable that formats all functions depending on if outgroup specified or not
    var outGroupFormat
    ('outGroup' in mcmcState) ? outGroupFormat = ", outgroup=out_group" : outGroupFormat = ""
    
    text['topologyComments'] ='\n\n# We will assume that all possible labeled, unrooted tree topologies have equal probability. '
        + '\n# This is the dnUniformTopology() distribution in RevBayes.'
    text['topology'] = '\ntopology ~ dnUniformTopology(taxa' + outGroupFormat + ')'

    // Append moves
    text['movesComments'] = '\n\n# Nearest-Neighbor Interchange move (mvNNI) and a Subtree-Prune and Regrafting move (mvSPR)'
    text['mvNNI'] = '\nmoves.append(mvNNI(topology, weight=num_taxa))'
    text['mvSPR'] = '\nmoves.append(mvSPR(topology, weight=num_taxa / 10))'

    // Create each of the branch-length nodes and assign each move
    text['moveBLComments'] = '\n\n# Creates Stochastic Node representing the length of each of the 2N−3 branches in our tree (where N= n_species)'
    text['moveBL'] = '\nfor (i in 1:num_branches) {'
        + '\n    br_lens[i] ~ dnExponential(10.0)'
        + '\n    moves.append(mvScale(br_lens[i]))'
     + '\n}'

    // Define tree length
    text['tlComments'] = '\n\n# Define Tree Length as a deterministic variable'
    text['tl'] = '\nTL := sum(br_lens)'

    // Create phylogeny
    text['phyloComments'] = '\n\n# Create phylogram by combining tree topology and branch lengths'
        + '\n# treeAssembly() function applies the value of the ith member of the br_lens vector to the branch leading to the ith node in topology'
    text['phylo'] = '\npsi := treeAssembly(topology, br_lens)'

    text['phyloCTMCComments'] = '\n\n\n\n# Create the phylogenetic continuous-time Markov chain'
        + '\n# tree: topology with branch lengths; Q: instantaneous-rate matrix; type: type of data'
    text['phyloCTMC'] = '\nseq ~ dnPhyloCTMC(tree=psi, Q=Q, type="DNA")'

    // Add data
    text['clampComments'] = '\n\n# Attach data to tip nodes of tree'
    text['clamp'] = '\nseq.clamp(data)'


    // Model
    text['modelComments'] = '\n# Wrap the model in a single object'
        + '\n# (Only a single node is needed as a parameter; the model() function can follow the rest of the nodes'
    text['model'] = '\nmymodel = model(Q)'


    // Specify monitors and output files
    var nameOfFile = state.files[0].split('.').slice(0, -1).join('.')
    text['mnModelComments'] = '\n\n\n# We initialize the model monitor using mnModel() which creates a new monitor that will output the states for all model parameters when passed into an MCMC function. '
    text['mnModel'] = '\nmonitors.append(mnModel(filename="output/'+ nameOfFile + '.log", printgen=10))'
    text['mnFileComments'] = '\n# mnFile() records the states of the specified variables'
    text['mnFile'] = '\nmonitors.append(mnFile(filename="output/'+ nameOfFile + '.trees", printgen=10, psi))'
    text['mnScreenComments'] = '\n# mnScreen() reports the state of the specified variables to the screen'
    text['mnScreen'] = '\nmonitors.append(mnScreen(printgen=1000, TL))'

    // Check if nruns and ngenerations are in the state params
    var nruns
    ('nruns' in mcmcState) ? nruns = mcmcState['nruns'] : nruns = 2
    var ngens
    ('ngens' in mcmcState) ? ngens = mcmcState['ngens'] : ngens = 20000


    // Initializing and running MCMC simulation

    text['mymcmcComments'] = '\n\n\n# mcmc() function creates MCMC object with the specified model, monitors, and moves'
        + '\n# nruns=2 specifies two independent mcmc runs'
    text['mymcmc'] = '\nmymcmc = mcmc(mymodel, monitors, moves, nruns=' + nruns + ', combine="mixed")'

    text['run'] = '\nmymcmc.run(generations=' + ngens + ')'

    var fullText = ""

    Object.keys(text).map(key => fullText += text[key])
    return fullText
}