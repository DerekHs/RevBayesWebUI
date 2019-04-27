import subprocess
import shlex
import os
from nexus import NexusReader


"""
Dependencies: python-nexus
https://pypi.org/project/python-nexus/
@params [String file: filename of Nexus file] 
Returns: Dictionary from 'TAXA' to a list of the taxa
"""
def pythonParser(file):
    DIR = os.path.join(os.path.dirname(__file__), 'api/upload')

    n = NexusReader()
    n = NexusReader(os.path.join(DIR, file))

    return {'TAXA': list(n.blocks['data'].matrix.keys())}

    