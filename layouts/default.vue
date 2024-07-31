<template>
  <div>
    <div class="background-container">
      <transition name="backgrounds">
        <img :key="'background1'" v-if="background == 1" src="~assets/backgrounds/background-1.jpeg" alt="" aria-hidden="true">
        <img :key="'background2'" v-if="background == 2" src="~assets/backgrounds/background-2.jpeg" alt="" aria-hidden="true">
        <img :key="'background3'" v-if="background == 3" src="~assets/backgrounds/background-3.jpeg" alt="" aria-hidden="true">
      </transition>
    </div>
    <Nuxt />
  </div>
</template>

<script>

  export default{

    head() {
      return {
        htmlAttrs: { lang: this.$i18n.locale },
      }
    },

    data(){
      return{
        background: 1
      }
    },

    methods:{
      detectBrowser(){
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1 - 79
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        // Edge (based on chromium) detection
        var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        var output = 'Detecting browsers by ducktyping:<hr>';
        output += 'isFirefox: ' + isFirefox + '<br>';
        output += 'isChrome: ' + isChrome + '<br>';
        output += 'isSafari: ' + isSafari + '<br>';
        output += 'isOpera: ' + isOpera + '<br>';
        output += 'isIE: ' + isIE + '<br>';
        output += 'isEdge: ' + isEdge + '<br>';
        output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
        output += 'isBlink: ' + isBlink + '<br>';

        if(isFirefox){
          $("html").addClass("firefox");
        }
        else if(isChrome){
          $("html").addClass("chrome");
        }
        else if(isSafari){
          $("html").addClass("safari");
        }
        else if(isOpera){
          $("html").addClass("opera");
        }
        else if(isIE){
          $("html").addClass("ie");
        }
        else if(isEdge){
          $("html").addClass("edge");
        }
        else if(isEdgeChromium){
          $("html").addClass("edge-chromium");
        }
        else if(isBlink){
          $("html").addClass("blink");
        }
      },
    },

    mounted(){
      this.detectBrowser();

      var that = this;
      setInterval(function(){
        if(that.background < 3){
          that.background++;
        }
        else{
          that.background = 1;
        }
      }, 30000);
    }
  }

</script>

<style lang="scss">

  html, body{
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden;
  }

  body{
    font-family: "Noto Sans";
    font-weight: 400;
    position: relative;
    color: $gray;
  }

  h1, h2, h3, h4, h5, h6{
    font-family: "Noto Sans";
    font-weight: 400;
  }

  p, ul, ol, li{
    font-size: 1.1rem;
  }

  .btn.btn-primary, .btn.btn-secondary{
    border: none;
  }

  .v-inv {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }

  .background-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;

    img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.5;

      &.backgrounds-enter-active, &.backgrounds-leave-active{
        transition: opacity 1s;
        -webkit-transition: opacity 1s;
        -moz-transition: opacity 1s;
        -o-transition: opacity 1s;
        -ms-transition: opacity 1s;
      }

      &.backgrounds-enter, &.backgrounds-leave-to{
        opacity: 0;
      }
      &.backgrounds-enter-to, &.backgrounds-leave{
        opacity: 0.5;
      }
    }
  }

  .block-row{
    padding-left: 15px;
    padding-right: 15px;
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