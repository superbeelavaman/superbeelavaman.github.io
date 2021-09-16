import random

def RunGame():
  print("\nWelcome to Rock Paper Scissors\n")
  PlayerScore = 0
  OpponentScore = 0
  PlayerInputText = 0
  PlayerInputNum = 0
  OpponentInputText = 0
  OpponentInputText = 0
  while PlayerScore < 3 and OpponentScore < 3:
    PlayerInputText=input("Choose either r, p, or c for Rock, Paper, and Scissors respectively (pressing enter alone will assume Rock): ")

    if PlayerInputText == 'r':
      PlayerInputNum = 1

    if PlayerInputText == 'p':
      PlayerInputNum = 2

    if PlayerInputText == 'c':
      PlayerInputNum = 3

    OpponentInputNum = random.randint(1,3)

    if OpponentInputNum == 1:
      OpponentInputText = 'r'

    if OpponentInputNum == 2:
      OpponentInputText = 'p'

    if OpponentInputNum == 3:
      OpponentInputText = 'c'

    print("You used " + PlayerInputText + ". Your opponent used " + OpponentInputText + ".")

    if PlayerInputNum == OpponentInputNum - 1 or PlayerInputNum == OpponentInputNum + 2 or PlayerInputNum == OpponentInputNum:
      if PlayerInputNum == OpponentInputNum:
        PlayerScore += 1
        OpponentScore += 1
      else:
        OpponentScore += 1
    else:
      PlayerScore += 1

    print("Score:\nPlayer: " + str(PlayerScore) + "\nOpponent: " + str(OpponentScore))

  if PlayerScore == 3:
    if OpponentScore == 3:
      print("Tie Game.")
    else:
      print("You Won!")
  else:
    print("Opponent Won.")
  return("Process ended properly")
