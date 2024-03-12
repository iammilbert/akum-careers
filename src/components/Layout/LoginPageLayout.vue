<template>
  <div>
    <Nav_bar />
    <LoginForm />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_bar from '@/components/Nav_bar.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    Nav_bar,
    LoginForm,
  }
}
</script>
