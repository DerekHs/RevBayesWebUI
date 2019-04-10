#ifndef Settings_H
#define Settings_H

#include <string>



class Settings {

    public:
                        Settings(int argc, char* argv[]);
        std::string     getInputFileName(void) { return inputFileName; }
        std::string     getOutPutFileName(void) { return outPutFileName; }
        void            print(void);
        void            setInputFileName(std::string s) { inputFileName = s; }
        void            setOutPutFileName(std::string s) { outPutFileName = s; }

    private:
        void            printUsage(void);
        std::string     inputFileName;
        std::string     outPutFileName;
};

#endif
