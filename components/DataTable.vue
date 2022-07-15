<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :server-items-length="total"
    :loading="loading"
    :options.sync="options"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15]
    }"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar dark class="gradient-custom-2"> Lattest Companies </v-toolbar>

      <v-toolbar flat>
        <v-toolbar-title>List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          @input="searchIt"
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon color="secondary" small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon color="error" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: ["title", "headers", "endpoint"],
  data() {
    return {
      options: {},
      total: 0,
      ids: [],
      data: [],
      search: "",
      loading: false
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
  created() {
     this.getDataFromApi();
  },
  methods: {
    getDataFromApi(url = this.endpoint) {
      this.loading = true;

      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let options = {
        params: {
          per_page: itemsPerPage
        }
      };

      this.$axios.get(`${url}?page=${page}`, options).then(({ data }) => {
        let items = data.data;

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = this.sorting(items, sortBy, sortDesc);
        }

        this.data = items;
        this.total = data.total;
        this.loading = false;
      });
    },
    sorting(items, sortBy, sortDesc) {
      return items.sort((a, b) => {
        const sortA = a[sortBy[0]];
        const sortB = b[sortBy[0]];

        if (sortDesc[0]) {
          if (sortA < sortB) return 1;
          if (sortA > sortB) return -1;
          return 0;
        } else {
          if (sortA < sortB) return -1;
          if (sortA > sortB) return 1;
          return 0;
        }
      });
    },
    searchIt(e) {
      if (e.length == 0) {
        this.getDataFromApi();
      } else if (e.length > 2) {
        this.getDataFromApi(`${this.endpoint}/search/${e}`);
      }
    }
  }
};
</script>
