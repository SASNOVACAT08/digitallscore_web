<template>
  <div class="row h-100 w-100">
    <div class="d-flex col-6 justify-content-center align-items-center text-center" id="campagnes">
      <img id="logo" src="/img/DigitallScore-Logoblanc.png" />
      <h1>Gestion des campagnes</h1>
    </div>
    <img id="logo2" src="/img/Logo_ResponsiveBlanc.png" />
    <div class="col-6">
      <div class="row">
        <div class="col">
          <div id="titre" class="text-center m-3">
            <h2 class="display-4 m-5">
              <svg
                id="back"
                class="bi bi-arrow-left-circle-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
                @click="back"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"
                />
              </svg>Liste des campagnes
              <router-link id="create" :to="{ name: 'create_campaigns' }">
                <svg
                  class="bi bi-plus-circle-fill"
                  width="0.8em"
                  height="0.8em"
                  viewBox="0 0 16 16"
                  fill="#5bc0de"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
                  />
                </svg>
              </router-link>
              <hr />
            </h2>

            <ul id="liste" class="list-group list-group-flush">
              <li class="list-group-item" v-for="campaign in campaigns" :key="campaign.id">
                <router-link
                  id="campname"
                  :to="{ name: 'details_campaigns', params: { id: campaign.id } }"
                >{{ campaign.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex";

export default {
  name: "Campaigns",
  setup(props, context) {
    const { $router } = context.root;
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
    function back() {
      $router.back();
    }
    return {
      campaigns,
      back
    };
  }
};
</script>

<style scoped>
#campagnes {
  background-image: url("/img/campagne.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
}

#campagnes h1 {
  color: white;
  font-size: 5em;
  margin-bottom: 90%;
}
#back {
  cursor: pointer;
}
#create {
  padding-left: 2%;
}

#liste {
  font-size: 2em;
  padding-left: 3%;
}
#campname {
  text-decoration: none;
}

#logo {
  position: absolute;
  bottom: 0px;
  left: 20px;
  width: 230px;
  height: 230px;
}
#logo2 {
  position: relative;
  width: 260px;
  visibility: hidden;
  display: none;
}

@media all and (max-width: 1023px) {

  #campagnes h1 {
    visibility: hidden;
    display: none;
  }

  #logo {
    visibility: hidden;
  }
  #logo2 {
    visibility: visible;
    display: block;
    margin: auto;
  }

  h2 {
    font-size: 2em;
    margin: auto;
    display: block;
  }

  .col-6 {
    max-width: 100%;
    max-height: 100%;
    color: white;
    margin: auto;
  }
  .row {
    margin-right: 0px;
    margin-left: 0px;
  }
  #campname {
    text-decoration: none;
    color: white;
  }
  #liste {
    font-size: 2em;
    padding-left: 3%;
  }
  li {
    background: none;
  }
}
</style>
