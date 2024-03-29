<template>
  <div class="container mb-5" style="font-family: inter">
    <div class="input-group mb-3 mt-5">
      <div class="text-center">
        <h1>Available Opportunities</h1>
      </div>
    </div>
    <div class="input-group mb-5 d-flex align-items-center">
      <input
        type="text"
        v-model="searchQuery"
        @input="search"
        class="form-control form-control-lg"
        placeholder="Search by job title or keywords"
        aria-label="Search"
        aria-describedby="basic-addon2"
        style="height: 60px;"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2" style="height: 60px;">
          <i class="bi bi-search form-control-lg"></i>
        </span>
      </div>
    </div>
    <div v-if="searchResults && searchResults.length > 0">
      <div v-for="result in searchResults" :key="result._id" class="card mt-3">
        <div class="row g-0 p-3 card-body">
          <div class="col-7">
            <h5 style="font-size: 14px;"><b>{{ result.faculty.name }}</b></h5>
            <p>{{ result.department }}</p>
            <p>{{ getCategoryName(result.category) }}</p>
          </div>
          <div class="col-5">
            <div class="modal-footer bg-white">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  class="btn mr-3 btn-sm mb-2"
                  type="button"
                  style="font-size: 14px; background-color: #D3D1B3"
                  @click="openModal(result)"
                >
                  View details
                </button>
                <button style="font-size: 14px;" type="button" class="btn btn-success mb-2" @click="applyChanges(result)">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="searchQuery && !searching">
      <p>No results found.</p>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }" style="display: block;" v-if="showModal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <b style="font-size: 34px;">{{ selectedResult ? selectedResult.title : '' }}</b><br />
            <h6 class="badge badge-success">{{ selectedResult ? selectedResult.department.name : '' }}</h6>
          </h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5><strong>About Role</strong></h5>
          <p>{{ selectedResult ? selectedResult.about_role : '' }}</p>
          <h5><strong>Responsibilities:</strong></h5>
          <p>{{ selectedResult ? selectedResult.responsibilities : '' }}</p>
          <h5 class="mt-3"><strong>Requirements:</strong></h5>
          <p>{{ selectedResult ? selectedResult.requirements : '' }}</p>
          <h5 class="mt-3"><strong>Application Closing Date</strong></h5>
          <p>{{ formatClosingDate(selectedResult ? selectedResult.closing_date : '') }}</p>
          <h5 class="mt-3"><strong>Method of Application</strong></h5>
          <p></p>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-success" @click="applyChanges(selectedResult)">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  data() {
    return {
      showModal: false,
      selectedResult: null,
      searchQuery: '',
      searchResults: [],
      searching: false,
      apiUrl: 'https://api.portal.akum.edu.ng/api/akum-career/search/',
      categoryData: {}
    };
  },
  methods: {
    formatClosingDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
    openModal(result) {
      this.selectedResult = result;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    applyChanges(result) {
      if (result) {
        const { title, department, category: faculty, _id: jobId } = result;
        this.$router.push({
          path: '/login',
          query: { jobTitle: title, department, faculty: this.getCategoryName(faculty), jobId },
        });
      }
    },
    search: debounce(function() {
      this.searching = true;
      axios
        .get(`${this.apiUrl}${this.searchQuery}`)
        .then(response => {
          this.searchResults = response.data;
          this.fetchCategoryData();
          console.log('data', this.searchResults);
        })
        .catch(error => {
          console.error('Error searching:', error);
          this.searching = false;
        });
    }, 300),
fetchCategoryData() {
  if (this.searchResults && this.searchResults.length > 0) {
    const categoryIds = Array.from(new Set(this.searchResults.map(result => result.category)));
    categoryIds.forEach(categoryId => {
      if (!this.categoryData[categoryId]) {
        axios
          .get(`https://api.portal.akum.edu.ng/api/job/categories/${categoryId}`)
          .then(response => {
            this.$set(this.categoryData, categoryId, response.data.category);
          })
          .catch(error => {
            console.error('Error fetching category data:', error);
          });
      }
    });
  }
  this.searching = false;
},

    getCategoryName(categoryId) {
      const category = this.categoryData[categoryId];
      return category ? category.category : 'Fetching...';
    },
  },
};
</script>
