<!-- // ~/plugins/client-log.js
export default ({ app }, inject) => {
    inject('clog', string => console.log(string))
}

export default {

  fetch({app}){
       // Note: inject will automatically prefix with a "$"
       app.$clog("some string")
  },

  mounted() {
    // this.$clog can also be accessed within vuex
    this.$clog("I'm in a component")
  }
}; -->