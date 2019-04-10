#include "FileManager.h"
#include "StringUtilities.h"
#include <iostream>
#include <string>
#include <cstring>
#include <sys/stat.h>
#include <cstdlib>
#include <algorithm>
#include <dirent.h>
#include <unistd.h>

#define MAX_DIR_PATH    2048



FileManager::FileManager(void) {
    
    file_name = "";
    file_path = "";
    full_file_name = "";
    path_separator = "/";
    new_line = "\n";
    
    file_path = getCurrentDirectory();
    full_file_name = file_path;
    if ( full_file_name != "")
        {
        full_file_name += path_separator;
        }
    
    full_file_name += file_name;
}

FileManager::FileManager(const std::string &fn) {
    
    file_name = fn;
    file_path = "";
    full_file_name = "";
    path_separator = "/";
    new_line = "\n";

    parsePathFileNames( fn );
    full_file_name = file_path;
    if ( full_file_name != "")
        {
        full_file_name += path_separator;
        }
    full_file_name += file_name;
}

FileManager::FileManager(const std::string &pn, const std::string &fn) {
    
    file_name = fn;
    file_path = pn;
    full_file_name = "";
    path_separator = "/";
    new_line = "\n";
    
    std::string tmp = pn + path_separator + fn;
    parsePathFileNames( tmp );
    full_file_name = file_path;
    if ( full_file_name != "")
        {
        full_file_name += path_separator;
        }
    full_file_name += file_name;
}

void FileManager::closeFile(std::ifstream& strm) {
    
    strm.close();
}

void FileManager::closeFile(std::ofstream& strm) {
    
    strm.close();
}

void FileManager::createDirectoryForFile(void) {
    
    std::string dir_path = getStringByDeletingLastPathComponent( full_file_name );
    
    std::vector<std::string> pathComponents;
    StringUtilities::stringSplit(dir_path, path_separator, pathComponents);
    
    std::string directoryName = "";
    for ( std::vector<std::string>::const_iterator it=pathComponents.begin(); it != pathComponents.end(); ++it)
        {
        directoryName += *it;
        
        if ( isDirectoryPresent( directoryName ) == false )
            {
            bool success = makeDirectory( directoryName );
            if ( success == false )
                {
                std::cerr << "Failed to build directory with name \"" << directoryName << "\"." << std::endl;
                }
            }
        
        directoryName += path_separator;
        }
}

std::string FileManager::expandUserDir(std::string path) {

    if ( !path.empty() && path[0] == '~')
        {
        char const* home = getenv("HOME");
        
        if (home or ((home = getenv("USERPROFILE"))))
            {
            path.replace(0, 1, home);
            }
        }
    else if ( path.empty() == false )
        {
        char const *hdrive = getenv("HOMEDRIVE"), *hpath = getenv("HOMEPATH");
        if ( hdrive != NULL )
            {
            path.replace(0, 1, std::string(hdrive) + hpath);
            }
        }
    
    return path;
}

void FileManager::formatError(std::string& errorStr) {
    
    bool file_nameProvided    = isFileNamePresent();
    bool isfile_nameGood      = testFile();
    bool isDirectoryNameGood = testDirectory();
    
    if ( file_nameProvided == false && isDirectoryNameGood == false )
    {
        errorStr += "Could not read contents of directory \"" + getFilePath() + "\" because the directory does not exist";
    }
    else if (file_nameProvided == true && (isfile_nameGood == false || isDirectoryNameGood == false))
    {
        errorStr += "Could not read file named \"" + getFileName() + "\" in directory named \"" + getFilePath() + "\" ";
        if (isfile_nameGood == false && isDirectoryNameGood == true)
        {
            errorStr += "because the file does not exist";
        }
        else if (isfile_nameGood == true && isDirectoryNameGood == false)
        {
            errorStr += "because the directory does not exist";
        }
        else
        {
            errorStr += "because neither the directory nor the file exist";
        }
    }
    
}

const std::string FileManager::getCurrentDirectory( void ) const {

    std::string workingDirectory = "";
    char cwd[MAX_DIR_PATH+1];
    if ( getcwd(cwd, MAX_DIR_PATH+1) )
        {
        std::string pathSeparator = "/";
        
        std::string curdir = cwd;
        
        if ( curdir.at( curdir.length()-1 ) == pathSeparator[0] )
            {
            curdir.erase( curdir.length()-1 );
            }
        
        workingDirectory = curdir;
        }
    else
        {
        workingDirectory = "";
        }

    return workingDirectory;
}

std::string FileManager::getFileExtension( void ) const {

    std::vector<std::string> tokens;
    StringUtilities::stringSplit(file_name,".",tokens);
    return tokens[tokens.size()-1];
}

const std::string& FileManager::getFileName( void ) const {

    return file_name;
}

std::string FileManager::getFileNameWithoutExtension( void ) const {

    std::vector<std::string> tokens;
    StringUtilities::stringSplit(file_name,".",tokens);
    std::string name = "";
    
    for (size_t i = 0; i < tokens.size()-1; ++i)
        {
        name += tokens[i];
        }
    
    return name;
}

