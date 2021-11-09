const canvas = document.queryselector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
  cosntructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    c.fill()
  }
}

const player = new Player(100, 100, 30, 'white')
player.draw()
