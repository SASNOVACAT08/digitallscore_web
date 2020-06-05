<template>
  <div id="campagne">
    <div class="container">
      <CreateCampaign v-if="step === 0" @idCampaign="getObjectives($event)" />
      <div v-for="(objective, index) in objectives.campaigns_objectives" :key="objective.id">
        <Objective v-if="index + 1 === step" :id="objective.id" @next="step++" />
      </div>
      <Recap v-if="step === objectives.campaigns_objectives.length + 1" :idCampaign="objectives.id" />
    </div>
  </div>
</template>
<script>
import CreateCampaign from "./../../components/CreateCampaign.vue";
import Recap from "./../../components/Recap.vue";
import Objective from "./../../components/Objective.vue";
import { ref } from "@vue/composition-api";

export default {
  name: "Create",
  components: {
    CreateCampaign,
    Objective,
    Recap
  },
  setup(props, context) {
    const { Campaigns } = context.root.$FeathersVuex.api;
    const step = ref(0);
    const objectives = ref({
      campaigns_objectives: [""]
    });
    function getObjectives(idCampaign) {
      Campaigns.get(idCampaign).then(data => (objectives.value = data));
      step.value = 1;
    }
    return {
      getObjectives,
      objectives,
      step
    };
  }
};
</script>
<style scoped>
#campagne {
  background: linear-gradient(rgba(30, 30, 30, 0.666), rgba(30, 30, 30, 0.666)), url("/img/campagne2.jpg");
  height: 100vh;
  background-size: cover;
  background-position: center;
}
#logo{
  position: absolute;
  top: -50px;
  left: 10px;
  width: 260px;
  height: 260px;
}


</style>