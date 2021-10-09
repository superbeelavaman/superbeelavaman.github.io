from ursina import *

velocity_x = 0
velocity_y = 0
grounded = False
max_speed = 2
Animationcount = 0

def getbuttons():
    x = 0
    y = 0
    run = 0
    duck = 0

    if held_keys["w"]:
        x += 1
    if held_keys["d"]:
        y += 1
    if held_keys["a"]:
        y -= 1
    if held_keys["shift"]:
        run += 1
    if held_keys["s"]:
        duck += 1

    return(x, y, run, duck)

def update():

    global velocity_x
    global velocity_y
    global grounded
    global max_speed
    global Animationcount


    buttons = getbuttons()

    if grounded:



        Animationcount += 1
        if Animationcount > 16:
           Animationcount = -16


        
        velocity_y += buttons[0] * 5
        velocity_x += buttons[1]

        if velocity_x > 0.125 or velocity_x < -0.125:
            velocity_x -= (velocity_x / abs(velocity_x))/2
        else:
            velocity_x = 0


        if buttons[3]:
            Player.texture = "Images\Stick\Duck"
        else:
            if Animationcount > 0:
                if abs(velocity_x) > 0:
                    Player.texture = "Images\Stick\WalkB"
                else:
                    Player.texture = "Images\Stick\Dance"
            else:
                if abs(velocity_x) > 0:
                    Player.texture = "Images\Stick\WalkA"
                else:
                    Player.texture = "Images\Stick\Idle"

    else:
        if velocity_y > 1:
            Player.texture = "Images\Stick\Jump"
        elif velocity_y < -1:
            Player.texture = "Images\Stick\Fall"
        else:
            Player.texture = "Images\Stick\J-F Transition"
        


    Player.y += velocity_y * 5 * time.dt
    Player.x += velocity_x * 5 * time.dt
    
    velocity_y -= 0.25

    if Player.y < -2.85:
        grounded = True
        velocity_y = Player.y + 3.25
        if velocity_y > -0.5 and velocity_y < 0.5:
            velocity_y = 0
    else:
        grounded = False

    if Player.y < -5:
        Player.y = -3
        velocity_y = 0

    if abs(velocity_x) > (max_speed * ((buttons[2] * 1.5) + 1)):
        velocity_x /= 2


app = Ursina()


Player = Entity(model = 'quad', texture = "Images\Stick\Idle" , scale = (1,2), position = (0,0))

app.run()

