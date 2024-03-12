<template>
  <div>
    <Nav_bar />
    <Landing_page_header />
    <Landing_page_search />
    <JobDescriptionModal />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '../Nav_bar.vue';
import Landing_page_header from '../Landing_page_header.vue';
import Landing_page_search from '../Landing_page_search.vue';
import JobDescriptionModal from '@/components/JobDescriptionModal.vue';

export default {

  components: {
    Nav_bar,
    Landing_page_header,
    Landing_page_search,
    JobDescriptionModal
  }
}
</script>
