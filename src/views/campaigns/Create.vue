<template>
  <div>
    <CreateCampaign v-if="step === 0" @idCampaign="getObjectives($event)" />
    <div
      v-for="(objective, index) in objectives.campaigns_objectives"
      :key="objective.id"
    >
      <Objective v-if="index + 1 === step" :id="objective.id" @next="step++" />
    </div>
    <Recap
      v-if="step === objectives.campaigns_objectives.length + 1"
      :idCampaign="objectives.id"
    />
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
