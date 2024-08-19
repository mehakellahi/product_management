<template>
  <div class="admin-panel">
    <header class="header">
      <h1 class="admin-title">Admin Panel</h1>
      <button @click="logout" class="btn btn-logout">Logout</button>
    </header>
    <main class="content">
      <div class="product-list-container">
        <h2 class="title">Product List</h2>
        <router-link to="/products/new" class="btn btn-add-product">
          Add New Product
        </router-link>
        <div v-if="products.length === 0" class="no-data">No data found</div>
        <ul v-else class="product-list">
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
              <span class="product-price"
                >${{ (parseFloat(product.price) || 0).toFixed(2) }}</span
              >
              <span class="product-stock">Stock: {{ product.stock }}</span>
            </div>
            <div class="actions">
              <button @click="deleteProduct(product.id)" class="btn btn-delete">
                Delete
              </button>
              <router-link
                :to="{ name: 'edit', params: { id: product.id } }"
                class="btn btn-edit"
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
        const response = await axios.get("/products");
        this.products = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/products/${id}`);
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
        await axios.post("logout");
        this.$store.dispatch("clearToken"); // Clear token from Vuex store
        this.$router.push("/login"); // Redirect to login page
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
  font-family: "Arial", sans-serif;
}

.header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #444;
}

.admin-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.btn-logout {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #c82333;
}

.content {
  flex-grow: 1;
  padding: 30px;
  background-color: #f8f9fa;
}

.product-list-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 26px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.btn-add-product {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
}

.btn-add-product:hover {
  background-color: #218838;
}

.no-data {
  font-size: 18px;
  color: #666;
  text-align: center;
  padding: 20px;
}

.product-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

.product-item:hover {
  background-color: #f1f1f1;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
}

.product-name {
  font-size: 20px;
  font-weight: 600;
}

.product-price {
  display: block;
  font-size: 18px;
  color: #333;
}

.product-stock {
  display: block;
  font-size: 16px;
  color: #666;
}

.actions {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .admin-title {
    font-size: 24px;
  }

  .btn-logout {
    margin-top: 10px;
    font-size: 14px;
  }

  .content {
    padding: 20px;
  }

  .product-list-container {
    padding: 15px;
  }

  .title {
    font-size: 22px;
  }

  .btn-add-product {
    font-size: 14px;
    padding: 8px 12px;
  }

  .product-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .product-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  .product-info {
    text-align: center;
  }

  .actions {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px;
  }

  .admin-title {
    font-size: 20px;
  }

  .btn-logout {
    padding: 8px 12px;
    font-size: 12px;
  }

  .content {
    padding: 15px;
  }

  .product-list-container {
    padding: 10px;
  }

  .title {
    font-size: 20px;
  }

  .btn-add-product {
    font-size: 12px;
    padding: 6px 10px;
  }

  .product-item {
    padding: 8px;
  }

  .product-image {
    width: 100%;
    height: auto;
    margin-bottom: 8px;
  }

  .product-info {
    text-align: center;
  }

  .actions {
    flex-direction: column;
    gap: 8px;
  }

  .btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
