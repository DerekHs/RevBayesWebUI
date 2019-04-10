#ifndef DataMatrix_H
#define DataMatrix_H

#include <fstream>
#include <string>
#include <vector>



class DataMatrix {

    public:
                                    DataMatrix(void) = delete;
                                    DataMatrix(std::string dt, bool he);
        void                        addTaxon(std::string s) { taxonNames.push_back(s); }
        std::string                 getDataType(void) { return dataType; }
        bool                        getIsHomologyEstablished(void) { return isHomologyEstablished; }
        int                         getNumOrigChar(void) { return numOrigChar; }
        int                         getNumOrigTaxa(void) { return numOrigTaxa; }
        std::vector<std::string>&   getTaxonNames(void) { return taxonNames; }
        void                        print(std::ofstream& fOut);
        void                        setDataType(std::string s) { dataType = s; }
        void                        setFileName(std::string s) { fileName = s; }
        void                        setFilePath(std::string s) { filePath = s; }
        void                        setIsHomologyEstablished(bool tf) { isHomologyEstablished = tf; }
        void                        setNumOrigChar(int x) { numOrigChar = x; }
        void                        setNumOrigTaxa(int x) { numOrigTaxa = x; }

    protected:
        std::string                 dataType;
        std::string                 fileName;
        std::string                 filePath;
        std::vector<std::string>    taxonNames;
        int                         numOrigTaxa;
        int                         numOrigChar;
        bool                        isHomologyEstablished;
};

#endif
