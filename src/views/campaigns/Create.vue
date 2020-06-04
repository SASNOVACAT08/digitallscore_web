<template>
  <div id="campagne">
    <div class="container">
      <img id="logo" src="/img/DigitallScore-Logoblanc.png">
      <img id="logo2" src="/img/Logo_ResponsiveBlanc.png">
      <CreateCampaign v-if="step === 0" @idCampaign="getObjectives($event)" />
      <div v-for="(objective, index) in objectives.campaigns_objectives" :key="objective.id">
        <Objective
          v-if="index + 1 === step"
          :id="objective.id"
          :idObjective="objective.objective.id"
          :idCampaign="objectives.id"
          @next="step++"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CreateCampaign from "./../../components/CreateCampaign.vue";
import Objective from "./../../components/Objective.vue";
import { ref } from "@vue/composition-api";

export default {
  name: "Create",
  components: {
    CreateCampaign,
    Objective
  },
  setup(props, context) {
    const { Campaigns } = context.root.$FeathersVuex.api;
    const step = ref(0);
    const objectives = ref({});

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
  width: 100vw;
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
#logo2{
  position: relative;
  width: 260px;
  visibility: hidden;
  display: none; 
}

  @media all and (max-width: 1023px) {
#campagne {
  background: linear-gradient(rgba(30, 30, 30, 0.666), rgba(30, 30, 30, 0.666)), url("/img/campagne2.jpg");
  height: 190vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
}

#logo{
visibility: hidden;
}
#logo2{
  visibility: visible;
  display: block;
  margin: auto;
}





}

</style>