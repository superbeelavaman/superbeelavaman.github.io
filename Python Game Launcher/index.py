from Games import *
import time
import os

print("\\Games\\ directory contains: ")
print("\n".join([i for i in os.listdir("Games")[0:]]))

Input = input('Write the name of the game you want to play: ')

print("Opening ...\\Games\\" + Input + ".py")
ProgramOutput = eval(Input + '.RunGame()')

print("\nThis program has ended. If you think this was a mistake, please read the below output")
print(ProgramOutput)

input("\nPress Enter to close.\n")
