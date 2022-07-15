<template>
  <v-app>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" top="top" color="secondary" elevation="24">
        {{ response.msg }}
      </v-snackbar>
    </div>
    <v-data-table
      v-model="ids"
      show-select
      item-key="id"
      :headers="headers"
      :items="device_statusses"
      :server-items-length="total"
      :loading="loading"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 15],
      }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="">
          <v-toolbar-title>Device Statusses</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-text-field
            @input="searchIt"
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn
            small
            color="error"
            class="mr-2 mb-2"
            @click="delteteSelectedRecords"
            >Delete Selected Records</v-btn
          >

          <v-btn
            small
            color="primary"
            @click="dialog = true"
            class="mb-2"
            >Device Status +</v-btn
          >

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Role"
                      ></v-text-field>
                      <span
                        v-if="errors && errors.length > 0"
                        class="error--text"
                        >{{ errors[0] }}</span
                      >
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="error" small @click="close"> Cancel </v-btn>
                <v-btn class="primary" small @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          color="secondary"
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="error"
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    options: {},
    endpoint: "device_status",
    search: "",
    snackbar: false,
    dialog: false,
    ids: [],
    loading: false,
    total: 0,
    headers: [
      { text: "Device Status", align: "left", sortable: false, value: "name" },
      { text: "Actions", align: "center", value: "action", sortable: false },
    ],
    editedIndex: -1,
    editedItem: { name: "" },
    defaultItem: { name: "" },
    response: { msg: "" },
    device_statusses: [],
    errors: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
      this.errors = [];
      this.search = "";
    },
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  created() {
    this.loading = true;
  },

  methods: {
    can(permission) {
      let user = this.$auth;
      console.log(user);
      return;
      return (
        (user && user.permissions.some((e) => e.permission == permission)) ||
        user.master
      );
    },

    getDataFromApi() {
      this.loading = true;
      this.$axios
        .get(`${this.endpoint}?page=1`)
        .then(({ data }) => {
          // this.device_statusses = this.can("role_read") ? data.data : [];
          // this.total = this.can("role_read") ? data.total : 0;

          this.device_statusses =  data.data;
          this.total =  data.total;
          this.loading = false;
        });
    },

    searchIt(e) {
      if (e.length == 0) {
        this.getDataFromApi();
      } else if (e.length > 2) {
        this.loading = true;
        this.$axios.get(`${this.endpoint}/search/${e}`).then(({ data }) => {
          this.device_statusses = /*this.can("role_read") ?*/ data.data /*: []*/;
          this.total = /*this.can("role_read") ?*/ data.total /*: 0*/;
          this.loading = false;
        });
      }
    },

    editItem(item) {
      this.editedIndex = this.device_statusses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    delteteSelectedRecords() {
      let just_ids = this.ids.map((e) => e.id);
      confirm(
        "Are you sure you wish to delete selected records , to mitigate any inconvenience in future."
      ) &&
        this.$axios
          .post(`${this.endpoint}/delete/selected`, {
            ids: just_ids,
          })
          .then((res) => {
            if (!res.data.status) {
              this.errors = res.data.errors;
            } else {
              this.getDataFromApi();
              this.snackbar = res.data.status;
              this.ids = [];
              this.response.msg = "Selected records has been deleted";
            }
          })
          .catch((err) => console.log(err));
    },

    deleteItem(item) {
      confirm(
        "Are you sure you wish to delete , to mitigate any inconvenience in future."
      ) &&
        this.$axios.delete(this.endpoint + "/" + item.id).then(({data}) => {
          const index = this.device_statusses.indexOf(item);
          this.device_statusses.splice(index, 1);
          this.snackbar = data.status;
          this.response.msg = data.message;
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let payload = {
        name: this.editedItem.name.toLowerCase(),
      };
      if (this.editedIndex > -1) {
        this.$axios
          .put(this.endpoint + "/" + this.editedItem.id, payload)
          .then(({data}) => {
            if (!data.status) {
              this.errors = data.errors;
            } else {
              const index = this.device_statusses.findIndex(
                (item) => item.id == this.editedItem.id
              );
              this.device_statusses.splice(index, 1, {
                id: this.editedItem.id,
                name: this.editedItem.name,
              });
              this.snackbar = data.status;
              this.response.msg = data.message;
              this.close();
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.$axios
          .post(this.endpoint, payload)
          .then(({data}) => {
            if (!data.status) {
              this.errors = data.errors;
            } else {
              this.getDataFromApi();
              this.snackbar = data.status;
              this.response.msg = data.message;
              this.close();
              this.errors = [];
              this.search = "";
            }
          })
          .catch((res) => console.log(res));
      }
    }
  },
};
</script>
