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
