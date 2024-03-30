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
      <div v-for="searchResult in searchResults" :key="searchResult._id" class="card mt-3">
        <div class="row g-0 p-3 card-body">
          <div class="col-md-7 col-sm-12">
            <h5 style="font-size: 14px;"><b>{{ searchResult.faculty.name }}</b></h5>
            <p>{{ searchResult.dept.name }}</p>
            <p>{{ searchResult.category.category }}</p>
          </div>
          
          <div class="col-md-5 col-sm-12">
            <div class="bg-white justify-content-between">
              <div class="d-grid gap-2 d-md-flex d-flex justify-content-md-end justify-content-between">
                <button class="btn mr-2 btn-sm mb-2" type="button" style="font-size:14px; background-color:#D3D1B3" @click="openModal(searchResult)">View details</button>
              
                <router-link :to="{ name: 'applicationForm', query: { department: searchResult.dept.name, job_type: searchResult.job_type, faculty: searchResult.faculty.name, jobTitle: searchResult.title, jobId: searchResult._id }}" style="font-size:14px;" class="btn btn-outline-success mb-2" type="button">Apply Now</router-link>
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
<div class="modal" tabindex="-1" role="dialog" style="font-family: inter; display: block;" v-if="showModal" :class="{ 'animate-slide-up': showModal }">
  <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document" style="margin-bottom: 0;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><b style="font-size: 30px; font-weight: 500px">
          {{ searchResult ? searchResult.title : '' }}
        </b><br>
        <h6 class="badge badge-success">{{ searchResult ? searchResult.dept.name : '' }}</h6>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="searchResult">
          <h5>About Role </h5>
          <p>{{ searchResult.about_role }}</p>
          <h5 class="mt-3"><strong>Responsibilities:</strong> </h5>
          <p>{{ searchResult.responsibilities }}</p>
          <h5 class="mt-3"><strong>Requirements:</strong></h5>
          <p>{{ searchResult.requirments }}</p>
          <p><strong>Application Closing Date:</strong> {{ formatClosingDate(searchResult.closing_date) }}</p>

          <p><strong>Date Applied:</strong> {{ formatClosingDate(searchResult.createdAt) }}</p>
        </div>
        <div v-else>
        createdAt
          <p>No role selected.</p>
        </div>
      </div>
      <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button @click="applyRole" style="font-size:14px;" class="btn btn-outline-success mb-2" type="button">Apply Now</button>
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

    openModal(searchResult) {
      this.searchResult = searchResult;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    applyRole() {
      const jobTitle = this.searchResult ? this.searchResult.title : '';
      const jobId = this.searchResult ? this.searchResult._id : '';
      const faculty = this.searchResult.faculty.name;
      const department = this.searchResult.dept.name;
      const job_type = this.searchResult.job_type;
      console.log(`Applying for job: ${jobTitle}, ID: ${jobId}`);
      this.$router.push({
        path: '/application-form',
        query: {
          jobTitle: jobTitle,
          jobId: jobId,
          faculty: faculty,
          department: department,
          job_type: job_type,
        }
      });
    },
    search: debounce(function() {
      this.searching = true;
      axios
        .get(`${this.apiUrl}${this.searchQuery}`)
        .then(response => {
          this.searchResults = response.data.data;
        })
        .catch(error => {
          console.error('Error searching:', error);
          this.searching = false;
        });
    }, 300),
  },
};
</script>
