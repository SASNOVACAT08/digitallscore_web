<template>
  <div class="bg">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center m-5 text-white">Gestion des KPIS</h1>
          <div class="text-center m-3">
            <button class="btn btn-danger btn-sm" @click="back">Retour</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
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

          <ul class="list-group list-group-flush">
            <li class="list-group-item liste text-white" v-for="kp in kpis" :key="kp.id">
                {{ kp.name }}
                <svg
                  class="bi bi-x-circle-fill cross"
                  width="0.6em"
                  height="0.6em"
                  viewBox="0 0 16 16"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="prepareDeleteKpi(kp.id)"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"
                  />
                </svg>
            </li>
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
  data() {
    return {
      visible: false,
      actualDelete: null
    };
  },
  computed: {
    kpis: function () {
      return this.kpi.filter(kpi => kpi.custom);
    }
  },
  methods: {
    prepareDeleteKpi(id) {
      this.visible = true;
      this.actualDelete = id;
      this.$swal({
        title: "Confirmation",
        text: "Êtes-vous certain de vouloir supprimer ce KPI ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer !"
      }).then(result => {
        if (result.value) {
          this.deleteKpi();
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "KPI supprimé !",
            icon: "success"
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Aucun KPI supprimé !",
            icon: "success"
          });
        }
      });
    }
  },
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

    function deleteKpi() {
      $store.dispatch("kpi/remove", this.actualDelete);
      this.actualDelete = null;
      this.visible = false;
    }
    function back() {
      $router.back();
    }
    return {
      kpi,
      onSubmit,
      name,
      deleteKpi,
      back
    };
  }
};
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(30, 30, 30, 0.666), rgba(30, 30, 30, 0.666)),
    url("/img/campagne2.jpg") fixed;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.liste {
  font-size: 2em;
  background: none;
}

.cross {
  cursor: pointer;
}
</style>
