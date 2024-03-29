<template>
  <div class="container" style="font-family:inter">
    <div class="row">
      <!-- Job Categories -->
      <div class="col-lg-5 mb-4 mb-lg-0">
        <h4>All Jobs</h4>
        <hr>
        <!-- Category Section -->
<div class="row">
  <div class="read-more">
    <button class="btn btn-lg font-weight-bold" type="button" data-toggle="collapse" data-target="#categoryDropdown" aria-expanded="true" aria-controls="categoryDropdown" @click="toggleCollapse">
      Categories 
      <span style="margin-left:200px;">
        <i class="bi bi-caret-down-fill" style="font-size:20px;"></i>
      </span>
    </button>
    <div class="collapse" :class="{ 'show': isCollapsed }" id="categoryDropdown">
      <div class="list-group mt-2 ml-3">
        <label v-for="(category, index) in categories" :key="index" class="list-group-item custom-list-item mt-3">
          <input class="form-check-input me-2" type="checkbox" v-model="checkedCategories" :value="category">
          {{ category }}
        </label>
      </div>
    </div>
  </div>
</div>

        <!-- Schedule Section -->
        <div class="row">
          <div class="read-more">
            <button class="btn btn-lg font-weight-bold" type="button" data-toggle="collapse" data-target="#scheduleDropdown" aria-expanded="true" aria-controls="scheduleDropdown" @click="toggleScheduleCollapse">
              Schedule 
              <span style="margin-left:215px;">
                <i class="bi bi-caret-down-fill" style="font-size:20px;"></i>
              </span>
            </button>
            <div class="collapse" :class="{ 'show': isScheduleCollapsed }" id="scheduleDropdown">
              <div class="list-group mt-2 ml-3">
            <label v-for="(option, index) in scheduleOptions" :key="index" class="list-group-item custom-list-item mt-3">
              <input class="form-check-input me-2" type="checkbox" v-model="selectedSchedules" :value="option">
              {{ option }}
            </label>

              </div>
            </div>
          </div>
        </div>
      </div>

  <!-- Open Roles -->
      <div class="col-lg-7">
        <h4>Open Roles</h4>
        <div v-if="paginatedRoles.length === 0" class="alert alert-warning mt-3" role="alert">
          No jobs available
        </div>
        <div v-else>
          <div v-for="(role, index) in paginatedRoles" :key="index" class="card mt-3">
            <div class="row g-0 p-3 card-body">
              <div class="col-md-7 col-sm-12">
                <h5 style="font-size:14px"><b>{{role.faculty ? role.faculty.name :'Unkown Faculty'}}</b><br>{{role.dept ? role.dept.name : 'Unknown Department' }}</h5>
                <p>{{ role.category ? role.category.category : 'Unknown Category' }}</p>
              </div>
              <div class="col-md-5 col-sm-12">
                <div class="bg-white justify-content-between">
                  <div class="d-grid gap-2 d-md-flex d-flex justify-content-md-end justify-content-between">
                    <button class="btn mr-2 btn-sm mb-2" type="button" style="font-size:14px; background-color:#D3D1B3" @click="openModal(role)">View details</button>
                    <router-link to="/login" style="font-size:14px;" class="btn btn-outline-success mb-2" type="button">Apply Now</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

       <!-- Pagination -->
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
            </li>
            <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPage }">
              <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
            </li>
          </ul>
        </nav>
          
        </div>
      </div>
    </div>
  </div>

