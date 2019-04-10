import subprocess
import shlex

def execCPP(path, inFile):
    subprocess.call(shlex.split(path + ' -i ' + inFile + ' -o temp.out'), shell=True)
    print('working...')