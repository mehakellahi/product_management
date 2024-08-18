<template>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
        <button @click="deleteProduct(product.id)">Delete</button>
        <router-link :to="{ name: 'edit', params: { id: product.id } }"
          >Edit</router-link
        >
      </li>
    </ul>
    <router-link to="/products/new">Add New Product</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["products"]),
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(["fetchProducts", "deleteProduct"]),
  },
};
</script>
