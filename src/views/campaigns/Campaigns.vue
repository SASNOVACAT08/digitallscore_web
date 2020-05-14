<template>
  <div id="campagne">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-3 text-center m-5">Gestion des campagnes</h1>
          <div class="text-center m-3">
            <button class="btn btn-danger btn-sm" @click="back">Retour</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link class="btn btn-primary btn-lg" :to="{ name: 'create_campaigns' }">Créer une campagne</router-link>
          <h2 class="display-4 m-5">Liste des campagnes</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="campaign in campaigns" :key="campaign.id">
              <router-link
                :to="{ name: 'details_campaigns', params: { id: campaign.id } }"
              >{{ campaign.name }}</router-link>
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

export default {
  name: "Campaigns",
  setup(props, context) {
    const { $router } = context.root;
    const { Campaigns } = context.root.$FeathersVuex.api;
    const campaignsParams = computed(() => {
      return {
        query: {}
      };
    });
    const { items: campaigns } = useFind({
      model: Campaigns,
      params: campaignsParams
    });
    function back() {
      $router.back();
    }
    return {
      campaigns,
      back
    };
  }
};
</script>

<style scoped>
#campagne {
  background-image: url("/img/trois.png");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
