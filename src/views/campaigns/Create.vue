<template>
  <div>
    <CreateCampaign v-if="step === 0" @idCampaign="getObjectives($event)" />
    <div
      v-for="(objective, index) in objectives.campaigns_objectives"
      :key="objective.id"
    >
      <Objective
        v-if="index + 1 === step"
        :id="objective.id"
        :idObjective="objective.objective.id"
        :idCampaign="objectives.id"
        @next="step++"
      />
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
