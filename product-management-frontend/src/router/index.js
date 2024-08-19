import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex"; // Import Vuex store
import Login from "../components/LoginUser.vue";
import Register from "../components/RegisterUser.vue";
import ProductList from "../components/ProductList.vue";
import ProductForm from "../components/ProductForm.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  {
    path: "/products",
    component: ProductList,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/products/new",
    component: ProductForm,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/products/edit/:id",
    name: "edit",
    component: ProductForm,
    props: true,
    meta: { requiresAuth: true }, // Protect this route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next("/login"); // Redirect to login if not authenticated
    }
  } else {
    next(); // Always call next() to resolve the navigation
  }
});

export default router;
