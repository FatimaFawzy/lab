import { createRouter, createWebHistory } from "vue-router";
import { useCitiesStore } from "@/store/modules/cities";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
     history: createWebHistory("/"),
     routes: [
          {
               path: "/app",
               component: AppLayout,
               beforeEnter: (to, from, next) => {
                    const cities = useCitiesStore();
                    // const branches = useBranchesStore();

                    cities.GetRecords();

                    // branches.GetRecords();
                    return next();
               },
               meta: { requiresAuth: true },
               children: [
                    {
                         path: "/dashboard",
                         name: "dashboard",
                         component: () => import("@/views/statistics/index.vue"),
                    },
                    {
                         path: "/StationEmployeeDashboard",
                         name: "StationEmployeeDashboard",
                         component: () => import("@/views/StationEmployee/index.vue"),
                    },
                    {
                         path: "/bills",
                         name: "bills",
                         component: () => import("@/views/bills/index.vue"),
                    },
                    {
                         path: "/portions",
                         name: "portions",
                         component: () => import("@/views/portions/index.vue"),
                    },
                    {
                         path: "/stations",
                         name: "stations",
                         component: () => import("@/views/stations/index.vue"),
                    },
                    {
                         path: "/agents",
                         name: "agents",
                         component: () => import("@/views/agents/index.vue"),
                    },
                    {
                         path: "/persons",
                         name: "persons",
                         component: () => import("@/views/persons/index.vue"),
                    },
                    {
                         path: "/pending/persons",
                         name: "pending.persons",
                         component: () => import("@/views/pending-persons/index.vue"),
                    },
                    {
                         path: "/merchants",
                         name: "merchants",
                         component: () => import("@/views/merchants/index.vue"),
                    },
                    {
                         path: "/users",
                         name: "users",
                         component: () => import("@/views/users/index.vue"),
                    },
               ],
          },
          {
               path: "/",
               name: "login",
               component: () => import("@/views/auth/login.vue"),
          },
          {
               path: "/logout",
               name: "logout",
               beforeEnter: (to, from, next) => {
                    localStorage.clear();
                    next("/");
               },
               meta: { requiresAuth: true },
          },
          {
               path: "/:catchAll(.*)",
               name: "notfound",
               component: () => import("@/views/auth/404.vue"),
          },
     ],
});

// Navigation guard to check if user is authenticated
router.beforeEach((to, from, next) => {
     const isAuthenticated = localStorage.getItem("token"); // Check if token exists in localStorage
     const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // Check if the route requires authentication
     if (requiresAuth) {
          if (!isAuthenticated) {
               next("/"); // Redirect to login page if not authenticated
          } else {
               next(); // Continue to the requested route
          }
     } else if (to.path === "/" && isAuthenticated) {
          next("/dashboard"); // Redirect to dashboard if authenticated
     } else {
          next(); // Continue to the requested route
     }
});

export default router;
