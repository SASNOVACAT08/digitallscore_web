<template>
  <div id="campagne">
    <img id="logo" src="/img/DigitallScore-Logoblanc.png">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-3 text-center m-5 text-white"><svg id="back" class="bi bi-arrow-left-circle-fill" width="0.5em" height="0.5em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg" @click="back">
        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"/>
        </svg>Finalisation de la campagne</h1>
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
                <h2
                  class="display-5 text-white"
                >Objectif {{ objective.objective.name }} (Pondération : {{ objective.weight }}% / Budget : {{ objective.budgetPart }}%)</h2>
                <div class="row">
                  <div v-for="kpi in objective.kpi_campaigns_objectives" :key="kpi.id" class="col-md-4">
                    <p class="text-white">KPI : {{ kpi.kpi.name }}</p>
                    <p class="text-white">Pondération : {{ kpi.weight }}%</p>
                    <p class="text-white">Objectif valeur : {{ kpi.objectivesValue }}</p>
                  </div>
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
  background-image:url("/img/detail.jpg");
  background-size: cover;
}

#logo{
  position: absolute;
  top: -50px;
  left: 10px;
   width: 260px;
  height: 260px;
}

#back{
  margin-right: 10px;
  cursor: pointer;
}
</style>
