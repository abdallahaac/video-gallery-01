<template>
  <b-row class="filters-container">
    <b-col class="filters" cols="12" xl="5">
      <label for="sort" v-html="$t('sort')"></label>
      <select id="sort" name="sort" v-model="sortValue">
        <option selected value="date-down">{{ $t("date-down") }}</option>
        <option value="date-up">{{ $t("date-up") }}</option>
        <option value="alpha-up">{{ $t("alpha-up") }}</option>
        <option value="alpha-down">{{ $t("alpha-down") }}</option>
      </select>
      <b-button type="submit" id="sortSubmit" @click="changeSort">OK <span class="v-inv">{{ (($i18n.locale === "en") ? " (confirm sort value)" : " (confirmer la valeur de tri)") }}</span></b-button>
      <!--<b-button @click.prevent="showFilters = !showFilters" @keypress.enter.prevent="showFilters = !showFilters">{{ showFilters ? $t("hideFilters") : $t("showFilters") }}</b-button>-->
    </b-col>
    <!--<transition name="tags">-->
      <!--<b-row class="tags align-items-center" v-if="showFilters">-->
    <b-col class="tags-col" cols="12" xl="7">
      <b-row class="tags align-items-center">
        <b-col cols="6" sm="3" lg="2" xl="3" v-for="tag, index in availableTags" :key="'tag_' + index">
          <button @click.prevent="toggleTag(tag)" @keypress.enter.prevent="toggleTag(tag)" :class="isInArray(tag, activatedTags) ? 'activated' : ''" :title="((isInArray(tag, activatedTags)) ? $t('hideTag') : $t('showTag'))  + (($i18n.locale === 'en') ? ' “' : ' « ') + tag + (($i18n.locale === 'en') ? '”' : ' »')">{{ tag }}</button>
        </b-col>
      </b-row>
    <!--</transition>-->
    </b-col>
  </b-row>
</template>

<script>


  export default{

    data(){
      return{
        showFilters: false,
        sortValue: "date-down"
      }
    },

    props: {
      videos: Array
    },

    methods: {
      isInArray(val, arr){
        if(arr){
          for (var i = 0; i < arr.length; i++){
            if(arr[i] == val){
              return true;
            }
          }
        }
        return false;
      },

      toggleTag(tag){
        if(this.isInArray(tag, this.activatedTags)){
          this.$store.commit('tags/removeTag', tag);
        }
        else{
          this.$store.commit('tags/addTag', tag);
        }
      },

      changeSort(){
        this.$store.commit('tags/changeSort', this.sortValue);
      }
      
    },

    mounted(){
      /*for(var i = 0; i < this.availableTags.length; i++){
        if(!this.isInArray(this.availableTags[i], this.activatedTags)){
          this.$store.commit('tags/addTag', this.availableTags[i]);
        }
      }*/

      this.$store.commit('tags/changeSort', "date-down");
    },

    computed: {
      availableTags(){
        var tags = []

        for(var i = 0; i < this.videos.length; i++){
          for(var j = 0; j < this.videos[i].tags.length; j++){
            if(!this.isInArray(this.videos[i].tags[j], tags)){
              tags.push(this.videos[i].tags[j]);
            }
          }
        }

        return tags;
      },

      activatedTags: {
        get(){
          return this.$store.state.tags.tags;
        },
        set(val){
          this.$store.commit('tags/changeTags', val);
        }
      },
    }/*,

    watch:{
      sortValue(newVal){
        this.$store.commit('tags/changeSort', newVal);
      }
    }*/

  }

</script>

