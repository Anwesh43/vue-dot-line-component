const maxHeight = window.innerHeight / 10
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
