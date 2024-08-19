<template>
  <div class="product-form-container">
    <h2 class="form-title">
      {{ isEditing ? "Edit Product" : "Create Product" }}
    </h2>
    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="productForm.name"
          @input="clearError('name')"
          placeholder="Enter product name"
          required
          class="form-control"
        />
        <span v-if="errors.name" class="error-message">{{
          errors.name[0]
        }}</span>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="productForm.description"
          @input="clearError('description')"
          placeholder="Enter product description"
          required
          class="form-control"
        ></textarea>
        <span v-if="errors.description" class="error-message">{{
          errors.description[0]
        }}</span>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          type="number"
          v-model.number="productForm.price"
          @input="clearError('price')"
          placeholder="Enter product price"
          required
          class="form-control"
        />
        <span v-if="errors.price" class="error-message">{{
          errors.price[0]
        }}</span>
      </div>

      <div class="form-group">
        <label for="stock">Stock</label>
        <input
          id="stock"
          type="number"
          v-model.number="productForm.stock"
          @input="clearError('stock')"
          placeholder="Enter product stock"
          required
          class="form-control"
        />
        <span v-if="errors.stock" class="error-message">{{
          errors.stock[0]
        }}</span>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <input
          id="image"
          type="file"
          @change="handleFileUpload"
          class="form-control"
        />
        <span v-if="errors.image" class="error-message">{{
          errors.image[0]
        }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? "Update Product" : "Create Product" }}
        </button>
        <button type="button" @click="cancelEdit" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>

    <!-- Modal for success message -->
    <div v-if="showSuccessPopup" class="modal-overlay">
      <div class="modal-content">
        <p>Product successfully {{ isEditing ? "updated" : "created" }}!</p>
        <button @click="closePopup" class="btn btn-primary">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";

export default {
  data() {
    return {
      showSuccessPopup: false,
      productForm: {
        id: null,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: null,
      },
      isEditing: false,
      errors: {}, // Object to hold validation errors
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEditing = true;
      this.fetchProduct(this.$route.params.id);
    }
  },
  methods: {
    async fetchProduct(id) {
      try {
        const response = await axios.get(`/api/products/${id}`);
        this.productForm = {
          id: response.data.id,
          name: response.data.name || "",
          description: response.data.description || "",
          price: response.data.price || 0,
          stock: response.data.stock || 0,
          image: null, // Reset image since we're not fetching the file itself
        };
        console.log("productForm", this.productForm); // Debugging to ensure the form is populated
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    },
    async submitForm() {
      this.errors = {}; // Clear previous errors

      const formData = new FormData();
      formData.append("name", this.productForm.name);
      formData.append("description", this.productForm.description);
      formData.append("price", this.productForm.price);
      formData.append("stock", this.productForm.stock);

      if (this.productForm.image) {
        formData.append("image", this.productForm.image);
      }

      try {
        if (this.isEditing) {
          formData.append("_method", "PUT"); // Add the _method field to simulate a PUT request for file uploads

          await axios.post(`/api/products/${this.productForm.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          await axios.post("/api/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        this.showSuccessPopup = true;
        setTimeout(() => {
          this.closePopup();
          this.$router.push("/products");
        }, 1500);
      } catch (error) {
        if (error.response && error.response.data) {
          this.errors = error.response.data.errors; // Capture validation errors
          console.error("Validation errors:", this.errors);
        } else {
          console.error("Failed to submit form:", error);
        }
      }
    },

    handleFileUpload(event) {
      this.productForm.image = event.target.files[0];
    },
    clearError(field) {
      if (this.errors[field]) {
        this.errors[field] = null;
      }
    },
    closePopup() {
      this.showSuccessPopup = false;
    },
    cancelEdit() {
      this.$router.push("/products");
    },
  },
};
</script>

<style scoped>
.product-form-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
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

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
