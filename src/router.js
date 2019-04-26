import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home.vue'
// import global from './common.vue'
import question from './components/question/question.vue'
import ready from './components/question/ready.vue'
import time from './components/question/time.vue'
import hobbies from './components/question/hobbies.vue'
import habit from './components/question/habit.vue'




Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/question',
      component: question,
      redirect: '/question/ready',
      children: [
        {
          path: 'ready',
          component: ready
        },
        {
          path: 'time',
          component: time
        },
        {
          path: 'hobbies',
          component: hobbies
        },
        {
          path: 'habit',
          component: habit
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    // console.log("get success");
    next();
  } else {
    console.log("no token!");
    // window.location.href = global.login_location
    next();
  }
})

export default router
