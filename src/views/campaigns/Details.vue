<template>
  <div>
    <Recap :idCampaign="$route.params.id" />
  </div>
</template>
<script>
import Recap from "./../../components/Recap.vue";

export default {
  name: "Details",
  components: {
    Recap
  }
};
</script>
<style scoped>
#campagne {
  background: url("/img/detail.jpg") fixed;
  background-size: cover;
  min-height: 100vh;
}

#logo {
  position: fixed;
  top: -50px;
  left: 10px;
  width: 260px;
  height: 260px;
}

#back {
  margin-right: 10px;
  cursor: pointer;
}
.text-white {
  text-shadow: black 0.1em 0.1em 0.2em;
}
</style>
