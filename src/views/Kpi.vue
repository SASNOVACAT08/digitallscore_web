<template>
  <div class="row h-100 w-100">
    <div class="d-flex col-6 justify-content-center align-items-center text-center" id="wrapper">
       <img id="logo" src="/img/DigitallScore-Logoblanc.png">
        <h1>Gestion des KPIs</h1>
    </div>
  <div class="col-6">
    <div class="row">
      <div class="col">
        <svg id="back" class="bi bi-arrow-left-circle-fill" width="3em" height="3em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg" @click="back">
        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"/>
        </svg>
        <div  class="text-center m-3">
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
    
        <li id="liste" class="list-group-item" v-for="kp in kpi" :key="kp.id">{{ kp.name }} 
        <svg  id="cross" class="bi bi-x-circle-fill" width="0.6em" height="0.6em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg" @click="prepareDeleteKpi(kp.id)">
  <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
</svg>

</li>
        </ul>
        
       </div>
      </div>
    </div>
  <div v-if="visible">
    <p>
    La suppression d'un kpi peut entrainer la suppression d'une partie des
    campagnes.
    </p>
    <button class="btn btn-danger" @click="deleteKpi()">Supprimer quand meme</button>
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



#logo{
  position: absolute;
  bottom: 0px;
  left: 20px;
   width: 230px;
  height: 230px;
}

#wrapper {
  background-image: url("/img/kpi.jpeg");
  background-position: left;
  background-size: cover;
  height: 100vh;
}
#back{
  padding-top: 10px;
  cursor: pointer;
}
#liste{
  font-size: 2em;
  
  
}

#cross{
cursor: pointer;

}
#wrapper h1 {
  color: white;
  font-size: 5em;
  margin-bottom: 90%;
}
</style>
