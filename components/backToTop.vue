<template>
  <div role="complementary" :aria-label="$t('label')" :aria-hidden="scrollPos < 1000">
    <div :class="scrollPos >= 1000 ? ['show', 'back-to-top'] : 'back-to-top'" role="button" :tabindex="scrollPos >= 1000 ? 0 : -1" :aria-hidden="scrollPos < 1000" :title="$t('label')" @click.prevent="scrollUp" @keypress.enter.prevent="scrollUp">
      <font-awesome-icon icon="arrow-up" size="2x" role="presentation" />
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return{
        scrollPos: 0
      }
    },

    methods:{
      checkScroll(){
        this.scrollPos = $("body").scrollTop();
      },
      scrollUp(){
        $("body, html").animate({ scrollTop: 0 }, 700, "easeOutQuint");
      }
    },

    mounted(){
      var that = this;

      setInterval(function(){
        that.checkScroll();
      }, 100);
    },
  }

</script>

<style scoped lang="scss">

  .back-to-top{
    position: fixed;
    right: -100px;
    bottom: 110px;
    background-color: $accent_color_dark;
    color: white;
    border-radius: 20px 0 0 20px;
    width: 70px;
    height: 50px;
    padding-right: 20px;

    transition: background-color 0.2s, right 0.5s;
    -webkit-transition: background-color 0.2s, right 0.5s;
    -moz-transition: background-color 0.2s, right 0.5s;
    -o-transition: background-color 0.2s, right 0.5s;
    -ms-transition: background-color 0.2s, right 0.5s;

    &.show{
      right: 0;
    }
    &:hover, &:focus{
      background-color: darken($accent_color_dark, 7%);
    }
    svg{
      position: absolute;
      left: 11.5px;
      top: 8px;
    }
  }

</style>

<i18n>

  {
    "en": {
      "label": "Scroll back to the top of the page"
    },
    "fr": {
      "label": "Retourner au haut de la page"
    }
  }

</i18n>
