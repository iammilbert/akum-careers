<template>
  <div style="font-family:inter">
    <Nav_bar />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '@/components/Nav_bar.vue';

export default {
  components: {
    Nav_bar
  }
}
</script>
