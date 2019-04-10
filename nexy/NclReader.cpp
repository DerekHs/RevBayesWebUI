#include "DataMatrix.h"
#include "FileManager.h"
#include "Msg.h"
#include "NclReader.h"
#include "StringUtilities.h"



NclReader::NclReader(void) : nexusReader(-1, NxsReader::IGNORE_WARNINGS) {

    nexusReader.SetWarningOutputLevel(DefaultErrorReportNxsReader::SUPPRESS_WARNINGS_LEVEL);
}

std::vector<DataMatrix*> NclReader::convertFromNcl(const std::string& file_name) {
    
    std::vector<DataMatrix*> cmv;
    
    size_t num_taxaBlocks = nexusReader.GetNumTaxaBlocks();
    for (unsigned tBlck=0; tBlck<num_taxaBlocks; ++tBlck)
        {
        NxsTaxaBlock* taxaBlock = nexusReader.GetTaxaBlock(tBlck);
        std::string taxaBlockTitle          = taxaBlock->GetTitle();
        const unsigned nCharBlocks          = nexusReader.GetNumCharactersBlocks(taxaBlock);
        const unsigned nUnalignedCharBlocks = nexusReader.GetNumUnalignedBlocks(taxaBlock);
        
        // make alignment objects
        for (unsigned cBlck=0; cBlck<nCharBlocks; cBlck++)
            {
            DataMatrix* m = NULL;
            NxsCharactersBlock* charBlock = nexusReader.GetCharactersBlock(taxaBlock, cBlck);
            std::string charBlockTitle = taxaBlock->GetTitle();
            int dt = charBlock->GetDataType();
            if (dt == NxsCharactersBlock::dna || dt == NxsCharactersBlock::nucleotide)
                {
                m = createDataMatrix("DNA", charBlock);
                }
            else if (dt == NxsCharactersBlock::rna)
                {
                m = createDataMatrix("RNA", charBlock);
                }
            else if (dt == NxsCharactersBlock::protein)
                {
                m = createDataMatrix("Protein", charBlock);
                }
            else if (dt == NxsCharactersBlock::standard)
                {
                m = createDataMatrix("Standard", charBlock);
                }
            else if (dt == NxsCharactersBlock::continuous)
                {
                m = createDataMatrix("Continuous", charBlock);
                }
            else if (dt == NxsCharactersBlock::mixed)
                {
                addWarning("Mixed data types are not allowed");
                }
            else
                {
                addWarning("Unknown data type");
                }
            
            if (m != NULL)
                {
                m->setFileName( StringUtilities::getLastPathComponent(file_name) );
                m->setFilePath( StringUtilities::getStringWithDeletedLastPathComponent(file_name) );
                
                unsigned int nAssumptions = nexusReader.GetNumAssumptionsBlocks(charBlock);
                if ( nAssumptions > 0 )
                    {
                    for (unsigned int i = 0; i < nAssumptions; ++i)
                        {
                        NxsAssumptionsBlock *assumption = nexusReader.GetAssumptionsBlock(charBlock,i);
                        size_t nSets = assumption->GetNumCharSets();
                        NxsStringVector names;
                        assumption->GetCharSetNames(names);
                        for (size_t j = 0; j < nSets; ++j)
                            {
                            /*const NxsUnsignedSet *set = assumption->GetCharSet(names[j]);
                            HomologousCharacterData *m_tmp = dynamic_cast<DataMatrix*>(m)->clone();
                            m_tmp->excludeAllCharacters();
                            for (std::set<unsigned>::iterator k = set->begin(); k != set->end(); k++)
                                {
                                m_tmp->includeCharacter( *k );
                                }
                            m_tmp->removeExcludedCharacters();
                            cmv.push_back( m_tmp );*/
                            
                            }
                        
                        }
                    }
                else
                    {
                    cmv.push_back( m );
                    }
                
                }
            }
        
        // create unaligned data objects
        for (unsigned cBlck=0; cBlck<nUnalignedCharBlocks; cBlck++)
            {
            DataMatrix* m = NULL;
            NxsUnalignedBlock* charBlock = nexusReader.GetUnalignedBlock(taxaBlock, cBlck);
            std::string charBlockTitle = taxaBlock->GetTitle();
            int dt = charBlock->GetDataType();
            if (dt == NxsCharactersBlock::dna || dt == NxsCharactersBlock::nucleotide)
                {
                m = createDataMatrix("DNA", charBlock);
                }
            else if (dt == NxsCharactersBlock::rna)
                {
                m = createDataMatrix("RNA", charBlock);
                }
            else if (dt == NxsCharactersBlock::protein)
                {
                m = createDataMatrix("Protein", charBlock);
                }
            else if (dt == NxsCharactersBlock::standard)
                {
                //m = createStandardMatrix(charBlock);
                }
            else if (dt == NxsCharactersBlock::continuous)
                {
                //m = createContinuousMatrix(charBlock);
                }
            else if (dt == NxsCharactersBlock::mixed)
                {
                addWarning("Mixed data types are not allowed");
                }
            else
                {
                addWarning("Unknown data type");
                }
            
            if (m != NULL)
                {
                m->setFileName( StringUtilities::getLastPathComponent(file_name) );
                m->setFilePath( StringUtilities::getStringWithDeletedLastPathComponent(file_name) );
                cmv.push_back( m );
                }
            }
        
        }
    
    return cmv;
}

