<template>
  <form
    method="post"
    @submit.prevent="onSubmit(weight, objectivesValue, kpiId)"
  >
    <input class="form-control" v-model="weight" type="text" name="weight" placeholder="%" />
    <input class="form-control"
      v-model="objectivesValue"
      type="text"
      name="objectivesValue"
      placeholder="Valeur de l'objectif"
    />
    <select class="form-control" v-model="kpiId" name="kpiId">
      <option disabled value="">Choisir un KPI</option>
      <option v-for="option in kpi" :value="option.id" :key="option.id">{{
        option.name
      }}</option>
    </select>
    <input type="submit" class="form-control btn btn-primary btn-lg" value="Créer" />
  </form>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "InputKpi",
  props: {
    id: Number,
    campaign: Number
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
