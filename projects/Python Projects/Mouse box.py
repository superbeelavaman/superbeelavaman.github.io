from ursina import *
app = Ursina()

cursor = Entity(model = 'quad', texture = "Images\Mouse\Mouse" , scale = (1,1), position = (0,0))

mouse.visible = False

def update():
    cursor.x = mouse.x * 8.3
    cursor.y = mouse.y * 8.3
    if mouse.right:
        cursor.texture = "Images\Mouse\Mouse - Flipped"
    elif mouse.middle:
        cursor.texture = "Images\Mouse\Mouse - Text Caret"
    else:
        cursor.texture = "Images\Mouse\Mouse"


app.run()