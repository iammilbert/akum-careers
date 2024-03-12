<!-- ModalForm.vue -->
<template>
  <b-modal id="jobModal" title="Job Details" @hide="resetForm">
    <div style="max-height: 400px; overflow-y: auto;">
      <b-form-group label="Job Title:">
        <p></p>
      </b-form-group>

      <b-form-group label="Details:">
        <p></p>
      </b-form-group>

      <b-form-group label="Department:">
        <p></p>
      </b-form-group>
    </div>

    <b-button variant="primary" @click="applyForJob">Apply Now</b-button>
  </b-modal>
</template>

<script>
export default {
  props: {
    jobDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    applyForJob() {
      // Handle apply for job action
      console.log('Applying for job:', this.jobDetails);

      // Reset the form fields if needed
      this.resetForm();
    },
    resetForm() {
      // Reset any form fields if needed
    }
  },
}
</script>
