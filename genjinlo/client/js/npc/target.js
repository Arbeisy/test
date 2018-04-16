import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 12
const ENEMY_HEIGHT = 12
const R_IN = 6
const R_OUT= 6

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
function randomSpeed() {
  return Math.floor(Math.random() * 3 + 1)
}

export default class Target extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.rx = screenWidth/2
    this.ry = screenHeight/4
    this.speed={
      x: randomSpeed(),
      y: randomSpeed(),
    }
    this.initExplosionAnimation()
  }

  render(ctx) {
    this.x=this.rx-R_IN
    this.y=this.ry-R_IN
    ctx.beginPath()
    ctx.fillStyle = 'gray'
    ctx.arc(this.rx, this.ry, R_IN, 0, 2 * Math.PI)
    ctx.fill()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    if (this.rx + R_OUT > screenWidth){
      this.speed.x = -1 * randomSpeed()
      this.speed.y = randomSpeed() - 2
    }
    if (this.rx < R_OUT) {

      this.speed.x = randomSpeed()
      this.speed.y = randomSpeed() - 2
    }
    if (this.ry + R_OUT > screenHeight) {

      this.speed.x = randomSpeed()-2
      this.speed.y = -1* randomSpeed()
    }
    if (this.ry < R_OUT) {

      this.speed.x = randomSpeed() - 2
      this.speed.y = randomSpeed()
    }
    this.rx += this.speed.x
    this.ry += this.speed.y
  }
}
