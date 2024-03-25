<template>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }" style="font-family:inter">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedRole ? selectedRole.category : 'Role Details' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedRole">
            <h5><strong>Title:</strong>{{ selectedRole.title }}</h5>
            <h5>Job Brief </h5>
            <p>{{ selectedRole.about_role }}</p>
            We are looking for an Accountant to lead our accounting team,manage all financial transactions, from  payments and variable expenses to bank deposits and budgets .

            The Accountant responsibilities include auditing financial documents and procedures, reconciling bank statements and calculating tax payments and returns. To be successful in this role, you should have previous hands on experience with bookkeeping and Accounting ,a  flair for spotting numerical mistakes and analysing records.

            Ultimately, you will provide us with accurate quantitative information on financial position, liquidity and cash flows of our business, while ensuring we’re compliant with all tax regulations.
            <h5><strong>Responsibilities:</strong> </h5>
            <p>{{ selectedRole.responsibilities }}</p>
            <h5><strong>Requirements:</strong></h5>
            <p>{{ selectedRole.requirments }}</p>
            <p><strong>Closing Date:</strong> {{ formatClosingDate(selectedRole.closing_date) }}</p>
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
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    selectedRole: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    applyChanges() {
      this.$emit('apply');
    },
    formatClosingDate(date) {
      // Add your date formatting logic here
      return date;
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
