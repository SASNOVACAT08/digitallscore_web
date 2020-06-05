<template>
  <!-- Sidebar  -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <img src="/img/DigitallScore-Logoblanc.png" alt="Logo" class="logo">
      <img src="/img/Logo_ResponsiveBlanc.png" alt="Logo" class="logo-sm">
    </div>

    <ul class="list-unstyled components">
      <h4>Menu</h4>
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
        <a href="#">A propos</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
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