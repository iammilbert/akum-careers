<template>
  <div class="container">
    <h3 class="mt-5">My Applications</h3>
    <hr>
    <div v-if="loading" class="text-center">
      <i class="fas fa-spinner fa-spin"></i> <!-- Font Awesome spinning icon -->
    </div>

    <div v-else-if="roles.length === 0" class="text-center">No Applcation found. <input v-model="user_id" type="hidden" /></div>
    
    <div v-else class="row">
      <div class="col-md-8 mb-4">
        <div v-for="(role, index) in paginatedRoles" :key="index" class="card mt-3">
          <div class="row g-0 p-3 card-body">
              <div class="col-7">
                <h5 style="font-size:14px"><b>{{role.employment_type ? role.employment_type :'Unkown Faculty'}}</b><br>{{role.firstname ? role.firstname : 'Unknown Department' }}</h5>
                <p>{{ role.degree ? role.degree : 'Unknown Category' }}</p>
              </div>
            <div class="col-5">
              <div class="modal-footer bg-white">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn mr-2 btn-sm" type="button" style="font-size:12px; background-color:#D3D1B3" @click="openModal(role)">View details</button>
                  <h6 v-if="role.status === 'Approve'" style="color:#00C000; font-size:14px;" class="btn btn-sm" type="button">{{role.status}}</h6>
                  <h6 v-if="role.status === 'Pending'" style="color:#D3D1B3; font-size:14px;" class="btn text-dark" type="button">{{ role.status }}</h6>
                 <h6 v-else style="color:#D3D1B3; font-size:14px;" class="btn text-dark"  type="button">Pending</h6>
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

      <div class="col-md-4">

      </div>
    </div>
  </div>

  <p class="mt-5"></p>

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><b style="font-size:30px; font-weight:500px">
            {{ selectedRole ? selectedRole.firstname  : '' }}
          </b><br>
          <h6 class="badge badge-success">{{ selectedRole ? selectedRole.email : '' }}</h6>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedRole">
            <h5>About Role </h5>
            <p>{{ selectedRole.discipline }}</p>
            <h5 class="mt-3"><strong>Responsibilities:</strong> </h5>
            <p>{{ selectedRole.degree }}</p>
            <h5 class="mt-3"><strong>Requirements:</strong></h5>
            <p>{{ selectedRole.lastname }}</p>
            <p><strong>Application Closing Date:</strong> {{ formatClosingDate(selectedRole.phone_number) }}</p>
          </div>
          <div v-else>
            <p>No role selected.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      loading: true,
      pageSize: 5,
      currentPage: 1,
      showModal: false,
      selectedRole: null,
      user_id: localStorage.getItem('user_id'),
    };
  },
  created() {
    this.fetchUserRoles();
  },
  computed: {
    paginatedRoles() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.roles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.roles.length / this.pageSize);
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
    fetchUserRoles() {
    const token = localStorage.getItem('token');
      if (!token) {
          console.error('Token not found in local storage');
          return;
        }
    const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      fetch(`https://api.portal.akum.edu.ng/api/akum/career/applicant/${this.user_id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Assuming data.jobApplication is the array of roles
            this.roles = data.data;
            this.loading = false;
          } else {
            console.error('Job application retrieval failed:', data.message);
            this.loading = false;
          }
        })
        .catch(error => {
          console.error('Error fetching user roles:', error);
          this.loading = false;
        });
    },

    openModal(role) {
      this.selectedRole = role;
      this.showModal = true;
    },
    closeModal() {
      this.selectedRole = null;
      this.showModal = false;
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
    changePage(pageNumber) {
      this.currentPage = pageNumber;
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

.modal {
  display: none;
  background: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}
</style>
