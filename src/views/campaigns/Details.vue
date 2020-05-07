<template>
  <div>
    <div v-if="campaigns">
      <p>{{ campaigns.name }}</p>
      <p>{{ campaigns.product }}</p>
      <p>{{ campaigns.advertiser }}</p>
      <p>{{ campaigns.budget }}</p>
      <p>{{ campaigns }}</p>
      <div
        v-for="objective in campaigns.campaigns_objectives"
        :key="objective.id"
      >
        <h2>{{ objective.objective.name }}</h2>
        <div
          v-for="kpi in objective.kpis"
          :key="kpi.kpi_campaigns_objectives.id"
        >
          <span>{{ kpi.name }} </span>
          <span>{{ kpi.kpi_campaigns_objectives.weight }} </span>
          <span>{{ kpi.kpi_campaigns_objectives.objectivesValue }} </span>
        </div>
        <InputKpi :id="objective.id" />
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
