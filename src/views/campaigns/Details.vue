<template>
  <div id="campagne">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-3 text-center m-5 text-white">Finalisation de la campagne</h1>
          <div class="text-center m-3">
            <button class="btn btn-danger btn-sm" @click="back">Retour</button>
          </div>
          <div v-if="campaigns">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <p>
                      <strong>ID :</strong>
                      {{ campaigns.id }}
                    </p>
                    <p>
                      <strong>Nom :</strong>
                      {{ campaigns.name }}
                    </p>
                    <p>
                      <strong>Annonceur :</strong>
                      {{ campaigns.advertiser }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Produit :</strong>
                      {{ campaigns.product }}
                    </p>
                    <p>
                      <strong>Budget :</strong>
                      {{ campaigns.budget }}€
                    </p>
                    <p>
                      <strong>Date de création :</strong>
                      {{ campaigns.createdAt }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div v-for="objective in campaigns.campaigns_objectives" :key="objective.id">
                <h2 class="display-5 text-white">Objectif '{{ objective.objective.name }}'</h2>
                <div v-for="kpi in objective.kpi_campaigns_objectives" :key="kpi.id">
                  <p class="text-white">KPI : {{ kpi.kpi.name }}</p>
                  <p class="text-white">Pondération : {{ kpi.weight }}</p>
                  <p class="text-white">Objectif valeur : {{ kpi.objectivesValue }}</p>
                </div>
                <InputKpi :id="objective.id" :campaign="campaigns.id" />
              </div>
            </div>
          </div>
          <div v-else-if="isPending">Chargement...</div>
          <div v-else>Pas trouvé.</div>
        </div>
      </div>
    </div>
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
    const { $route, $router } = context.root;
    const { Campaigns } = context.root.$FeathersVuex.api;
    const { item: campaigns, isPending } = useGet({
      model: Campaigns,
      id: $route.params.id
    });
    function back() {
      $router.back();
    }
    return {
      campaigns,
      isPending,
      back
    };
  }
};
</script>
<style scoped>
#campagne {
  background-color: #1e1e1e;
}
</style>
