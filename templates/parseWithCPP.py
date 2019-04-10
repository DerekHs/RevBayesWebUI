import subprocess
import shlex

def execCPP(path, inFile):
    subprocess.call(shlex.split(path + ' ' + inFile + ' temp.out'))
