import { createWebHistory, createRouter } from "vue-router"

import  { alreadyLoggedinGuard, authGuard, userInvitationGuard } from "@/middleware"

import SideMenu from "@/layouts/side-menu/Main.vue"
import IconMenu from "@/layouts/icon-menu/Main.vue"
import HealthCheck from "@/views/HealthCheck.vue"
import Login from "@/views/auth/Login.vue"

import ErrorPage from "@/views/error-page/Main.vue"
import Dashboard from "@/views/dashboard/Main.vue"

import Customers from "@/views/customers/Main.vue"
import CustomersForm from "@/views/customers/CreateForm.vue"

import Products from "@/views/products/Main.vue"
import ProductsForm from "@/views/products/CreateForm.vue"


const routes = [
    {
        path: "/healthcheck",
        name: "healthcheck",
        component: HealthCheck,
    },

    {
        path: "/",
        name: "default",
        component: Login,
        beforeEnter: alreadyLoggedinGuard,
        meta: {
            title: 'Login',
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: alreadyLoggedinGuard,
        meta: {
            title: 'Login',
        },
    },

    {
        path: "/error-page",
        name: "error-page",
        component: ErrorPage,
        meta: {
            title: '404 page not found',
        },
    },
    {
        path: "/:pathMatch(.*)*",
        component: ErrorPage,
        meta: {
            title: '404 page not found',
        },
    },

    {
        path: "/",
        component: SideMenu,
        children: [
            {
                path: "/:businessId?/dashboard",
                name: "dashboard",
                component: Dashboard,
                beforeEnter: authGuard,
                props: true,
                meta: {
                    title: 'Dashboard',
                },

            },
            //customers
            {
                path: "/customers",
                name: "customers",
                component: Customers,
                beforeEnter: authGuard,
                meta: {
                    title: 'Customers',
                },
            },
            {
                path: "/:businessId?/customer/add",
                name: "add-customer",
                component: CustomersForm,
                beforeEnter: authGuard,
                meta: {
                    title: 'Create customer',
                },
            },
            {
                path: "/:businessId?/customer/:id/edit",
                name: "edit-customer",
                component: CustomersForm,
                beforeEnter: authGuard,
                meta: {
                    title: 'Edit customer',
                },
            },
            //products
            {
                path: "/:businessId?/product-services",
                name: "product-services",
                component: Products,
                beforeEnter: authGuard,
                meta: {
                    title: 'Products & Services',
                  },
            },
            {
                path: "/:businessId?/product/add",
                name: "add-product",
                component: ProductsForm,
                beforeEnter: authGuard,
                meta: {
                    title: 'Add new product',
                },
            },
            {
                path: "/:businessId?/product/:id/edit",
                name: "edit-product",
                component: ProductsForm,
                beforeEnter: authGuard,
                meta: {
                    title: 'Edit product',
                },
            },                                                                     
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    },
    
})

router.updateMeta = (routeName, newMeta) => {
    const route = router.getRoutes().find((r) => r.name === routeName);
    if (route) {
      Object.assign(route.meta, newMeta);
    }
  };

window.router = router

export default router
