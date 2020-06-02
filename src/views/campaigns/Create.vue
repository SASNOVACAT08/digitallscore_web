<template>
  <div id="campagne">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-3 text-center m-5 text-white">Création d'une campagne</h1>
          <div class="text-center m-3">
            <button class="btn btn-danger btn-sm" @click="back">Retour</button>
          </div>
          <form method="post" @submit.prevent="onSubmit(advertiser, name, product, budget)">
            <div class="form-group">
              <label class="col-form-label col-form-label-lg text-white" for="advertiser">Annonceur</label>
              <input
                class="form-control form-control-lg"
                type="text"
                id="advertiser"
                name="advertiser"
                v-model="advertiser"
              />
            </div>
            <div class="form-group">
              <label class="col-form-label col-form-label-lg text-white" for="name">Campagne</label>
              <input
                class="form-control form-control-lg"
                type="text"
                id="name"
                name="name"
                v-model="name"
              />
            </div>
            <div class="form-group">
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
            <div class="form-group">
              <input class="btn btn-primary btn-block btn-lg" type="submit" value="Créer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";

export default {
  name: "Create",
  setup(props, context) {
    const { $store, $router } = context.root;
    const advertiser = ref();
    const name = ref();
    const product = ref();
    const budget = ref();

    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function back() {
      $router.back();
    }
    function onSubmit(advertiser, name, product, budget) {
      $store
        .dispatch("campaigns/create", {
          advertiser,
          name,
          product,
          budget,
          ended: false,
          startedAt: "2010-10-10",
          endedAt: "2010-10-10"
        })
        .then(() => {
          $router.push({ name: "campaigns" });
        });
    }
    return {
      advertiser,
      name,
      product,
      budget,
      error,
      dismissError,
      onSubmit,
      back
    };
  }
};
</script>
<style scoped>
#campagne {
 background-image: url("/img/campagne2.jpg");
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: left;
}
</style>