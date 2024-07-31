<template>
  <figure :id="vId" style="clear:both; position:relative; background-color: #000; margin-bottom: 0!important; border-radius: 15px;" :aria-label="label">
    <Spinner v-if="!canPlay" />

    <video @waiting="loading" @cuechange="readCaptions" @click="setPlaying" ref="videoplayer" :src="videoUrl" :poster="posterUrl" playsinline @loadedmetadata="resumePosition" @timeupdate="update" @ended="isPaused=!isPaused">
      <track :key="'sub'+$i18n.locale" kind="metadata" :src="ccUrl" :srclang="$i18n.locale" label="captions" @cuechange="readCaptions">
    </video>

    <div v-if="!videoHasPlayed" class="thumbnail-duration"><span class="v-inv">{{ (($i18n.locale === "en" ) ? "Video duration: " : "Durée de la vidéo : " ) }}</span><span aria-hidden="true">{{ totalTime | formatTime }}</span><span class="v-inv">{{ totalTime | formatTimeTxt(this) }}</span></div>

    <transition name="expand">
      <figcaption class="CC" v-if="CCactive">
        <p aria-live="polite">{{Captions}}</p>
      </figcaption>
    </transition>

    <div ref="video-controls" class="controls" data-state="hidden">
      <transition name="tooltip-fade" appear>
        <div class="timeline-tooltip" v-show="showTooltip"><span aria-hidden="true">{{ mousePosition | formatTime }}</span><span class="v-inv">{{ mousePosition | formatTimeTxt(this) }}</span></div>
      </transition>

      <progress tabindex="0" @click="setTime" ref="progress" @mousemove="changeTime" @mouseover="changeTime" @mouseout="showTooltip = false" :value="PlayTime" max="100" @keyup.arrow-left="goBackwards" @keyup.arrow-right="goForward" :aria-label="$t('timeline')">
        <span class="progress" ref="progress-bar" :style="'width:'+PlayTime+'%'"></span>
      </progress>

      <button class="videoControls" ref="playpause" @click="setPlaying" type="button" :aria-label="isPaused?$t('play'):$t('pause')" :title="isPaused?$t('play'):$t('pause')">
        <font-awesome-icon :icon="isPaused?'play':'pause'" role="presentation" />
      </button>

      <button class="videoControls" ref="stop" @click="stopVideo" type="button" :aria-label="$t('stop')" :title="$t('stop')">
        <font-awesome-icon icon="stop" role="presentation" />
      </button>

      <button class="videoControls" ref="backward" @click="goBackwards" type="button" :aria-label="$t('backward')" :title="$t('backward')">
        <font-awesome-icon icon="backward" role="presentation" />
      </button>

      <button class="videoControls" ref="forward" @click="goForward" type="button" :aria-label="$t('forward')" :title="$t('forward')">
        <font-awesome-icon icon="forward" role="presentation" />
      </button>

      <!-- <button type="button" data-state="go-fullscreen"><i class="fas fa-compress"></i></button> -->

      <p class="mediaTime"><span aria-hidden="true">{{ isPlayingNow | formatTime }}</span><span class="v-inv">{{ isPlayingNow | formatTimeTxt(this) }}</span> <span aria-hidden="true">/</span><span class="v-inv">{{ (($i18n.locale === "en") ? "out of" : "sur") }}</span> <span aria-hidden="true">{{ totalTime | formatTime }}</span><span class="v-inv">{{ totalTime | formatTimeTxt(this) }}</span></p>

      <span class="showVolume">
        <button class="videoControls" ref="mute" @click="isMuted=!isMuted" type="button" :title="isMuted?$t('unmute'):$t('mute')" :aria-label="isMuted?$t('unmute'):$t('mute')">
          <font-awesome-icon :icon="isMuted?'volume-mute':'volume-up'" role="presentation" />
        </button>
        <label><input class="setVolume" type="range" v-model="setVolume" :title="'Volume: '+setVolume+'%'" :aria-label="'Volume: '+setVolume+'%'"><span class="v-inv">Volume</span></label>
      </span>

      <button class="videoControls" :aria-pressed="CCactive" style="margin-left: auto;" @click="showCC" type="button" :title="(CCactive?$t('hide'):$t('show'))+$t('closedcaptionning')" :aria-label="(CCactive?$t('hide'):$t('show'))+$t('closedcaptionning')">
        <font-awesome-icon :icon="[solidOrRegular,'closed-captioning']" role="presentation" />
      </button>
      
      <button class="videoControls fullscreenBtn" @click="toggleFullscreen" type="button" :title="(!fullscreen) ? $t('enterFullscreen') : $t('exitFullscreen')" :aria-label="(!fullscreen) ? $t('enterFullscreen') : $t('exitFullscreen')">
        <font-awesome-icon :icon="(!fullscreen) ? 'expand' : 'compress'" role="presentation" />
      </button>
    </div>
  </figure>
