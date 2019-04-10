#ifndef NclReader_H
#define NclReader_H

#include <set>
#include "ncl.h"
#include "nxsmultiformat.h"
class DataMatrix;
class NxsCharactersBlock;



class NclReader {

    public:
                                    NclReader(void);
        void                        addWarning(std::string s) { warningsSummary.insert(s); }
        bool                        isFastaFile(std::string& fn, std::string& dType);
        bool                        isNexusFile(const std::string& fn);
        bool                        isPhylipFile(std::string& fn, std::string& dType, bool& isInterleaved);
        std::vector<DataMatrix*>    readMatrices(const std::string &fn, const std::string &ft);
        std::vector<DataMatrix*>    readMatrices(const std::string &fn);
        std::vector<DataMatrix*>    readMatrices(const std::map<std::string,std::string>& fileMap);
        std::vector<DataMatrix*>    readMatrices(const std::vector<std::string> fn, const std::string fileFormat, const std::string dataType, const bool isInterleaved);

    protected:
        std::vector<DataMatrix*>    convertFromNcl(const std::string& fileName);
        DataMatrix*                 createDataMatrix(std::string dt, NxsCharactersBlock* charblock);
        DataMatrix*                 createDataMatrix(std::string dt, NxsUnalignedBlock* charblock);
        std::vector<DataMatrix*>    readMatrices(const std::string &fn, const std::string &format, const std::string &type, bool isInterleaved);
        bool                        fileExists(const std::string &fn) const;
        std::string                 intuitDataType(std::string& s);
        MultiFormatReader           nexusReader;
        std::set<std::string>       warningsSummary;
};

#endif
