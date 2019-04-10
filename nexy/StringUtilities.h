#ifndef StringUtilities_H
#define StringUtilities_H

#include <iostream>
#include <sstream>
#include <string>
#include <vector>

namespace StringUtilities {
    
    size_t      findFirstOf(const std::string &s, char c);
    size_t      findLastOf(const std::string &s, char c);
    std::string getLastPathComponent(const std::string& s);
    std::string getStringWithDeletedLastPathComponent(const std::string& s);
    bool        isNumber(const std::string& s);
    void        stringSplit(const std::string &str, const std::string &delim, std::vector<std::string>& results);
    void        toLower(std::string& str);
}

#endif
