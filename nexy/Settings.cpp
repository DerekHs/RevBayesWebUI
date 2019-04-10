#include <iostream>
#include <cmath>
#include <string>
#include <vector>
#include "Settings.h"



Settings::Settings(int argc, char* argv[]) {

    std::vector<std::string> commandString;
#   if 0
    commandString.push_back( "-i" );
    commandString.push_back( "/Users/johnh/Repositories/nonrev/data/bglobin/" );
    commandString.push_back( "-o" );
    commandString.push_back( "/Users/johnh/Repositories/nonrev/output/bglobin.out" );
#   else
    for (int i=1; i<argc; i++)
        {
        std::string cmd = argv[i];
        commandString.push_back(cmd);
        }
#   endif

    // set default values for parameters
    inputFileName  = "";
    outPutFileName = "";
    
    if (commandString.size() > 1)
        {
        if (commandString.size() % 2 != 0)
            {
            printUsage();
            }
            
        // read the command-line arguments
        std::string status = "";
        for (int i=0; i<commandString.size(); i++)
            {
            std::string cmd = commandString[i];
            //std::cout << cmd << std::endl;
            if (status == "")
                {
                // read the parameter specifier
                if ( cmd == "-i" )
                    status = "-i";
                else if ( cmd == "-o" )
                    status = "-o";
                else
                    {
                    std::cout << "Could not interpret option \"" << cmd << "\"." << std::endl;
                    exit(1);
                    }
                }
            else
                {
                // read the parameter
                if ( status == "-i" )
                    inputFileName = commandString[i];
                else if ( status == "-o" )
                    outPutFileName = commandString[i];
                else
                    {
                    std::cout << "Unknown status reading command line information" << std::endl;
                    exit(1);
                    }
                status = "";
                }
            }
        }
    else
        {
        printUsage();
        }
}

void Settings::print(void) {

    std::cout << "   * Input file = \"" << inputFileName << "\"" << std::endl;
    std::cout << "   * Input file = \"" << outPutFileName << "\"" << std::endl;
}

void Settings::printUsage(void) {

    std::cout << "Usage:" << std::endl;
    std::cout << "     -i : Input file name" << std::endl;
    std::cout << "     -o : Output file name" << std::endl;
    std::cout << std::endl;
    std::cout << "Example:" << std::endl;
    std::cout << "   ./nexy -i <input file> -o <output file>" << std::endl;
    exit(0);
}

