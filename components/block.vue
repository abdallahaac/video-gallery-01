<template>
  <div class="block">
    <slot />
  </div>
</template>

<script>


  export default{
    components: {
      
    },

    data(){
      return{
        
      }
    },

    props: {
      
    },

    methods: {
      
    },

    mounted(){
      
    }
  }

</script>

<style scoped lang="scss">

  .block{
    background-color: rgba(255, 255, 255, 0.85);
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 30px;
    padding: 3%;
    box-shadow: 0 0 20px 0 (rgba(0, 0, 0, 0.05));
    width: 100%;

    @media (max-width: 991.9px){
      padding: 4%;
    }
    @media (max-width: 575.9px){
      padding: 5%;
    }
  }

</style>

<i18n>

  {
    "en": {
      
    },
    "fr": {
      
    }
  }

</i18n>