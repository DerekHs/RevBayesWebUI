#include <fstream>
#include <iostream>
#include <string>
#include "DataMatrix.h"
#include "FileManager.h"
#include "Msg.h"
#include "NclReader.h"
#include "Settings.h"

#define VERBOSE

void outputData(std::string fn, std::vector<DataMatrix*>& df);
std::vector<DataMatrix*> readData(std::string fn);



int main(int argc, char* argv[]) {

    // read the input and output file names
    Settings settings(argc, argv);

#   if defined(VERBOSE)
    std::cout << "   * Nexy: A simple NEXUS file parser" << std::endl;
    std::cout << "   * John P. Huelsenbeck (University of California, Berkeley" << std::endl;
    settings.print();
#   endif
    
    // read the data file(s)
    std::vector<DataMatrix*> df = readData(settings.getInputFileName());
#   if defined(VERBOSE)
    std::cout << "   * Read " << df.size() << " files" << std::endl;
#   endif

    // output the information to a file
    outputData(settings.getOutPutFileName(), df);

    return 0;
}

void outputData(std::string fn, std::vector<DataMatrix*>& df) {

    std::ofstream fOut;
    fOut.open( fn.c_str(), std::ios::out );

    for (DataMatrix* m : df)
        {
        m->print(fOut);
        }

    fOut.close();
}

std::vector<DataMatrix*> readData(std::string fn) {

    std::vector<DataMatrix*> dataFiles;
    
    FileManager myFileManager(fn);
    if ( !myFileManager.testFile() && !myFileManager.testDirectory() )
        Msg::error("Could not find file or path with name \"" + fn + "\"");
    
    // set up a vector of strings containing the name or names of the files to be read
    std::vector<std::string> vectorOfFileNames;
    if ( myFileManager.isDirectory() )
        myFileManager.setStringWithNamesOfFilesInDirectory(vectorOfFileNames);
    else
        vectorOfFileNames.push_back( myFileManager.getFullFileName() );

    // get an instance of the NCL reader and clear warnings from its warnings buffer
    NclReader reader;
    
    // Set up a map with the file name to be read as the key and the file type as the value. Note that we may not
    // read all of the files in the string called "vectorOfFileNames" because some of them may not be in a format
    // that can be read.
    size_t numFilesRead = 0;
    for (std::vector<std::string>::iterator p = vectorOfFileNames.begin(); p != vectorOfFileNames.end(); p++)
        {
        bool isInterleaved = false;
        std::string myFileType = "unknown";
        std::string dType = "unknown";
        if (reader.isNexusFile(*p) == true)
            {
            myFileType = "nexus";
            }
        else if (reader.isPhylipFile(*p, dType, isInterleaved) == true)
            {
            myFileType = "phylip";
            }
        else if (reader.isFastaFile(*p, dType) == true)
            {
            myFileType = "fasta";
            }
        
        int numMatricesReadForThisFile = 0;
        if (myFileType != "unknown")
            {
            std::string suffix = "|" + dType;
            if ( myFileType == "phylip" )
                {
                if (isInterleaved == true)
                    {
                    suffix += "|interleaved";
                    }
                else
                    {
                    suffix += "|noninterleaved";
                    }
                }
            else if ( myFileType == "fasta" )
                {
                suffix += "|noninterleaved";
                }
            else
                {
                suffix += "|unknown";
                }
            myFileType += suffix;
            
            // read the content of the file now
            std::vector<DataMatrix*> tempDataFiles = reader.readMatrices( *p, myFileType );
            for (DataMatrix* m : tempDataFiles)
                dataFiles.push_back(m);
            }
        else
            {
            reader.addWarning("Unknown file type");
            }
        
        if (numMatricesReadForThisFile > 0)
            numFilesRead++;
        }
    return dataFiles;
}