DataMatrix* NclReader::createDataMatrix(std::string dt, NxsCharactersBlock* charblock) {

    DataMatrix* m = new DataMatrix(dt, true);

    // get the set of characters (and the number of taxa)
    NxsUnsignedSet charset;
    for (unsigned int i=0; i<charblock->GetNumChar(); i++)
        charset.insert(i);
    int numOrigTaxa = charblock->GetNTax();
    int numOrigChar = charblock->GetNumChar();
    m->setNumOrigTaxa(numOrigTaxa);
    m->setNumOrigChar(numOrigChar);

    // set the taxon names
    for (unsigned origTaxIndex=0; origTaxIndex<numOrigTaxa; origTaxIndex++)
        {
        // add the taxon name
        NxsString tLabel = charblock->GetTaxonLabel(origTaxIndex);
        std::string tName  = NxsString::GetEscaped(tLabel).c_str();
        m->addTaxon(tName);
        }
    
    // get the set of excluded characters
    NxsUnsignedSet excluded = charblock->GetExcludedIndexSet();
    

    return m;
}

DataMatrix* NclReader::createDataMatrix(std::string dt, NxsUnalignedBlock* charblock) {

    DataMatrix* m = new DataMatrix(dt, false);

    return m;
}

bool NclReader::fileExists(const std::string &fn) const {
    
    FileManager fm = FileManager(fn);
    
    bool exists = false;
    FILE *fp = fopen(fm.getFullFileName().c_str(), "r");
    if (fp != NULL)
        {
        fclose(fp);
        exists = true;
        }
    return exists;
}

