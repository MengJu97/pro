import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        component: () => import("@/views/Login")
    },
    {
        path: '/home',
        redirect: '/index',
        component: () => import("@/views/Home"),
        children: [
            {
                path: '/index',
                component: () => import("@/components/HomeChildren/Index")
            },
            {
                path: '/cat',
                component: () => import("@/components/HomeChildren/Category")
            },
            {
                path: '/cart',
                component: () => import("@/components/HomeChildren/Cart"),
                meta: {requiresAuth: true}
            },
            {
                path: '/mine',
                component: () => import("@/components/HomeChildren/Mine")
            }
        ]
    },
    {
        path: '/detail/:id',
        component: () => import("@/views/Detail")
    }
    ,
    {
        path: '*',
        component: () => import("@/components/404NotFound")
    }
]


const router = new VueRouter({
    routes
})

//全局守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next();
    }
})

export default router
