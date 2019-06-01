const maxHeight = window.innerHeight / 5
const delay = 1
const delayWithinTasks = 50
const factor = 0.5

class Loop {

    constructor() {
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task)
        if (this.tasks.length == 1) {
            this._start()
        }
    }

    _start() {
        this.interval = setInterval(() => {
            this.tasks.forEach((task) => {
                task.execute()
            })
        })
    }

    stop(tag) {
        for (var i = this.tasks.length - 1; i >= 0; i--) {
            const task  = this.tasks[i]
            if (task.tag === tag) {
                this.tasks.splice(i, 1)
                break
            }
        }
        if (this.tasks.length == 0) {
            clearInterval(this.interval)
        }
    }
}

class Task {

    constructor(tag, cb) {
        this.tag = tag
        this.prevExecuted = new Date().getTime()
        this.cb = cb
    }

    execute() {
        const currTime = new Date().getTime()
        if (currTime - this.prevExecuted > delayWithinTasks && typeof(this.cb) === "function") {
            this.prevExecuted = currTime
            this.cb()
        }
    }
}

class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale += this.dir * 0.1
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

const loop = new Loop()

Vue.component('dot-line', {
    template : '#dotlinetemplate',
    data() {
        console.log(this.i)
        return {maxHeight, y : 0, task : new Task(`tag${this.i}`, this.updateCb.bind(this)), state : new State()}
    },
    props : [
        'i'
    ],
    methods : {
        toggleGrowth() {
            this.state.startUpdating(() => {
                loop.addTask(this.task)
            })
        },
        grow() {
            this.y = -maxHeight * this.state.scale * factor
            console.log(this.y)
        },
        updateCb() {
          this.grow()
          this.state.update(() => {
              loop.stop(this.task.tag)
              this.grow()
          })
        }
    }
})

const vueInstance = new Vue({
    el : '#app',
    data : {
        indexes : [0, 1, 2, 3, 4]
    }
})
