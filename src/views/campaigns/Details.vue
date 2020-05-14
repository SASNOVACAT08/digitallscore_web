<template>
  <div>
    <div v-if="campaigns">
      <br>
      <p>Nom de la campagne : {{ campaigns.name }}</p>
      <br>
      <p>Produit : {{ campaigns.product }}</p>
      <br>
      <p>Annonceur : {{ campaigns.advertiser }}</p>
      <br>
      <p>Budget : {{ campaigns.budget }}</p>
      <br>
      <p>Debug : {{ campaigns }}</p>
      <br>
      <div
        v-for="objective in campaigns.campaigns_objectives"
        :key="objective.id"
      >
        <h2>{{ objective.objective.name }}</h2>
        <div v-for="kpi in objective.kpi_campaigns_objectives" :key="kpi.id">
          <span>{{ kpi.kpi.name }} </span>
          <span>{{ kpi.weight }} </span>
          <span>{{ kpi.objectivesValue }} </span>
        </div>
        <InputKpi :id="objective.id" :campaign="campaigns.id" />
      </div>
    </div>
    <div v-else-if="isPending">Loading</div>
    <div v-else>Post not found.</div>
  </div>
</template>
<script>
import InputKpi from "../../components/InputKpi.vue";
import { useGet } from "feathers-vuex";

export default {
  name: "Details",
  components: {
    InputKpi
  },
  setup(props, context) {
    const { $route } = context.root;
    const { Campaigns } = context.root.$FeathersVuex.api;
    const { item: campaigns, isPending } = useGet({
      model: Campaigns,
      id: $route.params.id
    });
    return {
      campaigns,
      isPending
    };
  }
};
</script>
