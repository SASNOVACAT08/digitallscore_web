<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="text-center m-5 text-white">Détermination des objectifs + KPIS</h1>
        <div class="row">
          <div class="col-12">
            <form method="post" @submit.prevent="onSubmit(weight, budgetPart)">
              <div class="form-group">
                <label class="col-form-label col-form-label-lg text-white" for="weight">Pondération</label>
                <input
                  class="form-control form-control-lg"
                  v-model="weight"
                  type="text"
                  name="weight"
                  placeholder="Ex : 50%"
                />
              </div>
              <div class="form-group">
                <label
                  class="col-form-label col-form-label-lg text-white"
                  for="budgetPart"
                >Part du budget</label>
                <input
                  class="form-control form-control-lg"
                  v-model="budgetPart"
                  type="text"
                  name="budgetPart"
                  placeholder="Ex : 25%"
                />
              </div>
              <div class="form-group">
                <input
                  class="btn btn-primary btn-lg"
                  type="submit"
                  value="Mettre à jour l'objectif"
                />
              </div>
              <div class="form-group">
                <input type="button" class="btn btn-primary btn-lg" @click="next()" value="Objectif suivant" />
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h3 class="text-center text-white">Ajouter un KPI</h3>
            <InputKpi :id="id" />
            <div
              v-for="kpiCampaignsObjective in kpiCampaignsObjectives"
              :key="kpiCampaignsObjective.id"
            >
              <p class="text-white">KPI ID : {{ kpiCampaignsObjective.id }}</p>
              <p class="text-white">Pondération : {{ kpiCampaignsObjective.weight }}%</p>
              <p class="text-white">Objectif valeur : {{ kpiCampaignsObjective.objectivesValue }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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