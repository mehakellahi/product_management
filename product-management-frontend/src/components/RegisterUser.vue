<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            @blur="nameTouched = true"
          />
          <p v-if="nameTouched && !name" class="error">Name is required.</p>
        </div>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            @blur="emailTouched = true"
          />
          <p v-if="emailTouched && !email" class="error">Email is required.</p>
          <p v-if="emailTouched && !isValidEmail(email)" class="error">
            Invalid email format.
          </p>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            @blur="passwordTouched = true"
          />
          <p v-if="passwordTouched && !password" class="error">
            Password is required.
          </p>
        </div>
        <button type="submit">Register</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p>
          Already have an account?
          <router-link to="/login" class="login-link">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      nameTouched: false,
      emailTouched: false,
      passwordTouched: false,
    };
  },
  methods: {
    ...mapActions(["setToken"]),
    async register() {
      if (this.isFormValid()) {
        try {
          const response = await axios.post("register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.setToken(response.data.token);
          this.$router.push("/products");
        } catch (error) {
          if (error.response && error.response.status === 422) {
            this.handleValidationErrors(error.response.data.errors);
          } else {
            this.errorMessage =
              "Registration failed. Please check your details and try again.";
          }
        }
      }
    },
    handleValidationErrors(errors) {
      if (errors.email) {
        this.errorMessage = "The email address is already taken.";
      } else {
        this.errorMessage =
          "There are validation errors. Please check your details.";
      }
    },
    isFormValid() {
      this.nameTouched = true;
      this.emailTouched = true;
      this.passwordTouched = true;

      return this.name && this.isValidEmail(this.email) && this.password;
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f9fc;
}

.register-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px;
  width: 100%;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: #dc3545;
  margin: 5px 0;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  input,
  button {
    font-size: 14px;
  }
}
</style>
