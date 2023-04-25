<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center">Thông Tin Cá Nhân</h2>
        <img v-bind:src="picture" style="width: 100%" />
      </div>
    </div>

    <div class="row" style="margin-top: 30px">
      <div class="offset-md-3 col-md-6">
        <form v-on:submit.prevent="updateProfile" enctype="multipart/form-data">
          <input
            type="file"
            name="picture"
            accept="image/*"
            class="form-control"
            v-on:change="previewImage"
          />

          <div class="form-group">
            <label>Họ và Tên</label>
            <input
              type="text"
              name="name"
              class="form-control"
              v-bind:value="user.name"
              required
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              class="form-control"
              v-bind:value="user.email"
              disabled
            />
          </div>

          <input
            type="submit"
            class="btn btn-primary"
            value="Chỉnh sửa thông tin"
            v-bind:disabled="isDisabled"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import store from "../vuex/store";

export default {
  data() {
    return {
      isDisabled: false,
      picture: "",
    };
  },

  methods: {
    previewImage: function () {
      const self = this;
      const files = event.target.files;
      if (files.length > 0) {
        const fileReader = new FileReader();

        fileReader.onload = function () {
          self.picture = event.target.result;
        };

        fileReader.readAsDataURL(files[0]);
      }
    },

    updateProfile: async function () {
      this.isDisabled = true;

      const form = event.target;
      const formData = new FormData(form);

      const response = await axios.post(
        this.$apiURL + "/updateProfile",
        formData,
        {
          headers: this.$headers,
        }
      );
      this.isDisabled = false;
      store.commit("setUser", response.data.user);

      swal.fire(
        "Chỉnh sửa thông tin",
        response.data.message,
        response.data.status
      );
    },
  },

  mounted: function () {
    const self = this;
    setTimeout(function () {
      if (self.user != null) {
        self.picture = self.$apiURL + "/" + self.user.picture;
      }
    }, 100);
  },

  computed: {
    user() {
      return store.getters.getUser;
    },
  },
};
</script>