<style scoped lang="scss">

  .filters-container{
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 50px;

    &:after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      background: $accent_color_dark;
      height: 5px;
      border-radius: 2.5px 2.5px 2.5px 2.5px;
    }
  }

  .filters{
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    @media(min-width: 1700px){
      flex: 0 0 35%;
      max-width: 35%;
    }

    label{
      margin-bottom: 0;
      margin-right: 10px;
      font-family: "Noto Sans";
      font-weight: 400;
      font-size: 1rem;

      @media (min-width: 1200px) and (max-width: 1699.9px){
        font-size: 0.9rem;
      }

      @media(max-width: 767.9px){
        flex: 0 0 100%;
        margin-bottom: 5px;
      }
    }

    select{
      /*appearance: none;
      -webkit-appearance: none;*/
      border: none;
      background-color: $main_color;
      color: white;
      border-radius: 10px;
      padding: 8px 10px;
      font-family: "Noto Sans";
      font-weight: 400;
      font-size: 1rem;
      height: 40px;
      cursor: pointer;

      transition: background-color 0.2s;
      -webkit-transition: background-color 0.2s;
      -moz-transition: background-color 0.2s;
      -o-transition: background-color 0.2s;
      -ms-transition: background-color 0.2s;

      @media (min-width: 1200px) and (max-width: 1699.9px){
        font-size: 0.9rem;
      }

      @media(max-width: 767.9px){
        flex: 0 0 100%;
        margin-bottom: 15px;
      }

      &:hover, &:focus, &:active{
        background-color: darken($main_color, 10%)!important;
      }
    }

    button{
      background-color: $main_color;
      border: none;
      border-radius: 10px; 
      color: white;
      height: 40px;

      @media (min-width: 1200px) and (max-width: 1699.9px){
        font-size: 0.9rem;
      }

      @media(max-width: 767.9px){
        flex: 0 0 100%;
      }

      transition: background-color 0.2s;
      -webkit-transition: background-color 0.2s;
      -moz-transition: background-color 0.2s;
      -o-transition: background-color 0.2s;
      -ms-transition: background-color 0.2s;

      &:hover, &:focus, &:active{
        background-color: darken($main_color, 10%)!important;
        color: white!important;
      }

      &#sortSubmit{
        margin-left: 10px;
        margin-right: 20px;

        @media(max-width: 767.9px){
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 40px;
        }
      }
    }
  }

  .tags-col{
    @media(min-width: 1700px){
      flex: 0 0 65%;
      max-width: 65%;
    }

    .tags{
      //margin-left: -7px;
      //margin-right: -7px;

      @media(max-width: 1199.0px){
        margin-top: 20px;
      }

      transition: clip-path 0.3s;
      -webkit-transition: clip-path 0.3s;
      -moz-transition: clip-path 0.3s;
      -o-transition: clip-path 0.3s;
      -ms-transition: clip-path 0.3s;

      &.tags-enter, &.tags-leave-to {
        clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
      }

      &.tags-leave, &.tags-enter-to {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      }

      & > [class^="col"]{
        //padding-left: 7px;
        //padding-right: 7px;
      }

      button{
        background-color: $accent_color_2;
        border: none;
        border-radius: 10px; 
        color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-top: 8px;
        margin-bottom: 8px;
        width: 100%;
        font-size: 0.9rem;
        transform: scale(1.1);

        transition: background-color 0.2s, transform 0.2s;
        -webkit-transition: background-color 0.2s, transform 0.2s;
        -moz-transition: background-color 0.2s, transform 0.2s;
        -o-transition: background-color 0.2s, transform 0.2s;
        -ms-transition: background-color 0.2s, transform 0.2s;

        &:not(.activated){
          transform: scale(0.95);
          background-color: $main_color_dark;

          &:hover, &:focus, &:active{
            background-color: darken($main_color_dark, 10%)!important;
          }
        }

        &:hover, &:focus, &:active{
          background-color: darken($accent_color_2, 7%)!important;
        }
      }
    }
  }

</style>

<i18n>

  {
    "en": {
      "sort": "Sort by: ",
      "date-up": "Date, least recent first",
      "date-down": "Date, most recent first",
      "alpha-up": "Title, A-Z",
      "alpha-down": "Title, Z-A",
      "showFilters": "Show Filters",
      "hideFilters": "Hide Filters",

      "showTag": "Show videos with the tag",
      "hideTag": "Hide videos with the tag"
    },
    "fr": {
      "sort": "Trier par : ",
      "date-up": "Date, moins récente en premier",
      "date-down": "Date, plus récente en premier",
      "alpha-up": "Titre, A-Z",
      "alpha-down": "Titre, Z-A",
      "showFilters": "Afficher les filtres",
      "hideFilters": "Cacher les filtres",
      "showTag": "Afficher les vidéos avec la balise",
      "hideTag": "Cacher les vidéos avec la balise"
    }
  }

</i18n>