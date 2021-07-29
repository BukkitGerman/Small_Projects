// Exampel 1

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})

// Example 2

var app2 = new Vue({
    el: '#app-2',
    data: {
        title: 'You loaded this page on ' + new Date().toLocaleString(),
        message: 'Hello World and welcome to vuejs'
    }
})

// Example 3

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    },
    methods: {
        toggle: (event) => {
            app3.seen ? app3.seen = false : app3.seen = true;
        }
    }
})

app3.seen = false

// Example 4

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
        { text: 'Learn JavaScript!' },
        { text: 'Learn Vue!' },
        { text: 'Build something awesome!' }
        ]
    }
})

// Example 5

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

