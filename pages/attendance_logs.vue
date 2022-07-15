<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="6">
        <h3>Attendance Logs</h3>
        <div>Dashboard / Attendance Logs</div>
      </v-col>
      <v-col cols="6">
        <div class="text-right">
          <v-btn small color="primary" class="mb-2" @click="fetch_logs"
            >Fetch Logs</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <!-- <v-select
          @change="getDataFromApi(`attendance_logs_by_company/${company_id}`)"
            outlined
            v-model="company_id"
            dense
            placeholder="Logs By Company"
            :items="companies"
            item-value="id"
            item-text="name"
          ></v-select> -->
        <v-data-table
          :headers="headers"
          :items="data"
          :options.sync="options"
          :server-items-length="total"
          :loading="loading"
          :footer-props="{ 'items-per-page-options': [5, 10, 30, 50, 100] }"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="">
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-text-field
                @input="searchIt"
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "UserID", value: "UserID" },
        { text: "LogTime", value: "LogTime" },
        { text: "DeviceID", value: "DeviceID" },
        { text: "SerialNumber", value: "SerialNumber" }
      ],
      company_id: "",
      companies: [],
      data: [],
      title: `Attendance Logs`,
      endpoint: "attendance_logs",
      ids: [],
      data: [],
      search: "",
      loading: false,
      page: 1,
      total: 0,

      page_options: {},

      options: {
        per_page: 5
      },
      pagination: {}
    };
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    }
  },

  async created() {
    this.getDataFromApi();
    this.getCompanies();
  },

  methods: {
    getCompanies() {

      this.loading = true;
      this.$axios
        .get(`company/list`)
        .then(({ data }) => {
          data.unshift({id : "0",name:"Select Company"})
          this.companies = data;
          this.loading = false;
        });

    },
    fetch_logs() {
      this.loading = true;
      this.$axios
        .post(this.endpoint, { params: this.options })
        .then(({ data }) => {
          this.getDataFromApi();
          this.loading = false;
        });
    },
    searchIt(e) {
      if (e.length == 0) {
        this.getDataFromApi();
      } else if (e.length > 2) {
        this.getDataFromApi(`${this.endpoint}/search/${e}`);
      }
    },

    getDataFromApi(url = this.endpoint) {
      this.loading = true;

      const { page, itemsPerPage } = this.options;

      this.$axios
        .get(`${url}?page=${page}`, { params: { per_page: itemsPerPage } })
        .then(({ data }) => {
          this.data = data.data;
          this.total = data.total;
          this.loading = false;
        });
    }
  }
};
</script>
