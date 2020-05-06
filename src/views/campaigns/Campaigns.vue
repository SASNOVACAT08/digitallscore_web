<template>
  <div>
    <router-link :to="{ name: 'create_campaigns' }">Create</router-link>
    <li v-for="campaign in campaigns" :key="campaign.id">
      {{ campaign.name }}
    </li>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "Campaigns",
  setup(props, context) {
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
    return {
      campaigns
    };
  }
};
</script>
