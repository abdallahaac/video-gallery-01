<template>
  <div>
    <bypass />
    <topbar />
    <b-container role="navigation" :aria-label="$t('navLabel')">
      <b-row class="block-row">
        <block class="col-12">
          <filters :videos="videos" />
          <thumbnails :videos="sortedVideos" />
        </block>
      </b-row>
    </b-container>
    <div id="main_content"></div>
    <b-container tag="main">
      <transition-group tag="div" class="row block-row" name="videos">
        <block
          v-for="(video, index) in sortedVideos"
          :key="'video_' + index"
          class="video-block"
        >
          <div :id="'video_' + video.id"></div>
          <b-row align-v="center" align-h="between">
            <b-col cols="12" lg="6" :orderLg="index % 2 != 0 ? 'last' : ''">
              <video-player
                :videoSource="video.videoSource"
                :localFile="video.localFile"
                :posterFile="video.posterFile"
                :ccFile="video.ccFile"
                :vId="video.id + '_player'"
                :label="
                  video.title +
                  ($i18n.locale === 'en' ? ' from ' : ' de ') +
                  video.from +
                  $t('infoFollows')
                "
                :showCCsAutomatically="video.showCCsAutomatically"
              ></video-player>
              <p class="v-inv">{{ $t("transcriptFollows") }}</p>
            </b-col>
            <b-col cols="12" lg="5" class="video-info">
              <h2 v-html="video.title"></h2>
              <p
                style="margin-bottom: 30px; font-size: 1rem"
                v-if="$i18n.locale === 'en' && video.showCCsAutomatically"
              >
                This video is in French only with English subtitles
              </p>
              <p
                style="margin-bottom: 30px; font-size: 1rem"
                v-if="$i18n.locale === 'fr' && video.showCCsAutomatically"
              >
                Cette vidéo est en anglais seulement avec sous-titres en
                français
              </p>
              <h3
                v-html="
                  $t('from') +
                  ($i18n.locale === 'en' ? '' : '&nbsp;') +
                  ': <strong>' +
                  video.from +
                  (video.community && video.community
                    ? ', ' + video.community
                    : '') +
                  '</strong>'
                "
              ></h3>
              <p v-html="video.date"></p>
              <p v-html="video.department"></p>
              <div role="tablist" class="acc-wrapper">
                <accordion
                  :id="'transcript_' + video.id"
                  :accordion="'transcript_' + video.id + '_acc-group'"
                >
                  <template v-slot:title>{{ $t("transcript") }}</template>
                  <template v-slot:content>
                    <div v-html="video.transcript"></div>
                  </template>
                </accordion>
              </div>
            </b-col>
          </b-row>
        </block>
        <block
          class="col-12"
          v-if="sortedVideos.length == 0"
          :key="'no-videos'"
        >
          <b-row>
            <b-col>
              <p
                class="text-center"
                style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0"
              >
                {{ $t("noVideos") }}
              </p>
            </b-col>
          </b-row>
        </block>
      </transition-group>
    </b-container>
    <feedback />
    <backToTop />
  </div>
</template>

<script>
import Topbar from "~/components/topbar.vue";
import block from "~/components/block.vue";
import Bypass from "~/components/bypass.vue";
import videoPlayer from "~/components/videoPlayer.vue";
import filters from "../components/filters.vue";
import thumbnails from "../components/thumbnails.vue";
import backToTop from "../components/backToTop.vue";
import footerComp from "../components/footer.vue";
import feedback from "../components/feedback.vue";
import accordion from "~/components/accordion.vue";

export default {
  components: {
    Topbar,
    block,
    Bypass,
    videoPlayer,
    filters,
    thumbnails,
    backToTop,
    footerComp,
    feedback,
    accordion,
  },

  data() {
    return {};
  },

  head() {
    return {
      title: this.$i18n
        .t("title")
        .replace(/&nbsp;/g, " ")
        .replace(/&middot;/g, ".")
        .replace(/(<([^>]+)>)/gi, ""),
    };
  },

  methods: {
    filterVideos(arr) {
      var that = this;

      return arr.filter(function (video) {
        if (that.checkTags(video)) {
          return true;
        } else {
          return false;
        }
      });
    },
    checkTags(video) {
      var check = false;

      for (var i = 0; i < video.tags.length; i++) {
        if (
          this.activatedTags.length == 0 ||
          this.isInArray(video.tags[i], this.activatedTags)
        ) {
          check = true;
        }
      }

      return check;
    },
    isInArray(val, arr) {
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            return true;
          }
        }
      }
      return false;
    },
    sortVideos(arr) {
      switch (this.sortValue) {
        case "date-down":
          return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
        case "date-up":
          return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
        case "alpha-up":
          return arr.sort(function (a, b) {
            var titleA = a.title.toLowerCase(),
              titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
          });
        case "alpha-down":
          return arr.sort(function (a, b) {
            var titleA = a.title.toLowerCase(),
              titleB = b.title.toLowerCase();
            if (titleA > titleB) return -1;
            if (titleA < titleB) return 1;
            return 0;
          });
        default:
          return arr;
      }
    },
  },

  computed: {
    videos() {
      return Object.values(this.$i18n.t("videos"));
    },
    filteredVideos() {
      return this.filterVideos(this.videos);
    },
    sortedVideos() {
      return this.sortVideos(this.filteredVideos);
    },
    activatedTags() {
      return this.$store.state.tags.tags;
    },
    sortValue() {
      return this.$store.state.tags.sort;
    },
  },

  mounted() {
    //this.$store.dispatch('scorm/setSuccess');
  },
};
</script>

<style scoped lang="scss">
.container {
  @media (min-width: 1700px) {
    max-width: 1600px;
  }
}

.video-info {
  @media (max-width: 991.9px) {
    margin-top: 50px;
  }

  h2 {
    font-family: "Noto Sans";
    font-weight: 700;
    font-size: 2.3rem;
    line-height: 2.4rem;
    margin-bottom: 1rem;

    @media (max-width: 574.9px) {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }
  h3 {
    font-family: "Noto Sans";
    font-weight: 400;
    font-size: 1.3rem;
    margin-bottom: 30px;

    strong {
      font-weight: 700;
    }
  }

  & > p {
    margin-bottom: 0px;

    &:last-of-type {
      margin-bottom: 30px;
    }
  }
}

.videos-enter,
.videos-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.videos-leave,
.videos-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.videos-leave-active,
.videos-enter-active {
  transition: opacity 0.3s, transform 0.3s;
  -webkit-transition: opacity 0.3s, transform 0.3s;
  -moz-transition: opacity 0.3s, transform 0.3s;
  -o-transition: opacity 0.3s, transform 0.3s;
  -ms-transition: opacity 0.3s, transform 0.3s;
}
</style>

<i18n>

  {
    "en": {
      "navLabel": "Sort, filter and scroll to videos",
      "from": "From",
      "noVideos": "There are no videos to show.",
      "transcript": "Transcript",
      "transcriptFollows": "The transcript follows the title and information.",
      "infoFollows": " (more information about the video follows)"
    },
    "fr": {
      "navLabel": "Trier, filtrer et défiler vers les vidéos",
      "from": "De",
      "noVideos": "Il n'y a aucune vidéo à afficher.",
      "transcript": "Transcription",
      "transcriptFollows": "La transcription suit le titre et les informations.",
      "infoFollows": " (plus d'information sur la vidéo suit)"
    }
  }

</i18n>
