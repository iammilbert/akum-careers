<template>
  <div style="font-family:inter">
    <Nav_bar />
    <ResetPassword />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '@/components/Nav_bar.vue';
import ResetPassword from '@/components/ResetPassword.vue';

export default {
  components: {
    Nav_bar,
    ResetPassword,
  }
}
</script>
