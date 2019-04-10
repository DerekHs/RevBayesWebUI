#include "StringUtilities.h"
#include "FileManager.h"

#include <sstream>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <string>
#include <cstdlib>



size_t StringUtilities::findFirstOf(const std::string &s, char c) {

    size_t pos = std::string::npos;
    
    for (size_t i=0; i<s.length(); ++i)
        {
        if ( s[i] == c )
            {
            pos = i;
            break;
            }
        }
    
    return pos;
}

size_t StringUtilities::findLastOf(const std::string &s, char c) {

    size_t pos = std::string::npos;
    
    for (size_t i=s.length(); i>0; --i)
        {
        if ( s[i-1] == c )
            {
            pos = i-1;
            break;
            }
        }
    
    return pos;
}

std::string StringUtilities::getLastPathComponent(const std::string& s) {

    std::vector<std::string> sVec;
    stringSplit(s, "/", sVec);
    std::string lastComponent = "";
    if (sVec.size() > 0)
        {
        lastComponent = sVec[sVec.size()-1];
        }
    
    return lastComponent;
}

std::string StringUtilities::getStringWithDeletedLastPathComponent(const std::string& s) {
    
    std::string pathSeparator = "/";
    
    std::string tempS = s;
    size_t location = StringUtilities::findLastOf(tempS, pathSeparator[0]);
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

bool StringUtilities::isNumber(const std::string& s) {

    bool exponent = false;
    bool sign = false;
    bool decimal = false;
    bool digit = false;

    for (size_t i=0; i<s.size(); i++)
        {
        if ( isdigit(s[i]) )
            {
            digit = true;
            }
        else if(s[i] == '.')
            {
            if( decimal ) return false;

            decimal = true;
            }
        else if(s[i] == 'e')
            {
            if( exponent || !digit ) return false;

            exponent = true;

            sign = false;
            decimal = false;
            digit = false;
            }
        else if(s[i] == '+' || s[i] == '-')
            {
            if( sign || digit || decimal ) return false;

            sign = true;
            }
        else
            {
            return false;
            }
        }
    
    return true;
}

void StringUtilities::stringSplit(const std::string &s, const std::string &delim, std::vector<std::string>& results) {
    
    // create our own copy of the string
    std::string str = s;

    size_t cutAt;
    while ( (cutAt = StringUtilities::findFirstOf(str, delim[0])) != str.npos )
        {
        if (cutAt > 0)
            {
            results.push_back(str.substr(0, cutAt));
            }
        else
            {
            results.push_back( "" );
            }
        str = str.substr(cutAt+1);
        }
    
    if (str.length() > 0)
        {
        results.push_back(str);
        }
}

void StringUtilities::toLower(std::string& str) {

    for (size_t i=0; i<str.size(); i++)
        str[i] = char( tolower(str[i]) );
}


