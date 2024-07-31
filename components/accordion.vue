<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="div" class="p-1">
      <b-button block v-b-toggle="id" variant="light" role="tab"><slot name="title" /></b-button>
    </b-card-header>
    <b-collapse :id="id" :accordion="accordion" role="tabpanel">
      <b-card-body>
        <slot name="content" />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>

  export default{
    components: {
      
    },

    props: {
      id: { type: String, required: true },
      accordion: { type: String, required: true }
    },

    data(){
      return{
        
      }
    },

    methods: {
      
    }
  }

</script>

<style lang="scss">

  .acc-wrapper{
    & > .card{
      border-radius: 15px;
      border: 3px solid $accent-color_dark;
      background-color: transparent;
      padding: 3px;

      &:not(:last-child){
        margin-bottom: 15px!important;
      }

      .card-header{
        border: none;
        box-shadow: none;
        background-color: transparent;

        button.btn{
          background-color: $main_color;
          color: white;
          border-radius: 8px;          
          box-shadow: none;
          border: none;
          font-weight: 700;
          font-size: 1.2rem;
          text-decoration: none!important;

          &:hover, &:focus, &:active{
            background-color: darken($main_color, 7%);
            border: none;
          }
        }
      }

      .card-body{
        padding-bottom: 0.7rem;
      }
    }
  }

  html.ie .acc-wrapper > .card{
    display: block;
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