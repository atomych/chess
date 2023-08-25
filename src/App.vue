<template>
  <router-view />
</template>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
}

#app {
  height: 100vh;
}
</style>

<script>
export default {
  name: "App",

  created() {
    this.$router.push({ name: "home" });
  },
};
</script>