std::string NclReader::intuitDataType(std::string& s) {
    
    // set up some strings containing the valid states for the different data types we are interested
    // in distiguishing
    static std::string dnaStates = "acgtmgrsvwyhkdbn-.?";
    static std::string rnaStates = "acgumgrsvwyhkdbn-.?";
    static std::string aaStates  = "arndcqeghilkmfpstwxyv-.?";
    static std::string stdStates = "0123456789n-.?abcdefghijklmnopqrstuvwxyz()";
    static std::string nucStates = "acgtu";
    
    // and intialize a few variables we'll be needing
    size_t nucCount = 0, nMissing = 0;
    bool notDna = false, notRna = false, notAa = false, notStd = false;
    
    // loop over the string (s) that contains the raw data we look at the state and try to determine if the
    // state rules out certain data types
    StringUtilities::toLower( s );
    s.erase( std::remove_if( s.begin(), s.end(), ::isspace ), s.end() );
    
    for (size_t i=0; i<s.size(); i++)
        {
        char c = s[i];
        
        if (c == 'n' || c == '-' || c == '.' || c == '?')
            nMissing++;
        
        if (notDna == false)
            {
            bool foundState = false;
            for (size_t j=0; j<19; j++)
                {
                if ( c == dnaStates[j] )
                    {
                    foundState = true;
                    break;
                    }
                }
            if (foundState == false)
                {
                notDna = true;
                }
            
            }
        
        if (notRna == false)
            {
            bool foundState = false;
            for (size_t j=0; j<19; j++)
                {
                if ( c == rnaStates[j] )
                    {
                    foundState = true;
                    break;
                    }
                }
            if (foundState == false)
                {
                notRna = true;
                }
            
            }
        
        if (notAa == false)
            {
            bool foundState = false;
            for (size_t j=0; j<23; j++)
                {
                if ( c == aaStates[j] )
                    {
                    foundState = true;
                    break;
                    }
                }
            if (foundState == false)
                {
                notAa = true;
                }
            
            }
        
        if (notStd == false)
            {
            bool foundState = false;
            for (size_t j=0; j<14; j++)
                {
                if ( c == stdStates[j] )
                    {
                    foundState = true;
                    break;
                    }
                }
            if (foundState == false)
                {
                notStd = true;
                }
            
            }
        
        for (size_t j=0; j<5; j++)
            {
            if ( c == nucStates[j] )
                nucCount++;
            }
        }
    
    // Try to determine which type of data it is. Note that using only the sequence information in the
    // string s that it is difficult or impossible to rule out certain data types. For example, if the
    // data is DNA, then the DNA states with the ambiguity codes do not rule out amino acid data. However,
    // we would expect a lot of A, C, G, and Ts in our data and not much else if the data is DNA, so we
    // use a bit of "fuzzy" logic to determine if the data is highly likely to be nucleotide, or not.
    if (notDna == false && notRna == true && notAa == true && notStd == true)
        return "dna";
    else if (notDna == true && notRna == false && notAa == true && notStd == true)
        return "rna";
    else if (notDna == true && notRna == true && notAa == false && notStd == true)
        return "protein";
    else if (notDna == true && notRna == true && notAa == true && notStd == false)
        return "standard";
    else if (notDna == false && notRna == true && notAa == false && notStd == true)
        {
        if ( (double)nucCount / (s.size()-nMissing) > 0.8 )
            return "dna";
        else
            return "protein";
        }
    else if (notDna == true && notRna == false && notAa == false && notStd == true)
        {
        if ( (double)nucCount / (s.size()-nMissing) > 0.8 )
            return "rna";
        else
            return "protein";
        }
    else if ( notDna == false )
        {
        return "dna";
        }
    //    std::cout << "HEHEHEE: "<< (double)nucCount / (s.size()-nMissing)  << " "<<nucCount << " " << s.size() << " " << nMissing <<std::endl;
    //std::cout << notDna << " " << notRna <<" "<< notAa << " " << notStd << std::endl;
    return "";
}

bool NclReader::isFastaFile(std::string& fn, std::string& dType) {
    
    FileManager fm = FileManager(fn);
    
    // open file
    std::ifstream fStrm;
    fStrm.open(fm.getFullFileName().c_str(), ios::in);
    
    // read the file token-by-token looking for Fasta things
    int ch = fStrm.peek();
    std::string word = "";
    std::string seqStr = "";
    int wordNum = 0, lineNum = 0, lastCarotLine = -100;
    int numSequences = 0;
    while (ch != EOF)
        {

        FileManager reader = FileManager();
        reader.safeGetline(fStrm, word);
        
        // we know that the last character is an escape character
        if ( word.size() > 0 )
            {
            word.erase(word.size()-1);
            }
        if (wordNum == 0 && word[0] == '>')
            {
            if (lineNum - lastCarotLine > 1)
                {
                lastCarotLine = lineNum;
                numSequences++;
                }
            else
                {
                return false;
                }
            }
        else if (wordNum == 0 && word[0] == ';')
            {
            // comment
            }
        else if (lineNum > 0 && word[0] != '>' && word[0] != ';')
            {
            seqStr += word;
            }
        
        wordNum++;
        ch = fStrm.peek();

        lineNum++;
        wordNum = 0;
        }
    
    // close file
    fStrm.close();
    
    if (numSequences < 1)
        return false;
    
    dType = intuitDataType(seqStr);
    
    return true;
}

