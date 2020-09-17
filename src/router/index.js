import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/register",
        name: "Registration",
        component: Registration,
        meta: {
            guest: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "*",
        name: "Not Found",
        component: NotFound,
        
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(localStorage.getItem("user") == null){
            next({ path: "/login" })
        } else{
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)){
        if(localStorage.getItem("user") == null){
            next()
        } else{
            next("/")
        }
    } else{
        next()
    }
})

export default router;
