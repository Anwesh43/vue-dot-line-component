const maxHeight = window.innerHeight / 10
const delay = 1
const delayWithinTasks = 50

class Loop {

    constructor() {
        this.tasks = {}
    }

    addTask(task) {
        this.tasks.push(task)
        if (this.tasks.length == 1) {

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
        this.scale += this.dir * 0.01
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

Vue.Component('dot-line', {
    template : '#dotlinetemplate',
    data() {
        return {y : 0}
    },
    methods : {
        toggleGrowth() {

        },
        grow() {
            this.y = maxHeight
        }
    }
})
