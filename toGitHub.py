#!/bin/usr/env python3
import os

def execComand(command):
    print('===========================================')
    print(command)
    print('===========================================')
    exitCode = os.system(command)
    if exitCode != 0:
        print('=======================================')
        print('Ooops !!!')
        print('command: {}'.format(command))
        print('exit code: {}'.format(exitCode))
        exit(0)

preCommands = [
    'rm -rv packages\\sanar-ui\\dist',
    'rm -rv packages\\sanar-rm-questions\\dist',
]

for command in preCommands:
    os.system(command)

commands = [
    'git pull origin develop',
    'yarn sanarui:build',
    'yarn sanarrm:build',
    'git checkout develop',
    'git merge questions-rm',
    'git push',
    'git checkout master',
    'git merge develop',
    'git push github',
    'git checkout questions-rm'
]

for command in commands:
    execComand(command)


print("Success")    