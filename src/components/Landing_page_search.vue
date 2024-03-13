<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div class="text-center">
        <h1>Available Opportunities</h1>
      </div>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control form-control-lg" placeholder="Search by job title or keywords" aria-label="Search" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">
          <i class="bi bi-search form-control-lg"></i>
        </span>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
  <div class="col-lg-5 mb-4 mb-lg-0">
    <h4>All Jobs</h4>
    <hr>
    <div class="read-more">
      <button class="btn btn-lg" type="button" data-toggle="collapse" data-target="#categoryDropdown" aria-expanded="true" aria-controls="categoryDropdown" @click="toggleCollapse">
        Categories <i class="bi bi-caret-down-fill" style="font-size:20px;"></i>
      </button>
      <div class="collapse" :class="{ 'show': isCollapsed }" id="categoryDropdown">
        <div class="list-group mt-2">
          <label v-for="(item, index) in items" :key="index" class="list-group-item custom-list-item mt-3">
            <input class="form-check-input me-2" type="checkbox" v-model="checkedItems" :value="item.id">
            {{ item.name }}
          </label>
        </div>
      </div>
    </div>
  </div>

      <div class="col-lg-7">
        <h4>Open Roles</h4>
<div v-for="(role, index) in paginatedRoles" :key="index" class="card mt-3">
          <div class="row g-0 p-3 card-body">
          <div class="col-7">
            <h5 style="font-size:14px"><b>{{ role.title }}</b><br>{{ role.details }}</h5>{{ role.department }}
          </div>
            <div class="col-5">
              <div class="modal-footer bg-white">
                 <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                   <button class="btn mr-2 btn-sm" type="button" style="font-size:14px; background-color:#D3D1B3">View details</button>
                   <button style="font-size:14px;" class="btn btn-outline-success" type="button">Apply Now</button>
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

  <p class="mt-5"></p>
</template>

<script>
export default {
  data() {
    return {
      checkedItems: [],
      isCollapsed: true, // Flag to track collapse state
      items: [
        { id: 1, name: 'All' },
        { id: 2, name: 'Administration' },
        { id: 3, name: 'Academics' },
        { id: 4, name: 'Non-Academics' },
        { id: 5, name: 'Research' },
        { id: 6, name: 'Security' },
        { id: 7, name: 'Finance' },
        { id: 8, name: 'ICT' },
      ],
     openRoles: [
        { title: 'Faculty Affairs Administrator 1', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        { title: 'Faculty Affairs Administrator 2', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        { title: 'Research Assistant', details: 'School of Continuing Education, AKUM', department: 'Research' },
        { title: 'Maintenace Mechanic Apprentice', details: 'School of Continuing Education, AKUM', department: 'Facilities' },
        { title: 'Faculty Affairs Administrator 3', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        { title: 'Faculty Affairs Administrator 4', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        { title: 'Research Assistant', details: 'School of Continuing Education, AKUM', department: 'Research' },
        { title: 'Faculty Affairs Administrator 5', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        { title: 'Faculty Affairs Administrator 5', details: 'School of Continuing Education, AKUM', department: 'Adminstration' },
        // Add more roles as needed
      ],
      itemsPerPage: 4,
      currentPage: 1
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.openRoles.length / this.itemsPerPage);
    },
    paginatedRoles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.openRoles.slice(startIndex, endIndex);
    }
  },
  methods: {
      toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
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
    }
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
</style>
