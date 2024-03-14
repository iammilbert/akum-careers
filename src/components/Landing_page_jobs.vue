<template>
  <div class="container">
    <div class="row">
      <!-- Job Categories -->
      <div class="col-lg-5 mb-4 mb-lg-0">
        <h4>All Jobs</h4>
        <hr>
        <div class="read-more">
          <button class="btn btn-lg" type="button" data-toggle="collapse" data-target="#categoryDropdown" aria-expanded="true" aria-controls="categoryDropdown" @click="toggleCollapse">
            Categories <i class="bi bi-caret-down-fill" style="font-size:20px;"></i>
          </button>
          <div class="collapse" :class="{ 'show': isCollapsed }" id="categoryDropdown">
            <div class="list-group mt-2">
              <label v-for="(category, index) in categories" :key="index" class="list-group-item custom-list-item mt-3">
                <input class="form-check-input me-2" type="checkbox" v-model="checkedCategories" :value="category">
                {{ category }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Open Roles -->
      <div class="col-lg-7">
        <h4>Open Roles</h4>
        <div v-for="(role, index) in paginatedRoles" :key="index" class="card mt-3">
          <div class="row g-0 p-3 card-body">
            <div class="col-7">
              <h5 style="font-size:14px"><b>{{ role.faculty }}</b><br>{{ role.about_role }}</h5>
              <p>{{ role.department }}</p>
            </div>
            <div class="col-5">
              <div class="modal-footer bg-white">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn mr-2 btn-sm" type="button" style="font-size:14px; background-color:#D3D1B3" @click="openModal(role)">View details</button>
                  <router-link to="/application-form" style="font-size:14px;" class="btn btn-outline-success" type="button">Apply Now</router-link>
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

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedRole ? selectedRole.category : 'Role Details' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedRole">
            <h5>{{ selectedRole.title }}</h5>
            <p>{{ selectedRole.about_role }}</p>
            <p><strong>Responsibilities:</strong> {{ selectedRole.responsibilities }}</p>
            <p><strong>Requirements:</strong> {{ selectedRole.requirments }}</p>
            <p><strong>Closing Date:</strong> {{ selectedRole.closing_date }}</p>
          </div>
          <div v-else>
            <p>No role selected.</p>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-success" @click="applyChanges">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staff: [], // Contains job roles data
      categories: [], // Contains categories data
      checkedCategories: [], // Stores selected categories
      showModal: false, // Controls modal visibility
      selectedRole: null, // Stores selected role for modal display
      itemsPerPage: 4, // Number of items per page
      currentPage: 1, // Current page number
      isCollapsed: true // Flag to track collapse state for category dropdown
    };
  },
  computed: {
    // Total pages based on filtered roles and items per page
    totalPages() {
      return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    },
    // Paginated roles based on current page and items per page
    paginatedRoles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredRoles.slice(startIndex, endIndex);
    },
    // Filtered roles based on checked categories
    filteredRoles() {
      if (this.checkedCategories.length === 0) {
        return this.staff;
      } else {
        return this.staff.filter(role => this.checkedCategories.includes(role.category));
      }
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    openModal(role) {
      this.selectedRole = role;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedRole = null; // Reset selected role
    },
    applyChanges() {
      // Navigate to application form page or perform other actions
      this.$router.push('/application-form');
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
      // Fetch categories
      fetch('category_api_url')
        .then(response => response.json())
        .then(data => {
          // Extract category names
          this.categories = data.categories;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });

      // Fetch job roles
      fetch('https://api.portal.akum.edu.ng/api/akum-career')
        .then(response => response.json())
        .then(data => {
          // Assign fetched job roles to staff data property
          this.staff = data.staff;
        })
        .catch(error => {
          console.error('Error fetching job roles:', error);
        });
    }
  },
  created() {
    // Fetch data when component is created
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
</style>
