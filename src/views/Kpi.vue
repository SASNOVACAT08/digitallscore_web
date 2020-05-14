<template>
  <div id="kpi">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-3 text-center m-5">Gestion des KPIs</h1>
          <div class="text-center m-3">
            <button class="btn btn-danger btn-sm" @click="back">Retour</button>
          </div>
          <form method="post" @submit.prevent="onSubmit(name)">
            <div class="form-group">
              <label class="col-form-label col-form-label-lg" for="kpiForm">Nom</label>
              <input
                class="form-control form-control-lg"
                type="text"
                id="kpiForm"
                name="name"
                v-model="name"
              />
            </div>
            <div class="form-group">
              <input class="btn btn-primary btn-block btn-lg" type="submit" value="Créer" />
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="kp in kpi" :key="kp.id">{{ kp.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";
import { ref } from "@vue/composition-api";

export default {
  name: "Kpi",
  setup(props, context) {
    const { $store, $router } = context.root;
    const { Kpi } = context.root.$FeathersVuex.api;
    const name = ref();
    const kpiParams = computed(() => {
      return {
        query: {}
      };
    });
    const { items: kpi } = useFind({
      model: Kpi,
      params: kpiParams
    });
    function onSubmit(name) {
      $store.dispatch("kpi/create", {
        name,
        custom: true
      });
    }
    function back() {
      $router.back();
    }
    return {
      kpi,
      onSubmit,
      name,
      back
    };
  }
};
</script>

<style scoped>
#kpi {
  background-image: url("/img/trois.png");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