<!-- Modal -->
<div class="modal" tabindex="-1" role="dialog" style="font-family: inter; display: block;" v-if="showModal" :class="{ 'animate-slide-up': showModal }">
  <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document" style="margin-bottom: 0;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><b style="font-size: 30px; font-weight: 500px">
          {{ selectedRole ? selectedRole.title : '' }}
        </b><br>
        <h6 class="badge badge-success">{{ selectedRole ? selectedRole.dept.name : '' }}</h6>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="selectedRole">
          <h5>About Role </h5>
          <p>{{ selectedRole.about_role }}</p>
          <h5 class="mt-3"><strong>Responsibilities:</strong> </h5>
          <p>{{ selectedRole.responsibilities }}</p>
          <h5 class="mt-3"><strong>Requirements:</strong></h5>
          <p>{{ selectedRole.requirments }}</p>
          <p><strong>Application Closing Date:</strong> {{ formatClosingDate(selectedRole.closing_date) }}</p>
        </div>
        <div v-else>
          <p>No role selected.</p>
        </div>
      </div>
      <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="button" class="btn btn-success" @click="applyRole">Apply Now</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      scheduleOptions: ["All", "Full-time", "Contract"],
      selectedSchedules: [],
      staff: [],
      categories: [],
      checkedCategories: [],
      showModal: false,
      selectedRole: null,
      itemsPerPage: 5,
      currentPage: 1,
      isCollapsed: false,
      isScheduleCollapsed: false // Flag to track collapse state for schedule dropdown
    };
  },
computed: {
  totalPages() {
    if (Array.isArray(this.filteredRoles)) {
      return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    } else {
      return 0; // or any default value you prefer
    }
  },
  paginatedRoles() {
    if (Array.isArray(this.filteredRoles)) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredRoles.slice(startIndex, endIndex);
    } else {
      return [];
    }
  },
  filteredRoles() {
    let filtered = this.staff;

    // Filter by checked categories
    if (this.checkedCategories.length > 0) {
      filtered = filtered.filter(role => this.checkedCategories.includes(role.category.category));
    }

    // Filter by selected schedules
    if (this.selectedSchedules.length > 0 && !this.selectedSchedules.includes('All')) {
      filtered = filtered.filter(role => this.selectedSchedules.includes(role.schedule));
    }

    return filtered;
  }
},
  methods: {
    formatClosingDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      return formattedDate;
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleScheduleCollapse() {
      this.isScheduleCollapsed = !this.isScheduleCollapsed;
      if (!this.isScheduleCollapsed) {
        this.selectedSchedules = [];
      }
    },

    openModal(role) {
      this.selectedRole = role;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedRole = null;
    },
    applyRole() {
      const jobTitle = this.selectedRole ? this.selectedRole.title : '';
      const jobId = this.selectedRole ? this.selectedRole._id : '';
      console.log(`Applying for job: ${jobTitle}, ID: ${jobId}`);

      this.$router.push({
        path: '/login',
        query: {
          jobTitle: jobTitle,
          jobId: jobId
        }
      });
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    fetchData() {
      fetch('https://api.portal.akum.edu.ng/api/job/categories')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          return response.json();
        })
        .then(data => {
          this.categories = data.data.map(category => category.category);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });

      fetch('https://api.portal.akum.edu.ng/api/akum-career')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch job roles');
          }
          return response.json();
        })
        .then(data => {
          if (data && Array.isArray(data.data)) {
            this.staff = data.data;
          }
        })
        .catch(error => {
          console.error('Error fetching job roles:', error);
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>



<style scoped>
.read-more {
  padding: 10px;
}

.read-more button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.read-more button i {
  font-size: 1rem;
}

.read-more .collapse {
  margin-top: 10px;
}

/* Custom styles to remove border and lines */
.custom-list-item {
  border: none;
  border-radius: 0;
  padding: 0.5rem 1rem;
  background-color: transparent;
}

.custom-list-item:hover {
  background-color: #f8f9fa; /* Optional: Add hover effect */
}

.modal {
  display: none;
  background: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}
/* Hide vertical scrollbar while still allowing scrolling */
.col-lg-7 {
  max-height: calc(100vh - 100px); /* Adjust the max-height as needed */
  overflow-y: auto;
}

.col-lg-7::-webkit-scrollbar {
  width: 0; /* Hide scrollbar */
}

.col-lg-5 {
  max-height: calc(100vh - 100px); /* Adjust the max-height as needed */
  overflow-y: auto;
}

.col-lg-5::-webkit-scrollbar {
  width: 0; /* Hide scrollbar */
}

.row {
  display: flex;
}

@keyframes modalSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}


</style>
