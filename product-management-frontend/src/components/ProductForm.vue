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
          placeholder="Enter product name"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="productForm.description"
          placeholder="Enter product description"
          required
          class="form-control"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          type="number"
          v-model="productForm.price"
          placeholder="Enter product price"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="stock">Stock</label>
        <input
          id="stock"
          type="number"
          v-model="productForm.stock"
          placeholder="Enter product stock"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input
          id="image"
          type="file"
          @change="handleFileUpload"
          class="form-control"
        />
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
  </div>
</template>

<script>
import axios from "../api/axios";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      productForm: {
        id: null,
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      },
      isEditing: false,
    };
  },
  methods: {
    async submitForm() {
      const formData = new FormData();
      formData.append("name", this.productForm.name);
      formData.append("description", this.productForm.description);
      formData.append("price", this.productForm.price);
      formData.append("stock", this.productForm.stock);
      if (this.productForm.image) {
        formData.append("image", this.productForm.image);
      }

      console.log("Form data:", Array.from(formData.entries())); // Log form data

      try {
        let response;
        if (this.isEditing) {
          response = await axios.post(
            `/api/products/${this.productForm.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post("/api/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        console.log("API response:", response); // Log API response
        this.$emit("form-submitted");
      } catch (error) {
        console.error("Failed to submit form:", error); // Log any error
      }
    },
    handleFileUpload(event) {
      this.productForm.image = event.target.files[0];
    },
    cancelEdit() {
      this.$emit("cancel-edit");
    },
  },
  watch: {
    product(newProduct) {
      if (newProduct) {
        this.productForm = { ...newProduct };
        this.isEditing = true;
      } else {
        this.isEditing = false;
        this.productForm = {
          id: null,
          name: "",
          description: "",
          price: "",
          stock: "",
          image: null,
        };
      }
    },
  },
};
</script>

<style scoped>
.product-form-container {
  max-width: 600px;
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
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
}

@media (max-width: 600px) {
  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .btn:last-child {
    margin-bottom: 0;
  }
}
</style>
