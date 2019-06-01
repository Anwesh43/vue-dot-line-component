const maxHeight = window.innerHeight / 10

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
