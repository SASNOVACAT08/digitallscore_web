<template>
  <form
    method="post"
    @submit.prevent="onSubmit(advertiser, name, product, budget)"
  >
    <input
      v-model="advertiser"
      type="text"
      name="advertiser"
      placeholder="Advertiser"
    />
    <input v-model="name" type="text" name="name" placeholder="Name" />
    <input v-model="product" type="text" name="product" placeholder="Product" />
    <input v-model="budget" type="number" name="budget" placeholder="Budget" />
    <button type="submit">Create</button>
  </form>
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
    function onSubmit(advertiser, name, product, budget) {
      $store.dispatch("campaigns/create", {
        advertiser,
        name,
        product,
        budget,
        ended: false,
        startedAt: "2010-10-10",
        endedAt: "2010-10-10"
      });
      $router.push("/campaigns");
    }
    return {
      advertiser,
      name,
      product,
      budget,
      error,
      dismissError,
      onSubmit
    };
  }
};
</script>
