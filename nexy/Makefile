
# define the C compiler to use
CC = g++

# define any compile-time flags
CFLAGS = -Wall -g -std=c++11

# define any directories containing header files other than /usr/include
INCLUDES = -I/home/newhall/include  -I../include

# define library paths in addition to /usr/lib
LFLAGS =

# define any libraries to link into executable
LIBS = -lm

# define the C source files
SRCS  =   main.cpp \
DataMatrix.cpp \
FileManager.cpp \
NclReader.cpp \
Msg.cpp \
Settings.cpp \
StringUtilities.cpp \
nxscharactersblock.cpp \
nxsstring.cpp \
nxspublicblocks.cpp \
nxstreesblock.cpp \
nxsassumptionsblock.cpp \
nxscxxdiscretematrix.cpp \
nxsdistancesblock.cpp \
nxstaxaassociationblock.cpp \
nxsreader.cpp \
nxsunalignedblock.cpp \
nxsblock.cpp \
nxsdatablock.cpp \
nxsexception.cpp \
nxstaxablock.cpp \
nxssetreader.cpp \
nxsmultiformat.cpp \
nxstoken.cpp

# define the object files 
OBJS = $(SRCS:.c=.o)

# define the executable file 
MAIN = nexy

# generic code
.PHONY: depend clean

all: $(MAIN)
	@echo	The program $(MAIN) has been compiled

$(MAIN): $(OBJS)
	$(CC) $(CFLAGS) $(INCLUDES) -o $(MAIN) $(OBJS) $(LFLAGS) $(LIBS)

.c.o:
	$(CC) $(CFLAGS) $(INCLUDES) -c $<  -o $@

clean:
	$(RM) *.o *~ $(MAIN)

depend: $(SRCS)
	makedepend $(INCLUDES) $^


