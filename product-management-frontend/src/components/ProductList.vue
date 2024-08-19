<template>
  <div class="admin-panel">
    <header class="header">
      <h1 class="admin-title">Admin Panel</h1>
      <button @click="logout" class="btn btn-logout">Logout</button>
    </header>
    <main class="content">
      <div class="product-list-container">
        <h2 class="title">Product List</h2>
        <router-link
          to="/products/new"
          class="btn btn-success add-product-button"
        >
          Add New Product
        </router-link>
        <ul class="product-list">
          <li
            v-for="product in products"
            :key="product.id"
            class="product-item"
          >
            <img
              :src="getProductImageUrl(product.image_path)"
              :alt="product.name"
              class="product-image"
            />
            <div class="product-info">
              <span class="product-name">{{ product.name }}</span>
              <span class="product-price">
                ${{ (parseFloat(product.price) || 0).toFixed(2) }}
              </span>
              <span class="product-stock">Stock: {{ product.stock }}</span>
            </div>
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
      </div>
    </main>
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
    getProductImageUrl(imagePath) {
      const baseURL = "http://127.0.0.1:8000/storage/";
      return imagePath ? baseURL + imagePath : ""; // Handle image path properly
    },
    async logout() {
      try {
        await axios.post("/api/logout"); // Adjust the API endpoint if needed
        // Redirect to the login page or homepage
        this.$router.push("/login"); // Adjust the route as needed
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    },
  },
};
</script>

<style scoped>
.admin-panel {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #343a40;
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-title {
  margin: 0;
  font-size: 24px;
}

.btn-logout {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #c82333;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.product-list-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.add-product-button {
  display: inline-block;
  margin-bottom: 20px;
}

.product-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.product-info {
  flex-grow: 1;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.product-price {
  display: block;
  font-size: 16px;
  color: #333;
}

.product-stock {
  display: block;
  font-size: 14px;
  color: #666;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
