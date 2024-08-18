<template>
  <div class="product-list-container">
    <h2 class="title">Product List</h2>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-price"
          >${{ (parseFloat(product.price) || 0).toFixed(2) }}</span
        >
        <div class="actions">
          <button @click="deleteProduct(product.id)" class="btn btn-danger">
            Delete
          </button>
          <router-link
            :to="{ name: 'edit', params: { id: product.id } }"
            class="btn btn-primary"
          >
            Edit
          </router-link>
        </div>
      </li>
    </ul>
    <router-link to="/products/new" class="btn btn-success">
      Add New Product
    </router-link>
  </div>
</template>

<script>
import axios from "../api/axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/api/products/${id}`);
        this.fetchProducts(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-list-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-name {
  font-size: 18px;
  color: #333;
}

.product-price {
  font-size: 18px;
  color: #666;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
