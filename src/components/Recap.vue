<template>
  <div id="campagne">
    <img id="logo" src="/img/DigitallScore-Logoblanc.png" />
    <div class="container">
      <div class="row h-100">
        <div class="col">
          <h1 class="text-center m-5 text-white">
            Détails de la campagne
          </h1>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <p>
                    <strong>ID :</strong>
                    {{ campaign.id }}
                  </p>
                  <p>
                    <strong>Nom :</strong>
                    {{ campaign.name }}
                  </p>
                  <p>
                    <strong>Annonceur :</strong>
                    {{ campaign.advertiser }}
                  </p>
                </div>
                <div class="col-md-6">
                  <p>
                    <strong>Produit :</strong>
                    {{ campaign.product }}
                  </p>
                  <p>
                    <strong>Budget :</strong>
                    {{ campaign.budget }}€
                  </p>
                  <p>
                    <strong>Date de création :</strong>
                    {{ campaign.createdAt }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <div v-for="objective in campaign.campaigns_objectives" :key="objective.id">
                <h2
                  class="text-white"
                >Objectif {{ objective.objective.name }} (Pondération : {{ objective.weight }}% / Budget : {{ objective.budgetPart }}%)</h2>
                <div class="row">
                  <div
                    v-for="kpi in objective.kpi_campaigns_objectives"
                    :key="kpi.id"
                    class="col-md-4"
                  >
                    <p class="text-white">KPI : {{ kpi.kpi.name }}</p>
                    <p class="text-white">Pondération : {{ kpi.weight }}%</p>
                    <p class="text-white">Objectif valeur : {{ kpi.objectivesValue }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";

export default {
  name: "Recap",
  props: {
    idCampaign: Number
  },
  setup(props, context) {
    const campaign = ref({});
    const { Campaigns } = context.root.$FeathersVuex.api;
    Campaigns.get(props.idCampaign).then(data => (campaign.value = data));
    console.log(campaign);
    return {
      campaign
    };
  }
};
</script>

<style scoped>
#campagne {
  background: url("/img/detail.jpg") fixed;
  background-size: cover;
  min-height: 100vh;
}
#logo {
  position: fixed;
  top: -50px;
  left: 10px;
  width: 260px;
  height: 260px;
}
#back {
  margin-right: 10px;
  cursor: pointer;
}
.text-white {
  text-shadow: black 0.1em 0.1em 0.2em;
}
</style>