const std::string& FileManager::getFilePath( void ) const {

    return file_path;
}

const std::string& FileManager::getFullFileName( void ) const {

    return full_file_name;
}


std::string FileManager::getFullFilePath( void ) const {
    
    std::string fullfile_path = file_path;
    
    // check if file_path is relative or absolute
    // add current working path only if relative
    if ( file_path.size() > 0 && path_separator[0] != file_path[0] )
        {
        fullfile_path = getCurrentDirectory() + path_separator + file_path;
        }
    
    return fullfile_path;
    
}

std::string FileManager::getLastPathComponent( void ) {
    
    std::string tmp = full_file_name;
    if ( tmp[tmp.size()-1] == path_separator[0] )
        {
        tmp = tmp.substr(0,tmp.size()-1);
        }
    return getLastPathComponent( tmp );
}

std::string FileManager::getLastPathComponent(const std::string& s) {
    
    std::string tempS = s;
    size_t location = tempS.find_last_of( path_separator );
    if ( location == std::string::npos )
        {
        // There is no path in this string. We
        // must have only the file name.
        return tempS;
        }
    else if ( location == tempS.length() - 1 )
        {
        // It looks like the last character is "/", which
        // means that no file name has been provided.
        return "";
        }
    else
        {
        /* We can divide the path into the path and the file. */
        std::string lpc = tempS.substr( location+1, tempS.length()-location-1 );
        return lpc;
        }
    
    return "";
}

const std::string& FileManager::getNewLine(void) const {

    return new_line;
}

const std::string& FileManager::getPathSeparator( void ) const {

    return path_separator;
}

std::string FileManager::getStringByDeletingLastPathComponent(const std::string& s) {
    
    std::string tempS = s;
    size_t location = tempS.find_last_of( path_separator );
    
    if ( location == std::string::npos )
        {
        /* There is no path in this string. We
         must have only the file name. */
        return "";
        }
    else if ( location == tempS.length() - 1 )
        {
        /* It looks like the last character is "/", which
         means that no file name has been provided. */
        return tempS;
        }
    else
        {
        /* We can divide the path into the path and the file. */
        tempS.erase( location );
        return tempS;
        }
    
    return "";
}

bool FileManager::isDirectory( void ) const {
    
    bool tf = isDirectoryPresent(full_file_name);
    return tf;
}

bool FileManager::isDirectoryPresent(const std::string &mp) const {
    
    if ( mp == "" )
        {
        return true;
        }
    
    struct stat info;
    
    if ( stat( mp.c_str(), &info ) != 0)
        {
        return false;
        }
    else if (info.st_mode & S_IFDIR)
        {
        return true;
        }
    else
        {
        return false;
        }
}

bool FileManager::isFile( void ) const {
    
    return isFilePresent(file_path, file_name);
}

bool FileManager::isFileNamePresent(void) const {
    
    if ( file_name == "" )
        {
        return false;
        }
    return true;
}

bool FileManager::isFilePresent(const std::string &mp, const std::string &mf) const {
    
    std::string f = mp;
    if ( mp == "" )
        {
        f = getCurrentDirectory();
        }
    f += path_separator + mf;
    
    return isFilePresent(f);
}

bool FileManager::isFilePresent(const std::string &fn) const {
    
    struct stat fInfo;
    if ( !stat(fn.c_str(), &fInfo) )
        {
        if ( S_ISDIR(fInfo.st_mode) )
            {
            return false;
            }
        else
            {
            return true;
            }
        }
    return false;
}

bool FileManager::listDirectoryContents(void) {
    
    return listDirectoryContents(file_path);
}

bool FileManager::listDirectoryContents(const std::string& dirpath) {
    
    DIR* dir = opendir( dirpath.c_str() );
    if (dir)
        {
        struct dirent* entry;
        while ((entry = readdir( dir )))
            {
            struct stat entryinfo;
            std::string entryname = entry->d_name;
            std::string entrypath = dirpath + path_separator + entryname;
            if (!stat( entrypath.c_str(), &entryinfo ))
                {
                if (S_ISDIR( entryinfo.st_mode ))
                    {
                    if      (entryname == "..")
                        {
                        ;
                        }
                    else if (entryname == "." )
                        {
                        ;
                        //RBOUT( dirpath + "/" );
                        //result.push_back( dirpath + "/" );
                        }
                    else
                        {
                        listDirectoryContents( entrypath );
                        }
                    }
                else
                    {
                    //RBOUT( entrypath );
                    //result.push_back( entrypath );
                    }
            }
            }
        closedir( dir );
        }
    
    return true;
}

bool FileManager::makeDirectory(const std::string &dn) {
    
    std::string cmd = "mkdir -p \"" + dn + "\"";
    return ( system( cmd.c_str() ) == 0 );
}

