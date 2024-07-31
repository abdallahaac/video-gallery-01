<!-- ILS banner at the top of the page -->
<template>
  <div class="ils-banner">
    <img v-if="$i18n.locale=='en'" class="img-fluid" src="~assets/ils_banner_new.png" alt="Indigenous Learning Logo">
    <img v-else-if="$i18n.locale=='fr'" class="img-fluid" src="~assets/ils_banner_new.png" alt="Logo de l'apprentissage autochtone">
  </div>
</template>

<script>

  export default{
    data(){
      return{
        
      }
    }
  }

</script>

<style scoped lang="scss">

  

</style>

<i18n>

  {
    "en": {
      
    },
    "fr": {
      
    }
  }

</i18n>
