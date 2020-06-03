<template>
  <div>
    <form method="post" @submit.prevent="onSubmit(weight, budgetPart)">
      <input v-model="weight" type="text" name="weight" placeholder="Weight" />
      <input
        v-model="budgetPart"
        type="text"
        name="budgetPart"
        placeholder="Value"
      />
      <button type="submit">Change Objective</button>
    </form>
    <InputKpi :id="idObjective" :campaign="idCampaign" />
    <button @click="next()">Next</button>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import InputKpi from "./InputKpi.vue";

export default {
  name: "Objective",
  props: {
    id: Number,
    idObjective: Number,
    idCampaign: Number
  },
  components: {
    InputKpi
  },
  setup(props, context) {
    const { $store } = context.root;
    const weight = ref();
    const budgetPart = ref();

    function onSubmit(weight, budgetPart) {
      $store.dispatch("campaigns-objectives/patch", [
        props.id,
        {
          weight,
          budgetPart
        }
      ]);
    }

    function next() {
      context.emit("next");
    }

    return {
      weight,
      budgetPart,
      onSubmit,
      next
    };
  }
};
</script>
