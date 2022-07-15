<template>
  <div v-if="can(`assign_permission_access`)">
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" top="top" color="secondary" elevation="24">
        {{ msg }}
      </v-snackbar>
    </div>

    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-text>
          <v-row>
            <v-col>
              <div class="display-1 pa-2">Assign Permissions</div>
            </v-col>
            <v-col>
              <div class="display-1 pa-2 text-right">
                <v-btn small class="primary" to="/assign_permission">
                  <v-icon small>mdi-arrow-left</v-icon>&nbsp;Back
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :rules="Rules"
                  v-model="role_id"
                  :items="roles"
                  item-value="id"
                  item-text="name"
                  label="Role*"
                  readonly
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-checkbox
                  @change="setAllIds"
                  :label="`Select All`"
                  v-model="just_ids"
                >
                </v-checkbox>
                <v-checkbox
                  v-for="(pa, idx) in permissions"
                  :key="idx"
                  :value="pa.id"
                  v-model="permission_ids"
                  :label="`${pa.name}`"
                >
                </v-checkbox>
              </v-col>


              <v-col cols="12" v-if="errors && errors.permission_ids">
                <span  class="error--text">{{errors.permission_ids[0]}}</span>
              </v-col>
              <v-col>
                <v-btn
                  v-if="can(`assign_permission_edit`)"
                  dark
                  small
                  color="primary"
                  class="mr-4"
                  @click="save"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-card>
  </div>
  <NoAccess v-else />
</template>

<script>
export default {
  data: () => ({
    role_id: "",
    permission_ids: [],
    permissions: [],
    msg: "",
    snackbar: false,
    just_ids: false,
    Rules: [v => !!v || "This field is required"],
    errors: [],
    roles: []
  }),
  created() {
    this.$axios
      .get("assign-permission/" + this.$route.params.id)
      .then(({ data }) => {
        this.role_id = data.role_id;
        this.permission_ids = data.permission_ids;
      })
      .catch(err => console.log(err));

    this.$axios
      .get("role")
      .then(({ data }) => {
        this.roles = data.data;
      })
      .catch(err => console.log(err));

    this.$axios
      .get("permission")
      .then(({ data }) => {
        this.permissions = data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    setAllIds() {
      this.permission_ids = this.just_ids
        ? this.permissions.map(e => e.id)
        : [];
    },
    can(per) {
      let u = this.$auth.user;
      return (
        (u && u.permissions.some(e => e.name == per || per == "/")) ||
        u.is_master
      );
    },
    save() {
      this.errors = [];
      let payload = {
        role_id: this.role_id,
        permission_ids: this.permission_ids
      };
      this.$axios
        .put("assign-permission/" + this.$route.params.id, payload)
        .then(({ data }) => {
          if (!data.status) {
            this.errors = data.errors;
            return;
          }

          this.msg = "Permissions has been assigned";
          this.snackbar = true;
          setTimeout(() => this.$router.push("/assign_permission"), 2000);
        });
    }
  }
};
</script>
