import Vue from 'vue'
import Router from 'vue-router'

// const news = () => import('../components/news/main')
// const login = () => import('../components/public/login')
// const register = () => import('../components/public/register')
// const manage = () => import('../components/manage/index')
// const global_analysis = () => import('../components/manage/components/global_analysis/index')
// const global_hour = () => import('../components/manage/components/global_analysis/global_hour')
// const global_day = () => import('../components/manage/components/global_analysis/global_day')
// const across = () => import('../components/manage/components/global_analysis/across')
// const channel = () => import('../components/manage/components/channel/index')

import news from '../components/news/main'
import  login from '../components/public/login'
import register from '../components/public/register'
import manage from '../components/manage/index'
import global_analysis from '../components/manage/components/global_analysis/index'
import global_hour from '../components/manage/components/global_analysis/global_hour'
import global_day from '../components/manage/components/global_analysis/global_day'
import  across from '../components/manage/components/global_analysis/across'
import channel from '../components/manage/components/channel/index'
import better from '../components/manage/components/better/index'
import ad from '../components/manage/components/ad/index'
import detail from '../components/manage/components/visitor/detail.vue'
import analysis from '../components/manage/components/visitor/analysis.vue'
import remain from '../components/manage/components/visitor/remain.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: news
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children:[
        {
          path: '/channel',
          name: 'channel',
          component: channel
        },
        {
          path: '/better',
          name: 'better',
          component: better
        },
        {
          path: '/visitor_detail',
          name: 'visitor_detail',
          component: detail
        },
        {
          path: '/visitor_analysis',
          name: 'visitor_analysis',
          component: analysis
        },
        {
          path: '/remain',
          name: 'remain',
          component: remain
        },
        {
          path: '/ad',
          name: 'ad',
          component: ad
        },
        {
          path: '/global',
          name: 'global',
          component: global_analysis
        },
        {
          path: '/global_hour',
          name: 'global_hour',
          component: global_hour
        },
        {
          path: '/global_day',
          name: 'global_day',
          component: global_day
        },
        {
          path: '/across',
          name: 'across',
          component: across
        }
      ]
    },
    
  ]
})