</template>

<script type="text/javascript">

import Spinner from "~/components/Spinner";

export default {
  components: {
    Spinner
  },
  props: {
    vId: { type: String, default: 'mainPlayer' },
    restartAt: { type: Number, default: 0 },
    videoSource: { type: String, required: true, default: "" },
    localFile: { type: Boolean, required: true, default: false },
    posterFile: { type: String, default: "" },
    ccFile: { type: String, default: "" },
    label: { type: String, default: "" },
    showCCsAutomatically: { type: Boolean, required: true, default: false }
  },
  data() {
    return {
      byFrame: 0,
      currentFrame: 0,
      isPlayingNow: 0,
      isPlayingSoon: 0,
      justSeeked: false,
      PlayTime: 0,
      playToPercent: 0,

      canPlay: false,
      ready: false,

      Captions: "",
      CCactive: false,

      isMuted: false,
      isPaused: true,

      startTime: [],
      endTime: [],
      totalTime: 0,
      hasPlayed: {},

      oldVolume: 100,
      setVolume: 100,

      mousePosition: 0,
      showTooltip: false,
      tipheight: 0,

      fullscreen: false,
      videoHasPlayed: false
    }
  },
  filters: {
    formatTime(time) {
      let minutes = Math.floor(time / 60),
          seconds = Math.floor(time - minutes * 60),
          minuteValue, secondValue

      if (minutes < 10) {
        minuteValue = "0" + minutes;
      } else {
        minuteValue = minutes;
      }

      if (seconds < 10) {
        secondValue = "0" + seconds;
      } else {
        secondValue = seconds;
      }

      return minuteValue + ":" + secondValue
    },
    formatTimeTxt(time, that){
      let minutes = Math.floor(time / 60),
          seconds = Math.floor(time - minutes * 60);

      if(that.$i18n.locale === "en"){
        return minutes + " minutes and " + seconds + " seconds";
      }
      else if(that.$i18n.locale === "fr"){
        return minutes + " minutes et " + seconds + " secondes";
      }
    }
  },
  computed: {
    videoUrl() { 
      if(this.localFile){
        return require('~/assets/videos/' + this.$i18n.locale + '/' + this.videoSource);
      }
      else{
        return this.videoSource;
      }
    },
    ccUrl() {
      if(typeof require('~/assets/videos/' + this.$i18n.locale + '/' + this.ccFile) == "object"){
        return require('~/assets/videos/' + this.$i18n.locale + '/' + this.ccFile).default;
      }
      else{
        return require('~/assets/videos/' + this.$i18n.locale + '/' + this.ccFile);
      }
    },
    posterUrl(){
      return require('~/assets/videos/' + this.$i18n.locale + '/' + this.posterFile);
    },
    solidOrRegular() {
      return this.CCactive ? 'far' : 'fas'
    }
  },
  watch: {
    playToPercent(newValue) {
      this.$emit('timeupdate', newValue)
    },

    isMuted() {
      const video = this.$refs.videoplayer
      if (this.isMuted) {
        this.oldVolume = this.setVolume
        this.setVolume = 0
        video.muted = true

      } else {
        video.muted = false
        this.setVolume = this.oldVolume
        video.volume = this.setVolume / 100
      }
    },

    setVolume(volume) {
      const video = this.$refs.videoplayer
      if (volume == 0) {
        this.isMuted = true
      } 
      else {
        this.isMuted = false
        video.volume = (volume / 100)
        this.oldVolume = this.setVolume
      }
    }
  },
  methods: {
    loading() {
      this.canPlay = false
    },

    isReady() { 
      this.ready = true 
    },

    readCaptions(e) {
      if (this.$refs.videoplayer) {
        const v = e.target.parentNode
        const tt = v.textTracks[0]
        const cuesThere = tt.activeCues
        if (cuesThere.length > 0) { this.Captions = tt.activeCues[0].text } else { this.Captions = "" }
      }
    },
    showCC() {
      this.CCactive = !this.CCactive
      if (this.CCactive) {
        this.$refs.videoplayer.textTracks[0].mode = "showing"
      } else {
        this.$refs.videoplayer.textTracks[0].mode = "hidden"
      }
    },

    update(e) {
      if(!this.videoHasPlayed && this.showCCsAutomatically){
        this.CCactive = true;
        this.$refs.videoplayer.textTracks[0].mode = "showing"
      }
      this.videoHasPlayed = true;
      let currentTime = e.target.currentTime
      let duration = e.target.duration

      this.canPlay = true
      this.PlayTime = (currentTime / duration) * 100
      this.playToPercent = 10 * (parseInt(Math.ceil(this.PlayTime / 10)))

      if (!this.justSeeked) {
        const v = e.target

        v.volume = this.setVolume / 100
        this.isPlayingNow = v.currentTime

        const isNow = this.isPlayingNow

        this.hasPlayed = v.played.length
        this.currentFrame = this.endTime.findIndex(element => element > isNow)
        this.byFrame = (this.isPlayingNow - this.isPlayingSoon)

        this.isPlayingSoon = v.currentTime
      }
    },    
    
    resumePlay() {
      const videoPlayer = this.$refs.videoplayer
      setTimeout(function() { videoPlayer.play(); }, 250)
    },
    resumePosition() {
      if (this.$refs.videoplayer) {
        this.canPlay = true
        this.totalTime = this.$refs.videoplayer.duration
        this.$refs.videoplayer.volume = this.setVolume / 100
        const savedPosition = this.startTime[this.restartAt];

        if (savedPosition) {
          this.$refs.videoplayer.currentTime = savedPosition
        }
      }
    },
    isItPlaying(i) {
      const isNow = this.isPlayingNow
      if (i === this.endTime.findIndex(element => element > isNow)) {
        return 'isPlaying'
      } else { return '' }
    },
    setPlaying() {
      this.isPaused = !this.isPaused;
      if (!this.isPaused) {
        this.$refs.videoplayer.play()
      } else {
        this.$refs.videoplayer.pause()
      }
    },
    stopVideo() {
      const video = this.$refs.videoplayer
      video.currentTime = 0
      this.$refs.videoplayer.pause()
      this.isPaused = true
    },

    seek(e) {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      this.justSeeked = true
      this.ready = false
      const videoPlayer = this.$refs.videoplayer
      const timeData = e.target.getAttribute('data-start')

      videoPlayer.pause()

      this.isPlayingSoon = timeData

      if (!iOS) { videoPlayer.currentTime = timeData } else { videoPlayer.currentTime = timeData + 2 }

      this.isPlayingNow = videoPlayer.currentTime

      const isNow = this.isPlayingNow

      this.currentFrame = this.startTime.findIndex(element => element === isNow)

      this.$nextTick(function() {
        this.isPaused = false
        var that = this;

        setTimeout(function() {
          videoPlayer.play()
        }, 250)

        this.justSeeked = false
      })
    },
    changeTime(e){
      let rect = e.target.getBoundingClientRect()
      let rectSize=rect.right-rect.left
      let mousePos=e.clientX-rect.left
      let toPercent=mousePos/rectSize*this.totalTime
      this.mousePosition=toPercent;
      
      this.showTooltip = true;
      this.$el.querySelector(".timeline-tooltip").style.left = (mousePos - 30) + "px";
    },
    setTime(e) {
      const video = this.$refs.videoplayer
      var pos = (e.pageX - (this.$refs.progress.getBoundingClientRect().left)) / this.$refs.progress.offsetWidth;
      video.currentTime = pos * video.duration;
    },
    goBackwards() {
      const video = this.$refs.videoplayer
      if (this.isPlayingNow) {
        if (this.isPlayingNow - 10 >= 0) { video.currentTime -= 10 } else { video.currentTime = 0 }
      }
    },
    goForward() {
      const video = this.$refs.videoplayer
      if (this.isPlayingNow || (video.currentTime == 0 && this.totalTime >= 10)) {
        if (this.isPlayingNow + 10 < this.totalTime) { video.currentTime += 10 } else {
          video.pause()
          video.currentTime = this.totalTime
        }
      }
    },

    enterFullscreen(){
      var $el = $("#" + this.vId);
      var el = $("#" + this.vId)[0];

      if (el.requestFullscreen){
        el.requestFullscreen();
      }
      else if (el.webkitRequestFullscreen){ /* Safari */
        el.webkitRequestFullscreen();
      }
      else if (el.msRequestFullscreen){ /* IE11 */
        el.msRequestFullscreen();
      }

      $el.addClass("fullscreen");
      this.fullscreen = true;
    },
    
    exitFullscreen(){
      var $el = $("#" + this.vId);

      if(document.exitFullscreen){
        document.exitFullscreen();
      }
      else if (document.webkitExitFullscreen){ /* Safari */
        document.webkitExitFullscreen();
      }
      else if (document.msExitFullscreen){ /* IE11 */
        document.msExitFullscreen();
      }

      $el.removeClass("fullscreen");
      this.fullscreen = false;
    },
    toggleFullscreen(){
      if(!this.fullscreen){
        this.enterFullscreen();
      }
      else{
        this.exitFullscreen();
      }
    }
  },

  mounted(){
    var that = this;
    $(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange", function(){
      if(!document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen){
        that.fullscreen = false;
        $("figure.fullscreen").removeClass("fullscreen");
      }
    });

    /*document.onmsfullscreenchange = function(){
      if(!document.msFullscreenElement || document.msFullscreenElement == null){
        that.fullscreen = false;
        $("figure.fullscreen").removeClass("fullscreen");
      }
    }*/
  }
}

