<template>
  <div>
    <h1>Home</h1>
    <div v-if="$store.getters.isAuth">
      <div>
        <input type="text" v-model="campaignName" placeholder="name" />
        <input type="number" v-model="campaignBudget" placeholder="budget" />
        <input type="button" value="Create campaign" @click="addCampaign" />
      </div>
      <div v-for="campaign in campaignList" :key="campaign.id">
        <h2>Nom : {{ campaign.product }}</h2>
        <p>Budget : {{ campaign.budget }} €</p>
        <p>Date de création : {{ campaign.createdAt }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      campaignList: [],
      campaignName: "",
      campaignBudget: 0
    };
  },
  mounted() {
    if (this.$store.getters.isAuth) {
      this.getCampaigns();
    }
  },
  methods: {
    getCampaigns() {
      fetch("http://localhost:3030/campaigns", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.$store.state.token
        })
      })
        .then(data => data.json())
        .then(data => {
          this.campaignList = data.data;
        });
    },
    addCampaign() {
      fetch("http://localhost:3030/campaigns", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.$store.state.token
        }),
        body: JSON.stringify({
          product: this.campaignName,
          budget: this.campaignBudget
        })
      })
        .then(data => data.json())
        .then(data => {
          console.log(data);
          this.getCampaigns();
          this.campaignName = "";
          this.campaignBudget = 0;
        });
    }
  }
};
</script>
