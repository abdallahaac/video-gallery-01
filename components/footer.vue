<template>
  <b-container fluid class="footer">
    <b-container tag="footer">
      <b-row align-h="between" align-v="center" class="school-banner">
        <b-col cols="7" sm="6" md="5" lg="4" xl="3">
          <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/CSPS_FipEng_White.png" alt="Canada School of Public Service Wordmark">
          <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/CSPS_FipFr_White.png" alt="Mot-symbole de l'École de la fonction publique du Canada">
        </b-col>
        <b-col cols="3" sm="2" md="3" lg="2" xl="1">
          <img class="symbol img-fluid" src="~assets/CSPS_LOGO.png" :alt="(($i18n.locale === 'en') ? 'Canada School of Public Service Symbol' : 'Symbole de l\'École de la fonction publique du Canada')">
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>

  export default{
    data(){
      return{
        
      }
    },

    methods:{
      
    },

    mounted(){
      
    },
  }

</script>

<style scoped lang="scss">

  .container-fluid.footer{
    background-color: $main_color_dark;
    margin-top: 50px;

    footer{
      @media (min-width: 1700px){
        max-width: 1600px;
      }
      @media (max-width: 575.9px){
        padding-left: 0;
        padding-right: 0;
      } 
    } 
  }

  .school-banner{
    padding-top: 15px;
    padding-bottom: 15px;

    img.img-fluid{
      max-width: 100%;

      &.symbol{
        max-width: 60%;
        float: right;
      }
    }

    @media (min-width:576px){
      img.img-fluid{
        max-width: 90%;

        &.symbol{
          max-width: 90%;
        }
      }
    }
    @media (min-width: 768px){
      img.img-fluid{
        max-width: 90%;

        &.symbol{
          max-width: 40%;
        }
      }
    }
    @media (min-width: 992px){
      img.img-fluid{
        max-width: 90%;

        &.symbol{
          max-width: 50%;
        }
      }
    }
    @media (min-width:1200px){
      img.img-fluid{
        max-width: 100%;

        &.symbol{
          max-width: 100%;
        }
      }
    }
    @media (min-width:1700px){
      img.img-fluid{
        max-width: 85%;

        &.symbol{
          max-width: 70%;
        }
      }
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
