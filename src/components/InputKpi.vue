<template>
  <form
    method="post"
    @submit.prevent="onSubmit(weight, objectivesValue, kpiId)"
  >
    <input v-model="weight" type="text" name="weight" placeholder="Weight" />
    <input
      v-model="objectivesValue"
      type="text"
      name="objectivesValue"
      placeholder="Value"
    />
    <select v-model="kpiId" name="kpiId">
      <option disabled value="">Choose</option>
      <option v-for="option in kpi" :value="option.id" :key="option.id">{{
        option.name
      }}</option>
    </select>
    <button type="submit">Create</button>
  </form>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "InputKpi",
  props: {
    id: Number
  },
  setup(props, context) {
    const { $store } = context.root;
    const { Kpi } = context.root.$FeathersVuex.api;
    const weight = ref();
    const objectivesValue = ref();
    const kpiId = ref("");
    const kpiParams = computed(() => {
      return {
        query: {}
      };
    });
    const { items: kpi } = useFind({
      model: Kpi,
      params: kpiParams
    });
    function onSubmit(weight, objectivesValue, kpiId) {
      $store.dispatch("kpi-campaigns-objectives/create", {
        weight: weight,
        objectivesValue: objectivesValue,
        campaignsObjectiveId: props.id,
        kpiId: kpiId
      });
    }
    return {
      onSubmit,
      weight,
      objectivesValue,
      kpiId,
      kpi
    };
  }
};
</script>
