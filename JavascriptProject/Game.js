const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const music = new Audio('./sound/music.wav');
let score = 10

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 15, 'white')
const projectiles = []
const enemies = []
const particles = []

function playMusic() {
    setInterval(() => {
        music.play();
    },16000)
}

let spawnSpeed = 0.5
let spawnRate = 2000
function spawnEnemies() {
    setInterval(() => {
        
        const radius = Math.random() * 20 + 15

        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < .5 ? -radius : canvas.width + radius
            y = Math.random() * canvas.height
        }
        else {
            x = Math.random() * canvas.width
            y = Math.random() < .5 ? -radius : canvas.height + radius
        }

        const color = `rgba(${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}`
     
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle) * spawnSpeed,
            y: Math.sin(angle) * spawnSpeed
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
        
        spawnRate *= 0.9
        spawnSpeed += 0.01
    }, spawnRate)
}

let animationId
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile, pIndex) => {
        projectile.update()

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(pIndex, 1)
            },0)
        }
    });
    particles.forEach((particle, paIndex) => {
        if (particle.alpha <= 0.1) {
            particles.splice(paIndex, 1)
        }
        particle.update()

        if (particle.x + particle.radius < 0 ||
            particle.x - particle.radius > canvas.width ||
            particle.y + particle.radius < 0 ||
            particle.y - particle.radius > canvas.height) {
            setTimeout(() => {
                particles.splice(paIndex, 1)
            }, 0)
        }
    });
    enemies.forEach((enemy, eIndex) => {
        enemy.update()
        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if (dist < enemy.radius + player.radius) {
            cancelAnimationFrame(animationId)
            let respawn = confirm(`You died with a score of ${score}! Respawn?`)
            if (respawn) {
                location.reload()
            }
        }

        if (enemy.x + enemy.radius < 0 ||
            enemy.x - enemy.radius > canvas.width ||
            enemy.y + enemy.radius < 0 ||
            enemy.y - enemy.radius > canvas.height) {
            setTimeout(() => {
                enemies.splice(eIndex, 1)
            }, 0)
        }

        projectiles.forEach((projectile, pIndex) => {
            dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist < enemy.radius + projectile.radius) {
                
                for (let i = 0; i < 16; i++) {
                    particles.push(new Particle(projectile.x, projectile.y, Math.random() + 2.5, enemy.color, { x: Math.random() * 6 - 3, y: Math.random() * 6 - 3 }))
                }
                setTimeout(() => {
                    if (enemy.radius > 20) {
                        score += 5
                        gsap.to(enemy, {radius: enemy.radius - 10})
                    }
                    else {
                        score += 10
                        enemies.splice(eIndex, 1)
                    }
                    projectiles.splice(pIndex, 1)
                }, 0)

            }
        })
    })
    c.font = '30px DSEG14';
    c.fillStyle = 'white'
    c.fillText(`Score:!${score}`, 10, 40)
}

addEventListener('click', (event) => {
    score -= 1
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: 5 * Math.cos(angle),
        y: 5 * Math.sin(angle)
    }
    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
})

animate()
spawnEnemies()
playMusic()
