<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1>Đăng Nhập</h1>
      </div>
    </div>

    <div class="row">
      <div class="offset-md-3 col-md-6">
        <form method="POST" v-on:submit.prevent="doLogin">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" name="email" required />
          </div>

          <br />

          <div class="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              name="password"
              required
            />
          </div>

          <br />
          <div class="center">
            <input
              type="submit"
              v-bind:value="isLoading ? 'Loading...' : 'Đăng Nhập'"
              v-bind:disabled="isLoading"
              name="submit"
              class="btn btn-primary btn-block mb-4"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    doLogin: async function () {
      const self = this;
      const form = event.target;
      const formData = new FormData(form);

      this.isLoading = true;

      const response = await axios.post(this.$apiURL + "/login", formData);

      if (response.data.status == "success") {
        var accessToken = response.data.accessToken;
        localStorage.setItem(this.$accessTokenKey, accessToken);

        setTimeout(function () {
          window.location.href = "/";
        }, 500);

        form.reset();
      } else {
        this.isLoading = false;
        swal.fire("Error", response.data.message, "error");
      }
    },
  },
};
</script>
