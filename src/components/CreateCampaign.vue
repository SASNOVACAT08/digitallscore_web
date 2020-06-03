<template>
  <div id="campagne">
    <form
      method="post"
      @submit.prevent="
        onSubmit(
          advertiser,
          name,
          product,
          budget,
          provider,
          startedAt,
          endedAt,
          disciplineId
        )
      "
    >
      <input
        v-model="advertiser"
        type="text"
        name="advertiser"
        placeholder="Advertiser"
      />
      <input
        v-model="provider"
        type="text"
        name="provider"
        placeholder="Service Provider"
      />
      <input v-model="name" type="text" name="name" placeholder="Name" />
      <input
        v-model="product"
        type="text"
        name="product"
        placeholder="Product"
      />
      <input
        v-model="budget"
        type="number"
        name="budget"
        placeholder="Budget"
      />
      <input v-model="startedAt" type="date" name="startedAt" />
      <input v-model="endedAt" type="date" name="endedAt" />
      <select v-model="disciplineId" name="disciplineId">
        <option disabled value="">Choose</option>
        <option
          v-for="option in discipline"
          :value="option.id"
          :key="option.id"
          >{{ option.name }}</option
        >
      </select>
      <button type="submit">Create</button>
    </form>
  </div>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "CreateCampaign",
  setup(props, context) {
    const { $store } = context.root;
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
</style>
