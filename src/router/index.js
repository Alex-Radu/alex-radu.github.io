import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Post from '@/views/Post.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/posts/:year/:month/:day/:slug',
    component: Post,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
