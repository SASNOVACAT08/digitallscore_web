<template>
  <div>
    <form method="post" @submit.prevent="onSubmit(name)">
      <input v-model="name" type="text" name="name" placeholder="Name" />
      <button type="submit">Create</button>
    </form>
    <li v-for="kp in kpi" :key="kp.id">
      {{ kp.name }}
    </li>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";
import { ref } from "@vue/composition-api";

export default {
  name: "Kpi",
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
    return {
      kpi,
      onSubmit,
      name
    };
  }
};
</script>
