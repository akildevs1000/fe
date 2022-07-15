<template>
  <div v-if="can('company_access')">
    <div v-if="!preloader">
      <v-row class="mt-5 mb-10">
        <v-col cols="10">
          <h3>Company</h3>
          <div>Dashboard / Company / Create</div>
        </v-col>
      </v-row>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Company Info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Contact Info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Login Info
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Company Name</label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="company_payload.name"
                    class="form-control"
                    type=""
                  />
                  <span v-if="errors && errors.name" class="text-danger mt-2">{{
                    errors.name[0]
                  }}</span>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Company Logo</label>
                  <br />
                  <v-btn
                    text
                    small
                    class="form-control primary"
                    @click="onpick_attachment"
                    >{{ !upload.name ? "Upload Logo" : "File Uploaded" }}
                    <v-icon right dark>mdi-cloud-upload</v-icon></v-btn
                  >

                  <input
                    required
                    type="file"
                    @change="attachment"
                    style="display: none"
                    accept="image/*"
                    ref="attachment_input"
                  />

                  <span v-if="errors && errors.logo" class="text-danger mt-2">{{
                    errors.logo[0]
                  }}</span>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Member From </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="company_payload.member_from"
                    class="form-control"
                    type="date"
                  />
                  <span
                    v-if="errors && errors.member_from"
                    class="text-danger mt-2"
                    >{{ errors.member_from[0] }}</span
                  >
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Expiry Date </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="company_payload.expiry"
                    type="date"
                    class="form-control"
                  />
                  <span
                    v-if="errors && errors.expiry"
                    class="text-danger mt-2"
                    >{{ errors.expiry[0] }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Max Employees <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="company_payload.max_employee"
                    type="number"
                    class="form-control"
                  />
                  <span
                    v-if="errors && errors.max_employee"
                    class="text-danger mt-2"
                    >{{ errors.max_employee[0] }}</span
                  >
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Max Devices <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="company_payload.max_devices"
                    type="number"
                    class="form-control"
                  />
                  <span
                    v-if="errors && errors.max_devices"
                    class="text-danger mt-2"
                    >{{ errors.max_devices[0] }}</span
                  >
                </div>
              </div>

              <div class="col-sm-12">
                <div class="form-group">
                  <label class="col-form-label">Location </label>
                  <span class="text-danger">*</span>
                  <textarea
                    v-model="company_payload.location"
                    cols="30"
                    rows="3"
                    class="form-control"
                  ></textarea>
                  <span
                    v-if="errors && errors.location"
                    class="text-danger mt-2"
                    >{{ errors.location[0] }}</span
                  >
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn
                    v-if="can('company_create')"
                    dark
                    small
                    :loading="loading"
                    color="primary"
                    @click="validate_company"
                  >
                    Next
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Contact Person Name </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="contact_payload.name"
                    class="form-control"
                    type="text"
                  />
                  <span
                    v-if="errors && errors.name"
                    class="text-danger mt-2"
                    >{{ errors.name[0] }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Contact Person Number </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="contact_payload.number"
                    class="form-control"
                    type="number"
                  />
                  <span
                    v-if="errors && errors.number"
                    class="text-danger mt-2"
                    >{{ errors.number[0] }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Contact Person Position </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="contact_payload.position"
                    class="form-control"
                    type="text"
                  />
                  <span
                    v-if="errors && errors.position"
                    class="text-danger mt-2"
                    >{{ errors.position[0] }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label">Contact Person Whatsapp </label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="contact_payload.whatsapp"
                    class="form-control"
                    type="number"
                  />
                  <span
                    v-if="errors && errors.whatsapp"
                    class="text-danger mt-2"
                    >{{ errors.whatsapp[0] }}</span
                  >
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn small color="secondary" @click="e1 = 1">
                    Back
                  </v-btn>
                  <v-btn
                    v-if="can('company_create')"
                    dark
                    small
                    :loading="loading"
                    color="primary"
                    @click="validate_contact"
                  >
                    Next
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"></label>
                  Name <span class="text-danger">*</span>
                  <input
                    v-model="login_payload.name"
                    class="form-control"
                    type=""
                  />
                </div>
                <span
                  v-if="errors && errors.name"
                  class="text-danger mt-2"
                  >{{ errors.name[0] }}</span
                >
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"></label>
                  Email <span class="text-danger">*</span>
                  <input
                    v-model="login_payload.email"
                    class="form-control"
                    type="email"
                  />
                </div>
                <span v-if="errors && errors.email" class="text-danger mt-2">{{
                  errors.email[0]
                }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Password <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="login_payload.password"
                    class="form-control"
                    type="password"
                  />
                  <span
                    v-if="errors && errors.password"
                    class="text-danger mt-2"
                    >{{ errors.password[0] }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Confirm Password <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="login_payload.password_confirmation"
                    class="form-control"
                    type="password"
                  />
                  <span
                    v-if="errors && errors.password_confirmation"
                    class="text-danger mt-2"
                    >{{ errors.password_confirmation[0] }}</span
                  >
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn small color="secondary" @click="e1 = 2">
                    Back
                  </v-btn>
                  <v-btn
                    v-if="can('company_create')"
                    small
                    :loading="loading"
                    color="primary"
                    @click="validate_user"
                  >
                    Submit
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <Preloader v-else />
  </div>
  <NoAccess v-else />
</template>

<script>
export default {
  data: () => ({
    preloader: false,
    loading: false,
    upload: {
      name: ""
    },
    company_payload: {
      name: "",
      logo: "",
      location: "",
      member_from: "",
      expiry: "",
      max_employee: "",
      max_devices: ""
    },
    contact_payload: {
      name: "",
      number: "",
      position: "",
      whatsapp: ""
    },
    login_payload: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    e1: 1,
    errors: []
  }),
  created() {
    this.preloader = false;
  },
  methods: {
    can(per) {
      let u = this.$auth.user;
      return (
        (u && u.permissions.some(e => e.name == per || per == "/")) ||
        u.is_master
      );
    },
    onpick_attachment() {
      this.$refs.attachment_input.click();
    },

    attachment(e) {
      this.upload.name = e.target.files[0] || "";
    },
    validate_company() {
      this.loading = true;
      this.errors = [];

      let payload = new FormData();
      payload.append("name", this.company_payload.name);
      payload.append("logo", this.upload.name);
      payload.append("location", this.company_payload.location);
      payload.append("member_from", this.company_payload.member_from);
      payload.append("expiry", this.company_payload.expiry);
      payload.append("max_employee", this.company_payload.max_employee);
      payload.append("max_devices", this.company_payload.max_devices);

      this.$axios
        .post("/company/validate", payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.e1 = 2;
          }
        })
        .catch(e => console.log(e));
    },
    validate_contact() {
      this.loading = true;
      this.errors = [];

      this.$axios
        .post("company/contact/validate", this.contact_payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.e1 = 3;
          }
        })
        .catch(e => console.log(e));
    },
    validate_user() {
      this.loading = true;
      this.errors = [];

      this.$axios
        .post("company/user/validate", this.login_payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.store_data();
          }
        })
        .catch(e => console.log(e));
    },

    store_data() {
      // this.loading = true;

      let payload = new FormData();

      payload.append("logo", this.upload.name);

      payload.append("company_name", this.company_payload.name);
      payload.append("location", this.company_payload.location);
      payload.append("member_from", this.company_payload.member_from);
      payload.append("expiry", this.company_payload.expiry);
      payload.append("max_employee", this.company_payload.max_employee);
      payload.append("max_devices", this.company_payload.max_devices);

      payload.append("contact_name", this.contact_payload.name);
      payload.append("number", this.contact_payload.number);
      payload.append("position", this.contact_payload.position);
      payload.append("whatsapp", this.contact_payload.whatsapp);

      payload.append("name", this.login_payload.name);
      payload.append("email", this.login_payload.email);
      payload.append("password", this.login_payload.password);
      payload.append("password_confirmation", this.login_payload.password_confirmation);



      this.$axios
        .post("/company", payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.$router.push("/companies");
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
