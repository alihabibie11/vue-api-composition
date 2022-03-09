import { createRouter, createWebHistory } from "vue-router";

//initialize the route path name component etc in var routes
const routes = [
    {
        path: '/',
        name: 'transaction.index',
        component: () => import('../views/transaction/IndexTrans.vue')
    },
    {
        path: '/create',
        name: 'transaction.create',
        component: () => import('../views/transaction/CreateTrans.vue')
    },
    {
        path: '/edit/:id',
        name: 'transaction.edit',
        component: () => import('../views/transaction/EditTrans.vue')
    },
]

//create router and send history, routes
const router = createRouter({
    history: createWebHistory(),
    routes
})

//export to use this router in main.js
export default router;