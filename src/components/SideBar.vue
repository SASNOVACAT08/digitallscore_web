<template>
  <!-- Sidebar  -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <img src="/img/DS_Logo_Blanc.svg" alt="Logo" class="logo">
      <img src="/img/DS_Logo_Resp_Blanc.svg" alt="Logo" class="logo-sm">
    </div>

    <ul class="list-unstyled components">
      <h4 class="text-center">Menu</h4>
      <hr>
      <li v-if="!$store.state.auth.user">
        <router-link exact :to="{ name: 'signin' }">Connexion</router-link>
        <router-link exact :to="{ name: 'signup' }">Inscription</router-link>
      </li>
      <li v-if="$store.state.auth.user">
        <a
          href="#campaignSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >Campagnes</a>
        <ul class="collapse list-unstyled" id="campaignSubmenu">
          <li>
            <router-link exact :to="{ name: 'create_campaigns' }">Créer une campagne</router-link>
          </li>
          <li>
            <router-link exact :to="{ name: 'campaigns' }">Historique</router-link>
          </li>
        </ul>
      </li>
      <li v-if="$store.state.auth.user">
        <router-link exact :to="{ name: 'kpi' }">Gestion KPIS</router-link>
      </li>
      <hr>
      <li v-if="$store.state.auth.user">
        <a href="#" @click="logout()">Déconnexion</a>
      </li>
      <hr>
      <li>
        <a href="#" @click="about()">A propos</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    about() {
      this.$swal({
        title: "A propos de Digitall Score",
        html:
          '<p>Digitall Score est un outil de pilotage pour vos campagnes digitales.</p><br><p>Proposé uniquement par :</p><img class="text-center" src="/img/Logo_DigitallMakers.png">',
        icon: "info"
      });
    }
  },
  setup(props, context) {
    const { $store, $router } = context.root;
    function logout() {
        $store.dispatch("auth/logout");
        $router.push("/");
    }
    return {
      logout
    };
  }
};
</script>

<style>

</style>