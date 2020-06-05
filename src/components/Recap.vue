<template>
  <div>
    <div>
      {{ campaign.name }}
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";

export default {
  name: "Recap",
  props: {
    idCampaign: Number
  },
  setup(props, context) {
    const campaign = ref({});
    const { Campaigns } = context.root.$FeathersVuex.api;
    Campaigns.get(props.idCampaign).then(data => (campaign.value = data));
    return {
      campaign
    };
  }
};
</script>
