<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Edit Product" : "Add Product" }}</h2>
    <form @submit.prevent="saveProduct" class="product-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="product.name"
          placeholder="Product Name"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="product.description"
          placeholder="Product Description"
          required
          class="form-input"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          v-model="product.price"
          type="number"
          placeholder="Product Price"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="stock">Stock</label>
        <input
          id="stock"
          v-model="product.stock"
          type="number"
          placeholder="Product Stock"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input
          id="image"
          type="file"
          @change="handleFileUpload"
          class="form-input"
        />
      </div>
      <button type="submit" class="submit-button">
        {{ isEdit ? "Update" : "Add" }} Product
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
      },
      isEdit: false,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      const product = this.products.find((p) => p.id === id);
      if (product) {
        this.product = { ...product };
      }
    }
  },
  methods: {
    ...mapActions(["addProduct", "updateProduct"]),
    handleFileUpload(event) {
      this.product.image = event.target.files[0];
    },
    async saveProduct() {
      const formData = new FormData();
      Object.keys(this.product).forEach((key) => {
        formData.append(key, this.product[key]);
      });

      if (this.isEdit) {
        await this.updateProduct({ id: this.$route.params.id, ...formData });
      } else {
        await this.addProduct(formData);
      }

      this.$router.push("/products");
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

textarea.form-input {
  height: 100px;
  resize: vertical;
}

.submit-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Responsive design */
@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  .form-input {
    font-size: 14px;
  }

  .submit-button {
    font-size: 14px;
  }
}
</style>