bool FileManager::openFile(std::ifstream& strm) {
    
    // concatenate path and file name
    std::string file_pathName = file_path + path_separator + file_name;
    
    // here we assume that the presence of the path/file has
    // been checked elsewhere
    strm.open( file_pathName.c_str(), std::ios::in );
    if ( !strm )
        {
        return false;
        }
    
    return true;
}

bool FileManager::openFile(std::ofstream& strm) {
    
    // concatenate path and file name
    std::string file_pathName = file_path + path_separator + file_name;
    
    // here we assume that the presence of the path/file has
    // been checked elsewhere
    strm.open( file_pathName.c_str(), std::ios::out );
    if ( !strm )
        {
        return false;
        }
    
    return true;
}

bool FileManager::parsePathFileNames(const std::string &input_string) {
    
    std::string name = input_string;
    
    //    std::filesystem::path path(winPathString); // Construct the path from a string.
    if ( name.size() > 0 && name[0] != '/' )
        {
        name = getCurrentDirectory() + path_separator + input_string;
        }
    
    // check if the path is a good one
    bool isDPresent = isDirectoryPresent(name);
    bool isFPresent = isFilePresent(name);
    
    if ( name.length() > 0 && isDPresent == true && isFPresent == false)
        {
        file_name = "";
        size_t location = name.find_last_of( path_separator );
        if ( location == name.length() - 1 )
            {
            name.erase( location );
            }
        file_path = name;
        return true;
        }
    
    // the string that is supposed to hold the path/file information is empty.
    if ( name.length() == 0 )
        {
        file_path = getCurrentDirectory();
        return false;
        }
    
    // Find the location of the last "/".
    //This is where we will divide the path/file string into two.
    size_t location = StringUtilities::findLastOf( name, path_separator[0] );
    
    if ( location == std::string::npos )
        {
        /* There is no path in this string. We
         must have only the file name, and the
         file should be in our current directory. */
        file_name = name;
        file_path = getCurrentDirectory();
        }
    else if ( location == name.length() - 1 )
        {
        // It looks like the last character is "/", which
        // means that no file name has been provided. However,
        // it also means that the directory that has been provided
        // is not valid, otherwise it would have tested as
        // being present (above).
        file_name = "";
        file_path = getCurrentDirectory();
        return false;
        }
    else
        {
        // We can divide the path into the path and the file.
        file_name = name.substr( location+1, name.length()-location-1 );
        name.erase( location );
        file_path = name;
        }
    
    return true;
}

std::istream& FileManager::safeGetline(std::istream& is, std::string& t) {

    t.clear();
    
    // The characters in the stream are read one-by-one using a std::streambuf.
    // That is faster than reading them one-by-one using the std::istream.
    // Code that uses streambuf this way must be guarded by a sentry object.
    // The sentry object performs various tasks,
    // such as thread synchronization and updating the stream state.
    
    std::istream::sentry se(is, true);
    std::streambuf* sb = is.rdbuf();
    
    for(;;)
        {
        int c = sb->sbumpc();
        switch (c)
            {
            case '\n':
                return is;
            case '\r':
                if(sb->sgetc() == '\n')
                    sb->sbumpc();
                return is;
            case EOF:
                // Also handle the case when the last line has no line ending
                if(t.empty())
                    is.setstate(std::ios::eofbit);
                return is;
            default:
                t += (char)c;
            }
        }
}

void FileManager::setFileName(std::string const &s) {

    file_name = s;
}

void FileManager::setFilePath(std::string const &s) {

    file_path = s;
}

bool FileManager::setStringWithNamesOfFilesInDirectory(std::vector<std::string>& sv, bool recursive) {
    
    return setStringWithNamesOfFilesInDirectory(file_path, sv, recursive);
}

bool FileManager::setStringWithNamesOfFilesInDirectory(const std::string& dirpath, std::vector<std::string>& sv, bool recursive) {
    
    DIR* dir = opendir( dirpath.c_str() );
    if (dir)
        {
        struct dirent* entry;
        while ( (entry = readdir( dir )) )
            {
            struct stat entryinfo;
            std::string entryname = entry->d_name;
            std::string entrypath = dirpath + path_separator + entryname;
            
            if (!stat( entrypath.c_str(), &entryinfo ))
                {
                
                if (entryname == "..")
                    {
                    ;
                    }
                else if (entryname == "." || entryname[0] == '.')
                    {
                    ;
                    }
                else if ( recursive == true && S_ISDIR( entryinfo.st_mode ) )
                    {
                    setStringWithNamesOfFilesInDirectory( entrypath, sv );
                    }
                else
                    {
                    sv.push_back( entrypath );
                    }
                
                }
            
            }
        
        closedir( dir );
        }
    
    // make sure that the file names are sorted
    std::sort(sv.begin(), sv.end());
    
    return true;
}

bool FileManager::testDirectory(void) {
    
    return isDirectoryPresent(file_path);
}

bool FileManager::testFile(void) {
    
    return isFilePresent(file_path, file_name);
}