bool NclReader::isNexusFile(const std::string& fn) {
    
    FileManager fm = FileManager(fn);
    
    // open file, read first word, close file
    std::ifstream fStrm;
    fStrm.open(fm.getFullFileName().c_str(), ios::in);
    std::string word;
    fStrm >> word;
    fStrm.close();
    
    if (word=="#NEXUS")
    {
        return true;
    }
    else
    {
        size_t found = fn.find_last_of(".");
        if ( found != std::string::npos && fn.substr(found+1) == "nex" )
            return true;
        else
            return false;
    }
}

bool NclReader::isPhylipFile(std::string& fn, std::string& dType, bool& is_interleaved) {
    
    FileManager fm = FileManager(fn);
    
    // open file
    std::ifstream fStrm;
    fStrm.open(fm.getFullFileName().c_str(), ios::in);
    std::string seqStr = "";
    
    // read the file token-by-token looking for NEXUS things
    bool foundNumTaxa = false, foundNumChar = false;
    unsigned int num_taxa = 0;
    std::vector<std::string> taxonNames;
    int ch = fStrm.get();
    fStrm.unget();
    std::string word = "";
    int wordNum = 0, lineNum = 0;
    while (ch != EOF)
    {
        word = "";
        fStrm >> word;
        StringUtilities::toLower( word );
        
        if (lineNum == 0 && wordNum == 0 && StringUtilities::isNumber(word) == true)
        {
            std::istringstream buf(word);
            buf >> num_taxa;
            foundNumTaxa = true;
        }
        else if (lineNum == 0 && wordNum == 1 && StringUtilities::isNumber(word) == true)
            foundNumChar = true;
        else if (lineNum > 0 && wordNum == 0 && word != "" && word.size() < 25)
            taxonNames.push_back( word );
        else if (lineNum > 0 && wordNum > 0)
            seqStr += word;
        
        wordNum++;
        ch = fStrm.get();
        if (ch == '\n' || ch == '\r' || ch == EOF)
        {
            lineNum++;
            wordNum = 0;
        }
    }
    
    // close file
    fStrm.close();
    
    if (foundNumTaxa == true && foundNumChar == true)
    {
        if (taxonNames.size() == 0)
            return false;
        if (taxonNames.size() % num_taxa != 0)
            return false;
        
        if (taxonNames.size() > num_taxa)
            is_interleaved = true;
        dType = intuitDataType(seqStr);
        return true;
    }
    
    return false;
}

std::vector<DataMatrix*> NclReader::readMatrices(const std::string &fn, const std::string &ft) {
    
    // instantiate a vector of matrices
    std::vector<DataMatrix* > cmv;
    
    FileManager fm = FileManager(fn);
    
    // The data types are as follows: Nexus, Phylip+DNA/RNA/AA/Standard+Interleaved/Noninterleaved,
    // Fasta+DNA/RNA/AA.
    
    // Check that the file exists. It is likely that this has been already checked during the formation of
    // the map that is passed into the function, but it never hurts to be safe...
    if ( !fileExists(fm.getFullFileName().c_str()) )
        {
        addWarning("Data file not found");
        }
    else
        {
        // Extract information on the file format from the value of the key/value pair. Note that we expect the
        // file_format string to be in the format file_type|data_type|interleave_type with pipes ('|') separating
        // the format components. It might be better to make an object value in the key/value pair that contains
        // this information.
        std::vector<std::string> file_format;
        StringUtilities::stringSplit( ft, "|", file_format );
        std::string ff = file_format[0];
        std::string dt = file_format[1];
        bool il = false;
        if ( file_format[2] == "interleaved" )
            {
            il = true;
            }
        
        // read the file
        cmv = readMatrices( fm.getFullFileName().c_str(), ff, dt, il );
        nexusReader.ClearContent();
        }
    
    return cmv;
}

