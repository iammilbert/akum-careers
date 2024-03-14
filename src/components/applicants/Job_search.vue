<template>
  <div class="container">
<h4 class="text-center mt-5 mb-3">Find the right job vacancies in AKUM</h4>
    <div class="input-group mb-5 d-flex align-items-center">
      <input type="text" v-model="searchQuery" @input="search" class="form-control form-control-lg" placeholder="Search by job title or keywords" aria-label="Search" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">
          <i class="bi bi-search form-control-lg"></i>
        </span>
      </div>
    </div>
    <div v-if="searchResults.length > 0">
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          <!-- Display your search results here -->
          {{ result.department }}
        </li>
      </ul>
    </div>
    <div v-else-if="searchQuery && !searching">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      searching: false,
      apiUrl: 'https://api.portal.akum.edu.ng/api/akum-career'
    }
  },
  methods: {
    search() {
      this.searching = true; // Set searching flag to true
      axios.get(this.apiUrl, {
        params: {
          q: this.searchQuery
        }
      })
      .then(response => {
        this.searchResults = response.data;
      })
      .catch(error => {
        console.error('Error searching:', error);
      })
      .finally(() => {
        this.searching = false; // Set searching flag back to false
      });
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
