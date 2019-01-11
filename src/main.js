import Vue from "vue";
import "./style.scss";

// import Overview from './components/Overview.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment',{ get(){return this.$root.moment}});

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });
// import checkFilter from './util/bus';
import setDay from './util/bus';

const bus = new Vue();
Object.defineProperty(Vue.prototype,'$bus',{get() {return this.$root.bus}});

new Vue({
  el: "#app",
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  methods:{
    checkFilter(category, title, checked) {
      // console.log("check");
      if (checked) {
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1);
        }
      }
    }
  },
  created(){
    this.$http.get('/api').then(response => {
      console.log(response.data);
      this.movies = response.data;
    });
    var self = this;
    this.$bus.$on('check-filter', this.checkFilter);
    // this.$bus.$on('set-day',setDay.bind(this) )
    this.$bus.$on('set-day',(day) => {this.day = day} )
  },
  router
});

Vue.directive('tooltip',{
  bind(el,bindings){
    let span = document.createElement('SPAN');
    let text = document.createTextNode('Seats available: 200');
    span.appendChild(text);
    el.appendChild(span);
  }
})
