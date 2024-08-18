import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginUser.vue";
import Register from "../components/RegisterUser.vue";
import ProductList from "../components/ProductList.vue";
import ProductForm from "../components/ProductForm.vue";

const routes = [
  { path: "/", component: ProductList },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/products", component: ProductList },
  { path: "/products/new", component: ProductForm },
  { path: "/products/:id/edit", component: ProductForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
