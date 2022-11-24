<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">Name must not be empty.</p>
    </div>
    <div>
      <label for="email">E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">E-mail must not be empty.</p>
    </div>
    <div>
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model.trim="password.val"
        @blur="clearValidity('password')"
      />
      <p v-if="!password.isValid">Password must not be empty.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <button>{{ showMode }}</button>
  </form>
  <button @click="changeMode">{{ switchMode }}</button>
  <p>{{ this.$store.state.name || "" }}</p>
  <p>{{ this.$store.state.email || "" }}</p>
  <p>{{ this.$store.state.password || "" }}</p>
  <!-- <p>{{ this.$store.state.token }}</p> -->
  <p>{{ this.$store.state.response || "" }}</p>
  <!-- <p>{{ this.$store.state.error || "" }}</p> -->
  <!-- <p>{{ this.$store.state.response["error"]["message"] || "" }}</p> -->

</template>

<script>
import store from '../store';

export default {
  // components: {
  //   CreateQuestions,
  // },
  data() {
    return {
      name: {
        val: '',
        isValid: true,
      },
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      mode: "login",
    };
  },
  computed: {
    switchMode() {
      if (this.mode=="signup") {
        return "Switch to Login";
      }
      else {
        return "Switch to Signup";
      }
    },
    showMode() {
      if (this.mode=="signup") {
        return "Signup";
      }
      else {
        return "Login";
      }
    },
    // errorString() {
    //   for (const property in this.$store.state.response) {
    //     if (property == "error") {
    //       return this.$store.state.response[property];
    //     }
    //   }
    //   return "";
    // },
  },
  methods: {
    changeMode() {
      if (this.mode=="login") this.mode="signup";
      else this.mode="login";
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      // store.state.name = this.name.val;
      // store.state.email = this.email.val;
      // store.state.password = this.password.val;
      localStorage.setItem('name', this.name.val);
      localStorage.setItem('email', this.email.val);
      localStorage.setItem('password', this.password.val);
      this.$store.state.name = localStorage.getItem('name');
      this.$store.state.email = localStorage.getItem('email');
      this.$store.state.password = localStorage.getItem('password');
      // this.auth();
      try {
        store.commit("auth", this.mode);
      } catch (e) {
        this.$store.state.error = e;
      }

      this.$router.replace('/create');
    },



  },
}
</script>