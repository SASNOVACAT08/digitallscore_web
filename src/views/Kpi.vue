<template>
  <div>
    <form method="post" @submit.prevent="onSubmit(name)">
      <input v-model="name" type="text" name="name" placeholder="Name" />
      <button type="submit">Create</button>
    </form>
    <div v-for="kp in kpi" :key="kp.id">
      <span>{{ kp.name }}</span>
      <span @click="prepareDeleteKpi(kp.id)"> Delete</span>
    </div>
    <div v-if="visible">
      <p>
        La suppression d'un kpi peut entrainer la suppression d'une partie des
        campagnes.
      </p>
      <p @click="deleteKpi()">Supprimer quand meme</p>
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
    const { $store } = context.root;
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
    return {
      kpi,
      onSubmit,
      name,
      deleteKpi
    };
  }
};
</script>
