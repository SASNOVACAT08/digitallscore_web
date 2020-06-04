<template>
  <div>
    <form method="post" @submit.prevent="onSubmit(weight, budgetPart)">
      <input v-model="weight" type="text" name="weight" placeholder="Weight" />
      <input
        v-model="budgetPart"
        type="text"
        name="budgetPart"
        placeholder="Value"
      />
      <button type="submit">Change Objective</button>
    </form>
    <InputKpi :id="id" />
    <div
      v-for="kpiCampaignsObjective in kpiCampaignsObjectives"
      :key="kpiCampaignsObjective.id"
    >
      <span>{{ kpiCampaignsObjective.weight }} </span>
      <span>{{ kpiCampaignsObjective.objectivesValue }} </span>
      <span>{{ kpiCampaignsObjective.kpiId }} </span>
    </div>

    <button @click="next()">Next</button>
  </div>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";
import InputKpi from "./InputKpi.vue";

export default {
  name: "Objective",
  props: {
    id: Number
  },
  components: {
    InputKpi
  },
  setup(props, context) {
    const { $store } = context.root;
    const { KpiCampaignsObjectives } = context.root.$FeathersVuex.api;
    const kpiCampaignsObjectivesParams = computed(() => {
      return {
        query: {
          campaignsObjectiveId: props.id
        }
      };
    });
    const kpiCampaignsObjectivesData = useFind({
      model: KpiCampaignsObjectives,
      params: kpiCampaignsObjectivesParams
    });
    const weight = ref();
    const budgetPart = ref();
    function onSubmit(weight, budgetPart) {
      $store.dispatch("campaigns-objectives/patch", [
        props.id,
        {
          weight,
          budgetPart
        }
      ]);
    }

    function next() {
      context.emit("next");
    }

    return {
      weight,
      budgetPart,
      onSubmit,
      next,
      kpiCampaignsObjectives: kpiCampaignsObjectivesData.items
    };
  }
};
</script>
