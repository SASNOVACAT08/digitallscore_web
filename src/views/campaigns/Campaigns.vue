<template>
  <div>
    <router-link :to="{ name: 'create_campaigns' }">Create</router-link>
    <li v-for="campaign in campaigns" :key="campaign.id">
      <router-link
        :to="{ name: 'details_campaigns', params: { id: campaign.id } }"
        >{{ campaign.name }}</router-link
      >
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
