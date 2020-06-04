<template>
  <div class="row h-100 w-100">
    <div class="d-flex col-6 justify-content-center align-items-center text-center" id="wrapper">
      <img id="logo" src="/img/DigitallScore-Logoblanc.png" />
      <h1>Gestion des KPIs</h1>
    </div>
    <div class="col-6">
      <img id="logo2" src="/img/Logo_ResponsiveBlanc.png">
      <div class="row">
        <div class="col">
         
          <svg
            id="back"
            class="bi bi-arrow-left-circle-fill"
            width="3em"
            height="3em"
            viewBox="0 0 16 16"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
            @click="back"
          >
            <path
              fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"
            />
          </svg>
           <h1 id="titre2">Gestion des KPIs</h1>
          <div class="text-center m-3">
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
                <input  class="btn btn-primary btn-block btn-lg" type="submit" value="Créer" />
              </div>
            </form>

            <ul class="list-group list-group-flush">
              <li id="liste" class="list-group-item" v-for="kp in kpi" :key="kp.id">
                {{ kp.name }}
                <svg
                  id="cross"
                  class="bi bi-x-circle-fill"
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
            type: 'success',
            title: 'KPI supprimé !',
            icon: 'success'
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: 'success',
            title: 'Aucun KPI supprimé !',
            icon: 'success'
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
#logo {
  position: absolute;
  bottom: 0px;
  left: 20px;
  width: 230px;
  height: 230px;
}
#logo2{
  position: relative;
  width: 260px;
  visibility: hidden;
  display: none;
}
#wrapper {
  background-image: url("/img/kpi.jpg");
  background-position: left;
  background-size: cover;
  height: 300vh;
}
#back {
margin-top: 10px;
  cursor: pointer;
}
#liste {
  font-size: 2em;
}

#create {
  cursor: pointer;
  
}
#wrapper h1 {
  color: white;
  font-size: 5em;
  margin-bottom: 90%;
}
#titre2{
  visibility: hidden;
}







@media all and (max-width: 1023px) {
#wrapper {
  background-image: url("/img/kpi.jpg");
  background-position: left;
  background-size: cover;
height: 300vh;
  position: absolute;
}

#wrapper h1 {
 visibility: hidden;
 display: none;
}
#titre2{
visibility: visible;
display:block;
text-align: center;
}
#liste {
  font-size: 2em;
  background: none;
  margin: auto;
  display:block;
  
}

.col-6{
  max-width: 100%;
    max-height: 120%;
  color: white;
      margin: auto;
 
}
.row {
 
    margin-right: 0px;
    margin-left: 0px;
}
#logo{
visibility: hidden;
}
#logo2{
  visibility: visible;
  display: inline;
}
#titre2{
  display: inline-flex;
  visibility: visible;
  
}

}
</style>
