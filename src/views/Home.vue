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
    <br><br>
    <router-link v-if="$store.state.auth.user" class="button" :to="{ name: 'campaigns' }">Campaigns</router-link>
    <br><br>
    <router-link v-if="$store.state.auth.user" class="button" :to="{ name: 'kpi' }">KPI</router-link>
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

<style scoped>
.button {
  padding: 0.5rem 1rem;
  font-size: 1.171875rem;
  line-height: 1.5;
  border-radius: 0px;
}
.button {
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
}

.button:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}

.button:focus, .button.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
          box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
}

.button.disabled, .button:disabled {
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
}

.button:not(:disabled):not(.disabled):active, .button:not(:disabled):not(.disabled).active,
.show > .button.dropdown-toggle {
  color: #fff;
  background-color: #006687;
  border-color: #005c7a;
}

.button:not(:disabled):not(.disabled):active:focus, .button:not(:disabled):not(.disabled).active:focus,
.show > .button.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
          box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
}
</style>
