export function jukesCantor(state) {

    var text = {}
    
    var jcState = state.subModels['JukesCantor']

    text['disclaimer'] = '\n\n\n# For more information on Jukes-Cantor, visit the tutorial:'
        + '\n# https://revbayes.github.io/tutorials/ctmc/'
        + '\n# References: Jukes T.H., Cantor C.R. 1969. Evolution of Protein Molecules. Mammalian Protein Metabolism. 3:21–132. 10.1016/B978-1-4832-3211-9.50009-7'


    // Rate Matrix Q
    text['rateMatrixComments'] = '\n\n\n\n# Creates the instantaneous Rate Matrix with equal substitution rates'
    text['rateMatrix'] = '\nQ <- fnJC(4)'
    
    var fullText = ""

    Object.keys(text).map(key => fullText += text[key])
    return fullText
}