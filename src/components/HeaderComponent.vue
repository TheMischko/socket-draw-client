<style scoped>
  .header-wrapper{

  }
  .logo-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>

<template>
<div class="header-wrapper">
  <div class="logo-wrapper">
    <LogoIcon/>
    <h1>Paint.io</h1>
  </div>

</div>
</template>

<script>
import LogoIcon from "@/assets/Icon/LogoIcon";
export default {
  name: "HeaderComponent",
  components: {
    LogoIcon
  }
}
</script>