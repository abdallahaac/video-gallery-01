<template>
  <div role="tablist" class="imgDesc">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="div" class="p-1">
        <b-button block v-b-toggle="'imgDesc_' + id" variant="light" role="tab">{{ $t("imgDesc") }}</b-button>
      </b-card-header>
      <b-collapse :id="'imgDesc_' + id" role="tabpanel">
        <b-card-body>
          <slot />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>

  export default{

    data(){
      return{
        
      }
    },

    props:{
      id: { type: String, required: true }
    }

  }

</script>

<style lang="scss">

  .imgDesc{
    .card{
      border-radius: 7px;
      background-color: #eee;
      padding: 0px;
      border: none;
      margin-top: 7px;

      .card-header{
        border: none;
        box-shadow: none;
        background-color: transparent;

        button.btn{
          background-color: #ddd!important;
          border-radius: 5px;          
          box-shadow: none;
          border: none;
          font-weight: 500;
          font-size: 1rem;
          color: $gray!important;

          &:hover, &:focus, &:active{
            background-color: #c9c9c9!important;
            border: none;
            color: $gray!important;
          }
        }
      }

      .card-body{
        padding-top: 0.5rem!important;
        padding-bottom: 1rem!important;

        p:last-child{
          margin-bottom: 0;
        }
      }
    }
  }

</style>

<i18n>

  {
    "en": {
      "imgDesc": "Image Description"
    },
    "fr": {
      "imgDesc": "Description de l'image"
    }
  }

</i18n>