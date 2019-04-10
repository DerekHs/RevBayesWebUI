#include <iostream>
#include "DataMatrix.h"


DataMatrix::DataMatrix(std::string dt, bool he) {

    dataType = dt;
    isHomologyEstablished = he;
}

void DataMatrix::print(std::ofstream& fOut) {

    fOut << "NEW_FILE" << std::endl;
    fOut << "FILE_PATH " << filePath << std::endl;
    fOut << "FILE_NAME " << fileName << std::endl;
    fOut << "NUMBER_OF_TAXA " << numOrigTaxa << std::endl;
    fOut << "NUMBER_OF_CHAR " << numOrigChar << std::endl;
    fOut << "TAXA ";
    for (int i=0; i<taxonNames.size(); i++)
        fOut << taxonNames[i] << " ";
    fOut << std::endl;
}