std::vector<DataMatrix*> NclReader::readMatrices(const std::vector<std::string> fn, const std::string file_format, const std::string data_type, const bool is_interleaved) {
    
    // instantiate a vector of matrices
    std::vector<DataMatrix*> cmv;
    
    // check that the files exist
    for (std::vector<std::string>::const_iterator f = fn.begin(); f != fn.end(); f++)
        {
        if ( !fileExists((*f).c_str()) )
            {
            addWarning("Data file not found");
            return cmv;
            }
        }
    
    // read the data files
    for (std::vector<std::string>::const_iterator f = fn.begin(); f != fn.end(); f++)
        {
        std::vector<DataMatrix*> v = readMatrices( (*f).c_str(), file_format, data_type, is_interleaved );
        if (v.size() > 0)
            {
            for (std::vector<DataMatrix*>::iterator m = v.begin(); m != v.end(); m++)
                cmv.push_back( (*m) );
            }
        nexusReader.ClearContent();
        }
    
    return cmv;
}

std::vector<DataMatrix*> NclReader::readMatrices(const std::string &file_name, const std::string &file_format, const std::string &data_type, bool is_interleaved) {
    
    FileManager fm = FileManager(file_name);
    
    const char *fn = fm.getFullFileName().c_str();
    
    // check that the file exists
    if ( !fileExists(file_name) )
        {
        addWarning("Data file not found");
        std::vector<DataMatrix*> dummy;
        return dummy;
        }
    
    try
        {
        if (file_format == "nexus")
            {
            // NEXUS file format
            nexusReader.ReadFilepath(fn, MultiFormatReader::NEXUS_FORMAT);
            }
        else if (file_format == "fasta")
            {
            // fasta file format
            if (data_type == "dna")
                {
                nexusReader.ReadFilepath(fn, MultiFormatReader::FASTA_DNA_FORMAT);
                }
            else if (data_type == "rna")
                {
                nexusReader.ReadFilepath(fn, MultiFormatReader::FASTA_RNA_FORMAT);
                }
            else if (data_type == "protein")
                {
                nexusReader.ReadFilepath(fn, MultiFormatReader::FASTA_AA_FORMAT);
                }
            else
                {
                addWarning("Unknown data type '" + data_type + "' for fasta formatted files.");
                throw("Unknown data type");
                }
            }
        else if (file_format == "phylip")
            {
            // phylip file format
            if (is_interleaved == false)
                {
                if (data_type == "dna")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::RELAXED_PHYLIP_DNA_FORMAT);
                    }
                else if (data_type == "rna")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::RELAXED_PHYLIP_RNA_FORMAT);
                    }
                else if (data_type == "protein")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::RELAXED_PHYLIP_AA_FORMAT);
                    }
                else if (data_type == "standard")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::RELAXED_PHYLIP_DISC_FORMAT);
                    }
                }
            else
                {
                if (data_type == "dna")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::INTERLEAVED_RELAXED_PHYLIP_DNA_FORMAT);
                    }
                else if (data_type == "rna")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::INTERLEAVED_RELAXED_PHYLIP_RNA_FORMAT);
                    }
                else if (data_type == "protein")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::INTERLEAVED_RELAXED_PHYLIP_AA_FORMAT);
                    }
                else if (data_type == "standard")
                    {
                    nexusReader.ReadFilepath(fn, MultiFormatReader::INTERLEAVED_RELAXED_PHYLIP_DISC_FORMAT);
                    }
                
                }
            
            }
        
        }
    catch(NxsException err)
        {
        std::string fns = file_name;
        
        if ( err.msg.length() == 0 )
            {
            // Basic error message if ncl fails to give something back
            addWarning("Nexus error in file \"" + StringUtilities::getLastPathComponent(fns) + "\"");
            }
        else
            {
            // NxsReader error message
            addWarning(err.msg);
            }
        
        // Position information
        std::stringstream errorMessage;
        errorMessage << "The error occurred while reading line ";
        errorMessage << err.line << " column " << err.col;
        errorMessage << " in file \"" << StringUtilities::getLastPathComponent(fns) << "\"";
        addWarning(errorMessage.str());
        
        // Return empty character matrix vector
        std::vector<DataMatrix*> dummy;
        return dummy;
        }
    
    std::vector<DataMatrix*> cvm = convertFromNcl(file_name);
    return cvm;
}
