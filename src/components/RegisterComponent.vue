<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1>Đăng Ký</h1>
      </div>
    </div>

    <div class="row">
      <div class="offset-md-3 col-md-6">
        <form method="POST" v-on:submit.prevent="doRegister">
          <div class="form-group">
            <label>Họ và tên</label>
            <input type="text" class="form-control" name="name" required />
          </div>

          <br />

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
              ss
              required
            />
          </div>

          <br />

          <input
            type="submit"
            v-bind:value="isLoading ? 'Loading...' : 'Đăng ký'"
            v-bind:disabled="isLoading"
            name="submit"
            class="btn btn-primary btn-block mb-4"
          />
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
    doRegister: async function () {
      const form = event.target;
      const formData = new FormData(form);

      this.isLoading = true;

      const response = await axios.post(
        this.$apiURL + "/registration",
        formData
      );

      this.isLoading = false;
      swal.fire("Đăng Ký", response.data.message, "success");

      if (response.data.status == "success") {
        this.$router.push({
          path: "/login",
        });
      }
    },
  },
};
</script>
