<template>
  <div style="font-family:inter">
    <Nav_bar />
    <Landing_page_header />
    <Job_search />
    <Landing_page_jobs />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '../Nav_bar.vue';
import Landing_page_header from '../Landing_page_header.vue';
import Job_search from '../Job_search.vue';
import Landing_page_jobs from '../Landing_page_jobs.vue';

export default {

  components: {
    Nav_bar,
    Landing_page_header,
    Job_search,
    Landing_page_jobs,
  }
}
</script>
