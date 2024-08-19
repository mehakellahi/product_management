<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
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
        <button type="submit" :disabled="!isFormValid">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p>
          Don't have an account?
          <router-link to="/register" class="register-link">
            Register here
          </router-link>
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
      email: "",
      password: "",
      errorMessage: "",
      emailTouched: false,
      passwordTouched: false,
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.isValidEmail(this.email) && this.password;
    },
  },
  methods: {
    ...mapActions(["setToken"]),
    async login() {
      if (this.isFormValid) {
        try {
          const response = await axios.post("/login", {
            email: this.email,
            password: this.password,
          });
          // If login is successful, store token and redirect
          this.setToken(response.data.token); // Store token in Vuex and localStorage
          this.$router.push("/products"); // Redirect to products page
        } catch (error) {
          // Check for a 401 error specifically for incorrect email/password
          if (error.response && error.response.status === 401) {
            this.errorMessage = "Invalid email or password. Please try again.";
          } else if (error.response && error.response.data) {
            // Other errors
            this.errorMessage =
              error.response.data.message ||
              "Login failed. Please check your credentials and try again.";
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }
        }
      } else {
        // Handle case when form is invalid but user tries to submit
        this.errorMessage = "Please fill out the form correctly.";
      }
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f9fc;
}

.login-form {
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

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

.error {
  color: #dc3545;
  margin: 5px 0;
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  input,
  button {
    font-size: 14px;
  }
}
</style>
