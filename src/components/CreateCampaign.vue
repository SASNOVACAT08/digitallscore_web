<template>
  <div class="row">
    <div class="col">
      <h1 class="display-3 text-center m-5 text-white">Création d'une campagne</h1>
      <div class="text-center m-3">
        <button class="btn btn-danger btn-sm" @click="back">Retour</button>
      </div>
      <form
        method="post"
        @submit.prevent="onSubmit(advertiser, name, product, budget,  provider, startedAt, endedAt, disciplineId)"
      >
        <div class="row">
          <div class="form-group col-md-4">
            <label class="col-form-label col-form-label-lg text-white" for="advertiser">Annonceur</label>
            <input
              class="form-control form-control-lg"
              type="text"
              id="advertiser"
              name="advertiser"
              v-model="advertiser"
            />
          </div>
          <div class="form-group col-md-4">
            <label class="col-form-label col-form-label-lg text-white" for="name">Campagne</label>
            <input
              class="form-control form-control-lg"
              type="text"
              id="name"
              name="name"
              v-model="name"
            />
          </div>
          <div class="form-group col-md-4">
            <label
              class="col-form-label col-form-label-lg text-white"
              for="product"
            >Marque / Produit</label>
            <input
              class="form-control form-control-lg"
              type="text"
              id="product"
              name="product"
              v-model="product"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="col-form-label col-form-label-lg text-white" for="advertiser">Budget</label>
          <input
            class="form-control form-control-lg"
            type="number"
            id="budget"
            name="budget"
            v-model="budget"
          />
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label class="col-form-label col-form-label-lg text-white" for="startedAt">Début</label>
            <input
              class="form-control form-control-lg"
              type="date"
              id="startedAt"
              name="startedAt"
              v-model="startedAt"
            />
          </div>

          <div class="form-group col-md-6">
            <label class="col-form-label col-form-label-lg text-white" for="endedAt">Fin</label>
            <input
              class="form-control form-control-lg"
              type="date"
              id="endedAt"
              name="endedAt"
              v-model="endedAt"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label class="col-form-label col-form-label-lg text-white" for="disciplineId">Discipline</label>
            <select
              class="form-control form-control-lg"
              id="disciplineId"
              name="disciplineId"
              v-model="discipline"
            >
              <option disabled value>Choisir une discipline</option>
              <option
                v-for="option in discipline"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label class="col-form-label col-form-label-lg text-white" for="levierId">Levier</label>
            <select class="form-control form-control-lg" id="levierId" name="levierId">
              <option disabled value>Ruben l'as pas fait :(</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <input class="btn btn-primary btn-block btn-lg" type="submit" value="Créer" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "CreateCampaign",
  setup(props, context) {
    const { $store, $router } = context.root;
    const { Discipline } = context.root.$FeathersVuex.api;
    const advertiser = ref();
    const name = ref();
    const product = ref();
    const budget = ref();
    const provider = ref();
    const startedAt = ref();
    const endedAt = ref();
    const disciplineId = ref();
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    const disciplineParams = computed(() => {
      return {
        query: {}
      };
    });
    const { items: discipline } = useFind({
      model: Discipline,
      params: disciplineParams
    });

    function back() {
      $router.back();
    }

    function onSubmit(
      advertiser,
      name,
      product,
      budget,
      provider,
      startedAt,
      endedAt,
      disciplineId
    ) {
      $store
        .dispatch("campaigns/create", {
          advertiser,
          name,
          provider,
          product,
          budget,
          ended: false,
          startedAt,
          endedAt,
          disciplineId
        })
        .then(data => context.emit("idCampaign", data.id));
    }
    return {
      advertiser,
      name,
      product,
      budget,
      provider,
      error,
      dismissError,
      back,
      onSubmit,
      startedAt,
      endedAt,
      discipline,
      disciplineId
    };
  }
};
</script>
<style scoped>
#campagne {
  background-color: #1e1e1e;
  height: 100vh;
  width: 100vw;
}

 @media all and (max-width: 1023px) { 


h1{
font-size: 2em;

}


 }
</style>
