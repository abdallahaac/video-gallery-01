<template>
  <b-container fluid role="complementary" :aria-label="$t('landmarkLbl')" class="feedback-container">
    <a role="button" class="feedback" :href="'mailto:ils-saqa@csps-efpc.gc.ca?subject=' + $t('feedbackOn').replace(/\s/g, '%20') + $t('title').replace(/(<([^>]+)>)/ig,'').replace(/&nbsp;/g, ' ').replace(/&middot;/g, '.').replace(/\s/g, '%20')" :title="$t('feedbackTitle')" aria-labelledby="feedback-tooltip" target="_blank"><font-awesome-icon icon="comment-alt" size="2x" role="presentation" /><span class="v-inv">{{ $t('label') }}</span></a>
    <div id="feedback-tooltip">{{ $t('label') }}</div>
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

  .feedback-container{
    position: relative;
    margin-top: 40px;
    margin-bottom: 50px;

    a.feedback{
      border-radius: 50%;
      background-color: $accent_color;
      color: $gray;
      text-decoration: none;
      width: 70px;
      height: 70px;
      margin-left: 30px;
      display: block;
      box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.1);
      transform: scale(1);

      @media(max-width: 575.9px){
        margin-left: 0;
      }

      transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s, color 0.2s;

      svg{
        position: relative;
        left: 19px;
        top: 21px;
      }

      &:hover, &:focus{
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
        background-color: darken($accent_color, 7%);
        transform: scale(0.95);
      }
    }

    #feedback-tooltip{
      background-color: $accent_color_dark;
      color: white;
      border-radius: 5px;
      padding: 5px 15px;
      display: block;
      position: absolute;
      left: 140px;
      top: 17px;
      font-size: 1rem;

      @media(max-width: 575.9px){
        left: 110px;
      }

      &:before{
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        left: -11.5px;
        top: calc(50% - 7px);
        border-top: 7px solid transparent;
        border-right: 11.5px solid $accent_color_dark;
        border-bottom: 7px solid transparent;
      }
    }
  }
  

</style>

<i18n>

  {
    "en": {
      "label": "Send Feedback",
      "feedbackTitle": "Send feedback about this tool",
      "feedbackOn": "Feedback on ",

      "landmarkLbl": "Feedback"
    },
    "fr": {
      "label": "Envoyez vos commentaires",
      "feedbackTitle": "Envoyez vos commentaires à propos de cet outil",
      "feedbackOn": "Rétroaction sur ",

      "landmarkLbl": "Commentaires"
    }
  }

</i18n>
