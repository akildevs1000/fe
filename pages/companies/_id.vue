<template>
  <div v-if="can('company_access')">
    <div v-if="!preloader">
      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
          top="top"
          color="secondary"
          elevation="24"
        >
          {{ response }}
        </v-snackbar>
      </div>
      <v-row class="mt-5 mb-10">
        <v-col cols="10">
          <h3>Company</h3>
          <div>Dashboard / Company / Edit</div>
        </v-col>
        <v-col cols="2">
          <div class="display-1 pa-2 text-right">
            <v-btn small class="primary" :to="`/companies`">
              <v-icon small>mdi-arrow-left</v-icon>&nbsp;Back
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-tabs color="primary">
              <v-tab>
                <v-icon>
                  mdi-domain
                </v-icon>
              </v-tab>
              <v-tab>
                <v-icon>
                  mdi-account
                </v-icon>
              </v-tab>

              <v-tab>
                <v-icon>
                  mdi-earth
                </v-icon>
              </v-tab>
              <v-tab>
                <v-icon>
                  mdi-lock
                </v-icon>
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label">Company Name</label>
                          <span class="text-danger">*</span>
                          <input
                            readonly
                            v-model="company_payload.name"
                            class="form-control"
                            type=""
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
                          <label class="col-form-label">Company Email</label>
                          <span class="text-danger">*</span>
                          <input
                            readonly
                            v-model="user_payload.email"
                            class="form-control"
                            type=""
                          />
                          <span
                            v-if="errors && errors.email"
                            class="text-danger mt-2"
                            >{{ errors.email[0] }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label">Member From</label>
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
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Max Branches
                            <span class="text-danger">*</span></label
                          >
                          <input
                            v-model="company_payload.max_branches"
                            type="number"
                            class="form-control"
                          />
                          <span
                            v-if="errors && errors.max_branches"
                            class="text-danger mt-2"
                            >{{ errors.max_branches[0] }}</span
                          >
                        </div>
                      </div>

                      <div class="col-sm-4">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Max Employees
                            <span class="text-danger">*</span></label
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

                      <div class="col-sm-4">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Max Devices
                            <span class="text-danger">*</span></label
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

                      <div class="col-sm-3">
                        <div class="form-group">
                          <v-card class="ml-1 mr-1">
                            <div class="pa-5">
                              <v-img
                                @click="onpick_attachment"
                                style="width:150px; height:150px; margin:0 auto; border-radius:50%;"
                                :src="
                                  previewImage ||
                                    company_payload.logo ||
                                    '/no-image.png'
                                "
                              ></v-img>
                            </div>
                            <v-btn
                              style="width:100%;"
                              @click="onpick_attachment"
                              >{{
                                !upload.name ? "Upload Logo" : "Logo Uploaded"
                              }}
                              <v-icon right dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                          </v-card>

                          <input
                            required
                            type="file"
                            @change="attachment"
                            style="display: none"
                            accept="image/*"
                            ref="attachment_input"
                          />

                          <span
                            v-if="errors && errors.logo"
                            class="text-danger mt-2"
                            >{{ errors.logo[0] }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <v-row>
                      <v-col cols="12">
                        <div class="text-right">
                          <v-btn
                            v-if="can('company_edit')"
                            small
                            :loading="loading"
                            color="primary"
                            @click="update_company"
                          >
                            Submit
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Contact Person Name
                          </label>
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
                          <label class="col-form-label"
                            >Contact Person Number
                          </label>
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
                          <label class="col-form-label"
                            >Contact Person Position
                          </label>
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
                          <label class="col-form-label"
                            >Contact Person Whatsapp
                          </label>
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
                          <v-btn
                            v-if="can('company_edit')"
                            small
                            :loading="loading"
                            color="primary"
                            @click="update_contact"
                          >
                            Submit
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Lat <span class="text-danger">*</span></label
                          >
                          <input
                            v-model="geographic_payload.lat"
                            type="number"
                            class="form-control"
                          />
                          <span
                            v-if="errors && errors.lat"
                            class="text-danger mt-2"
                            >{{ errors.lat[0] }}</span
                          >
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Lon <span class="text-danger">*</span></label
                          >
                          <input
                            v-model="geographic_payload.lon"
                            type="number"
                            class="form-control"
                          />
                          <span
                            v-if="errors && errors.lon"
                            class="text-danger mt-2"
                            >{{ errors.lon[0] }}</span
                          >
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="col-form-label">Location </label>
                          <textarea
                            v-model="geographic_payload.location"
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
                            v-if="can('company_edit')"
                            small
                            :loading="loading"
                            color="primary"
                            @click="update_geographic"
                          >
                            Submit
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Password</label
                          >
                          <input
                            v-model="user_payload.password"
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
                            >Confirm Password
                          </label>
                          <input
                            v-model="user_payload.password_confirmation"
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
                          <v-btn
                            v-if="can('company_edit')"
                            small
                            :loading="loading"
                            color="primary"
                            @click="update_user"
                          >
                            Submit
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <Preloader v-else />
  </div>
  <NoAccess v-else />
</template>

<script>
export default {
  data: () => ({
    id: "",
    loading: false,
    preloader: true,
    upload: {
      name: ""
    },

    company_payload: {
      name: "",
      logo: "",
      member_from: "",
      expiry: "",
      max_branches: "",
      max_employee: "",
      max_devices: ""
    },
    contact_payload: {
      name: "",
      number: "",
      position: "",
      whatsapp: ""
    },
    user_payload: {
      password: "",
      password_confirmation: ""
    },
    geographic_payload: {
      lat: "",
      lon: "",
      location: ""
    },
    e1: 1,
    errors: [],
    previewImage: null,
    data: {},
    response: "",
    snackbar: false
  }),
  async created() {
    this.getDataFromApi();
  },
  methods: {
    can(per) {
      let u = this.$auth.user;
      return (
        (u && u.permissions.some(e => e.name == per || per == "/")) ||
        u.is_master
      );
    },
    getDataFromApi() {
      this.id = this.$route.params.id;
      this.$axios.get(`company/${this.id}`).then(({ data }) => {
        let r = data.record;
        this.company_payload = r;
        this.contact_payload = r.contact;
        this.user_payload = r.user;

        let mf = this.formatted_date(r.member_from);
        let exp = this.formatted_date(r.expiry);
        this.company_payload.member_from = mf;
        this.company_payload.expiry = exp;

        this.geographic_payload = {
          lat : this.company_payload.lat,
          lon : this.company_payload.lon,
          location : this.company_payload.location,
        }
        this.preloader = false;
      });
    },

    formatted_date(v) {
      let [year, month, date] = v.split("/");
      return `${year}-${month}-${date}`;
    },
    onpick_attachment() {
      this.$refs.attachment_input.click();
    },

    attachment(e) {
      this.upload.name = e.target.files[0] || "";

      let input = this.$refs.attachment_input;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    update_company() {
      let payload = new FormData();

      payload.append("name", this.company_payload.name);
      if (this.upload.name) {
        payload.append("logo", this.upload.name);
      }
      payload.append("location", this.company_payload.location);
      payload.append("member_from", this.company_payload.member_from);
      payload.append("expiry", this.company_payload.expiry);
      payload.append("max_employee", this.company_payload.max_employee);
      payload.append("max_branches", this.company_payload.max_branches);
      payload.append("max_devices", this.company_payload.max_devices);

      this.start_process(`/company/${this.id}/update`, payload, `Company`);
    },
    update_contact() {
      this.start_process(
        `/company/${this.id}/update/contact`,
        this.contact_payload,
        `Contact`
      );
    },
    update_geographic() {
      this.start_process(
        `/company/${this.id}/update/geographic`,
        this.geographic_payload,
        `Geographic Info`
      );
    },
    update_user() {
      this.start_process(
        `/company/${this.id}/update/user`,
        this.user_payload,
        `User`
      );
    },
    start_process(url, payload, model) {
      this.loading = true;

      this.$axios
        .post(url, payload)
        .then(({ data }) => {
          this.loading = false;

          if (!data.status) {
            this.errors = data.errors;
          } else {
            this.snackbar = true;
            this.response = model + " updated successfully";
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
