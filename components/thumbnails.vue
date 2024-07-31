<template>
  <b-row align-v="center">
    <b-col cols="2" lg="1" class="text-center">
      <button class="prev" @click="prev" :title="$t('prev')"><font-awesome-icon icon="chevron-left" size="lg" role="presentation" /><span class="v-inv">{{ $t("prev") }}</span></button>
    </b-col>
    <b-col>
      <b-row class="thumbnails-row" align-v="center">
        <b-col cols="12" md="6" lg="3" v-for="video in filteredVideos" :key="'thumb_' + video.id">
          <a href="#" @click.prevent="scrollToVideo('video_' + video.id)" :title="($i18n.locale === 'en') ? 'Scroll to video “' + video.title + '” from ' + video.from : 'Défiler vers la vidéo « ' + video.title + ' » de ' + video.from">
            <img class="img-fluid" :src="getPosterUrl(video.posterFile)" alt="">
            <div class="overlay" aria-hidden="true">
              <p>{{ video.title }}</p>
              <p>{{ video.from }}</p>
            </div>
            <span class="v-inv">{{ ($i18n.locale === 'en') ? 'Scroll to video &ldquo;' + video.title + '&rdquo; from ' + video.from : 'Défiler vers la vidéo « ' + video.title + ' » de ' + video.from }}</span>
          </a>
        </b-col>
        <b-col cols="12" v-if="filteredVideos.length == 0" :key="'no-videos'">
          <p class="text-center" style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0;">{{ $t("noVideos") }}</p>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="2" lg="1" class="text-center">
      <button class="next" @click="next" :title="$t('next')"><font-awesome-icon icon="chevron-right" size="lg" role="presentation" /><span class="v-inv">{{ $t("next") }}</span></button>
    </b-col>
  </b-row>
</template>

<script>


  export default{

    data(){
      return{
        min: 0,
        interval: 3,
        videos2: this.videos
      }
    },

    props: {
      videos: {
        type: Array,
        default: function(){ return [] }
      }
    },

    methods: {
      getPosterUrl(posterFile){
        return require('~/assets/videos/' + this.$i18n.locale + '/' + posterFile);
      },
      filterVideos(arr){
        var that = this;
        
        return arr.filter(function(video, index){
          if(index >= that.min && index <= that.min + that.interval){
            return true;
          }
          else{
            return false;
          }
        });
      },
      setMinMax(){
        var width = $(window).width();

        if(width < 768){
          this.interval = 0;
        }
        else if(width >= 768 && width < 992){
          this.interval = 1;
        }
        else if(width >= 992){
          this.interval = 3;
        }
      },
      prev(){
        var that = this;

        if(this.min > 0){
          $(".thumbnails-row").animate({ opacity: 0 }, 300, function(){
            if(that.min - that.interval - 1 < 0){
              that.min = 0
            }
            else{
              that.min = that.min - that.interval - 1;
            }
          });
          
          $(".thumbnails-row").delay(50).animate({ opacity: 1 }, 300, function(){ that.setThumbnailsHover(); });
        }
      },
      next(){
        var that = this;

        if(this.min + this.interval + 1 <= this.videos2.length - 1){
          $(".thumbnails-row").animate({ opacity: 0 }, 300, function(){
            that.min = that.min + that.interval + 1;
          });
          
          $(".thumbnails-row").delay(50).animate({ opacity: 1 }, 300, function(){ that.setThumbnailsHover(); });
        }
      },
      scrollToVideo(id){
        $('html, body').animate({ scrollTop: $("#" + id).offset().top }, 700, "easeInOutQuad");
        //window.location = "#" + id;
        $("#" + id).attr("tabindex", "0");
        $("#" + id)[0].focus();
         $("#" + id).attr("tabindex", "-1");
      },
      setThumbnailsHover(){
        this.$nextTick(function(){
          $(".thumbnails-row a").hover(
            function(){
              $(this).children(".overlay").addClass("show");
            },
            function(){
              $(this).children(".overlay").removeClass("show");
            }
          );

          $(".thumbnails-row a").focus(function(){
            $(this).children(".overlay").addClass("show");
          });
          $(".thumbnails-row a").blur(function(){
            $(this).children(".overlay").removeClass("show");
          });
        });
      }
    },

    mounted(){
      var that = this;
      setInterval(that.setMinMax, 100);

      this.setThumbnailsHover();
    },
    
    updated(){
      this.setThumbnailsHover();
    },

    computed:{
      filteredVideos(){
        return this.filterVideos(this.videos2);
      }
    },

    watch:{
      videos(newVal){
        this.videos2 = newVal;
      }
    }
  }

</script>

<style scoped lang="scss">

  .thumbnails-row{
    flex-wrap: nowrap;

    a{
      position: relative;
      display: block;

      img{
        border-radius: 15px;
      }
      .overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: $main_color;
        opacity: 0;
        border-radius: 15px;
        pointer-events: none;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        justify-items: center;
        transform: scale(0.95);
        padding: 7px;

        transition: opacity 0.2s, transform 0.2s;
        -webkit-transition: opacity 0.2s, transform 0.2s;
        -moz-transition: opacity 0.2s, transform 0.2s;
        -o-transition: opacity 0.2s, transform 0.2s;
        -ms-transition: opacity 0.2s, transform 0.2s;

        p{
          color: white;
          text-align: center;
          line-height: 1.1;
          width: 100%;

          &:first-child{
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 10px;
          }
          &:last-child{
            margin-bottom: 0;
            font-size: 0.9rem;
          }
        }

        &.show{
          opacity: 1;
          transform: scale(1)
        }
      }
    }
    
  }

  button.prev, button.next{
    background-color: $accent_color_dark;
    border-radius: 50%;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 1rem;
    padding: 0;
    border: none!important;
    color: white;

    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s, color 0.2s;

    @media(min-width: 768px){
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 1.5rem;
    }
    @media(min-width: 1700px){
      width: 70px;
      height: 70px;
      line-height: 70px;
      font-size: 2rem;
    }

    &:hover, &:focus{
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
      background-color: darken($accent_color_dark, 7%);
      transform: scale(0.95);
    }
  }

  .prev svg{
    position: relative;
    left: -2px;
    top: 0px;

    @media(min-width: 768px){
      left: -2px;
      top: -1px;
    }
    @media(min-width: 1700px){
      left: -3px;
      top: -2px;
    }
  }
  
  .next svg{
    position: relative;
    right: -2px;
    top: 0px;

    @media(min-width: 768px){
      right: -2px;
      top: -1px;
    }
    @media(min-width: 1700px){
      right: -3px;
      top: -2px;
    }
  }

</style>

<i18n>

  {
    "en": {
      "prev": "Previous Thumbnails",
      "next": "Next Thumbnails",

      "noVideos": "There are no videos to show."
    },
    "fr": {
      "prev": "Vignettes précédentes",
      "next": "Vignettes suivantes",

      "noVideos": "Il n'y a aucune vidéo à afficher."
    }
  }

</i18n>