import Vue from 'vue'
import Router from 'vue-router'
import check from './components/check.vue'
import global from './common.vue'

import user from './components/user/user'
import userHome from './components/user/userHome.vue'
import learning from './components/user/learning.vue'
import cet from './components/user/cet.vue'
import search from './components/user/search.vue'
import backWord from './components/user/backWord.vue'
import note from './components/user/note.vue'
import backErrorWord from './components/user/backErrorWord.vue'

import admin from './components/admin/admin.vue'
import adminHome from './components/admin/adminHome.vue'
import manageWord from './components/admin/manageWord.vue'
import addWord from './components/admin/addWord.vue'
import manageUser from './components/admin/manageUser.vue'


Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    {
      path: '/',
      redirect: '/check'
    },
    {
      path: '/check',
      component: check
    },
    {
      path: '/user',
      component: user,
      redirect: '/user/home',
      children: [
        {
          path: 'home',
          component: userHome
        },
        {
          path: 'learning',
          component: learning
        },
        {
          path: 'learning/:id',
          component: cet
        },
        {
          path: 'search',
          component: search
        },
        {
          path: 'backWord',
          component: backWord
        },
        {
          path: 'note',
          component: note
        },
        {
          path: 'backErrorWord',
          component: backErrorWord
        }
      ]
    },
    {
      path: '/admin',
      component: admin,
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          component: adminHome
        },
        {
          path: 'addWord',
          component: addWord
        },
        {
          path: 'manageWord',
          component: manageWord
        },
        {
          path: 'manageUser',
          component: manageUser
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
    window.location.href = global.login_location
    next();
  }
})

export default router