</script>
<i18n>

  {
    "en":{
      "play":"Play",
      "pause":"Pause",
      "stop":"Stop",
      "forward":"Forward 10 seconds",
      "backward":"Rewind 10 seconds",
      "timeline": "Video timeline, use the left and right arrows to skip backwards or forwards 10 seconds",
      "mute":"Mute",
      "unmute":"Unmute",
      "show":"Show ",
      "hide":"Hide ",
      "closedcaptionning":"Closed Captions",

      "enterFullscreen": "Enter fullscreen mode",
      "exitFullscreen": "Exit fullscreen mode"
    },
    "fr":{
      "play":"Jouer",
      "pause":"Pause",
      "stop":"Arrêter",
      "forward":"Avancer 10 secondes",
      "backward":"Reculer 10 secondes",
      "timeline": "Barre de temps vidéo, utilisez les flèches gauche et droite pour reculer ou avancer de 10 secondes",
      "mute":"Désactiver le son",
      "unmute":"Activer le son",
      "show":"Afficher le ",
      "hide":"Cacher le ",
      "closedcaptionning":"sous-titrage codé",

      "enterFullscreen": "Activer le mode plein écran",
      "exitFullscreen": "Désactiver le mode plein écran"
    }
  }

</i18n>
<style lang="scss" scoped>

  video {
    /*box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);*/
    background: transparent;
    cursor: pointer;
    border-radius: 15px 15px 0 0;
  }

  figure.fullscreen video{
    border-radius: 0;
  }

  .mediaTime {
    color: #fff;
    background-color: #000;
    position: relative;
    display: inline-block;
    padding: .5em;
    margin: 0px;
    flex: 0 0 auto;
  }

  @media(max-width: 576px) {
    .mediaTime {
      font-size: 0.8em;
    }
  }

  .CC {
    height: 4.5em;
    padding: 0.9em 0.7em 0.5em 0.7em;
    background-color: #000;
    color: #FFF;
    //font-family: sans-serif;
    text-align: center;
    width: 100%;

    p{
      font-size: 1rem;
      margin-bottom: 0;

      @media(max-width: 576px) {
        font-size: 0.8rem;
      }
    }
  }

  figure.fullscreen .CC p{
    font-size: 1.5rem;

    @media(max-width: 576px) {
        font-size: 1rem;
      }
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 1s ease;
    //padding: 0 10px;
    overflow: hidden;
    max-height: 15em;
  }

  /* .expand-enter defines the starting state for entering */
  /* .expand-leave defines the ending state for leaving */
  .expand-enter,
  .expand-leave-to {
    height: 0px;
    padding: 0 10px;
    opacity: 0;
  }

  label {
    margin: 0;
  }

  input[type=range] {
    -webkit-appearance: none;
    background: 0 0;
    display: inline-block;
    height: 2.5em;
    padding: 0;
    width: 7em;
    margin: 0;
  }

  input[type=range]:focus {
    outline-offset: 0
  }

  input[type=range]::-webkit-slider-runnable-track {
    background: #aaa;
    height: 4px
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    border: 1px solid #707070;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 0.7em;
    margin-top: -5px;
    width: 10px
  }

  input[type=range]::-moz-range-track {
    background: #aaa;
    border: 0
  }

  input[type=range]::-moz-range-thumb {
    background: #fff;
    border: 1px solid #707070;
    border-radius: 0;
    height: 1.3em;
    width: 10px
  }

  input[type=range]::-ms-track {
    border: 0;
    color: transparent;
    height: 4px
  }

  input[type=range]::-ms-fill-upper {
    background: #aaa
  }

  input[type=range]::-ms-fill-lower {
    background: #aaa
  }

  input[type=range]::-ms-thumb {
    background: #fff;
    border: 1px solid #707070;
    height: 1.3em;
    width: 10px
  }

  .showVolume {
    position: relative;
    display: flex;
    transition: all 1s;
    align-items: center;
    width: 180px;
  }

  /*.showVolume:hover input[type=range], .showVolume input[type=range]:focus {
    position: relative;
    height: 1em;
    width: min-content;
    overflow: inherit;
    opacity: 1;
  }*/

  .setVolume:focus {
    outline: 1px dashed white;
    outline-offset: 5px;
  }

  progress {
    -webkit-appearance: none;
    background: #000;
    background-clip: padding-box;
    border: 2px solid #4d4d4d;
    color: $accent_color;
    display: block;
    left: 0;
    padding: 2px;
    position: relative;
    clear: both;
    top: 0;
    width: 100%
  }

  .videoControls {
    margin: .6em 3px;
    background-color: #000;
    color: #fff;
  }

  @media(max-width: 576px) {
    .videoControls {
      font-size: 0.7em;
      width: auto;
    }
  }

  .videoControls:hover,
  .videoControls:focus {
    color: #6d6d6d;
  }

  .videoControls:active {
    color: $accent_color_dark;
  }

  .videoControls:focus {
    outline: 1px dashed white;
  }


  progress::-moz-progress-bar {
    background: -moz-linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%);
    background: linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2));
    border-radius: 50px;
    background-color: $accent_color;
    background-image: (45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%), (to right, $accent_color, $accent_color_dark);
    background-size: 25px 14px, 100% 100%, 100% 100%;
  }

  .progress {
    height: 14px
  }

  progress {
    flex: 0 0 100%;
    height: 14px;
    margin: 0 auto;
    display: block;
    /* Important Thing */
    -webkit-appearance: none;
    border: none;
    border-bottom: 1px solid #4d4d4d;

    @at-root html.ie &{
      flex: 0 0 auto;
    }
  }

  progress:focus {
    outline: 1px dashed white;
  }

  progress::-webkit-progress-bar {
    background: #000;
    border-radius: 50px;
    padding: 2px;
  }

  progress::-webkit-progress-value {
    border-radius: 50px;
    transition: width 1s;
    background:
      linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
      linear-gradient(to right, $accent_color, $accent_color);
    background-size: 25px 14px, 100% 100%, 100% 100%;
  }

  .player {
    width: 480px;
    margin: 10px auto;
    border: 1px solid #ccc;
  }

  video,
  audio,
  .controls {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  button {
    display: block;
    border: 0;
    margin-right: 3px;
    width: 40px;
    cursor: pointer;
    flex: 0 0 auto;
  }

  input[type=range] {
    margin-left: 5px;
    margin-top: 5px;
    flex: 0 0 auto;
  }

  .controls div {
    font-size: 12px;
    display: inline-block;
    line-height: 36px;
    width: 45px;
  }

  video {
    margin-bottom: 0px;
  }

  .timeline-tooltip {
    position: absolute;
    top: -43px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    width: 60px !important;
    transition: left 0.2s, top 0.3s, opacity 0.3s;
    text-align: center;
  }

  .timeline-tooltip:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 25px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-top: 7px solid rgba(0, 0, 0, 0.7);
    border-right: 5px solid transparent;
  }

  .tooltip-fade-enter {
    opacity: 0;
    top: -33px !important;
  }

  .tooltip-fade-enter-to {
    opacity: 1;
    top: -43px !important;
  }

  .tooltip-fade-leave {
    opacity: 1;
    top: -43px !important;
  }

  .tooltip-fade-leave-to {
    opacity: 0;
    top: -33px !important;
  }

  figure.fullscreen{
    .controls{
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      height: 65px;

      .videoControls{
        background-color: transparent;
      }
      .mediaTime{
        background-color: transparent;
      }
    }
    .CC{
      position: absolute;
      bottom: 65px;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  .thumbnail-duration{
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px 0 15px 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 15px;
  }

  figure.fullscreen .thumbnail-duration{
    border-radius: 0 0 15px 0;
  }

  html.ie .fullscreenBtn{
    display: none;
  }

  @media(max-width: 768px){
    .fullscreenBtn{
      display: none;
    }
  }

</style>
