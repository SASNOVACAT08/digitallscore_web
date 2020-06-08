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
        <router-link :to="{ name: 'signin' }">Connexion</router-link>
      </li>
      <li class="active">
        <a
          href="#homeSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >Campagnes</a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
          <li>
            <a href="#">Créer une campagne</a>
          </li>
          <li>
            <a href="#">Historique</a>
          </li>
          <li>
            <a href="#">Rechercher</a>
          </li>
        </ul>
      </li>
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
    const { $store } = context.root;
    function logout() {
        $store.dispatch("auth/logout");
    }
    return {
      logout
    };
  }
};
</script>

<style>

</style>