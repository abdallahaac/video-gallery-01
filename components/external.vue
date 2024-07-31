<template>
  <a class="external" :href="link" target="_blank" rel="external" :title="$t('linkTo') + name"><slot /></a>
</template>

<script>

  export default{
    data(){
      return{
        
      }
    },

    props: {
      link: { type: String, default: "#" },
      name: { type: String, default: "" }
    }
  }

</script>

<style lang="scss">

  a.external{
    text-decoration: underline;
    color: $hyperlink_blue;

    &::after {
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4wLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iZXh0ZXJuYWxfeDVGX2xpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCINCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTYwIDU1Ni41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NjAgNTU2LjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMwMDZGQkY7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01NjAsMy41SDEwNUwyMzEsMTE5SDB2NDQxaDQzNy41VjMyMkw1NjAsNDM0VjMuNXogTTQ4Ni41LDI3Ni41bC03Ny03My41bC0xODIsMTgybDQ5LDQ5bDkxLTkxdjE0My41aC0yOTRWMTk2DQoJSDIxMGwtODcuNSw4NGw0OSw0OUwzNTcsMTQ3bC03Ny03My41aDIxMEw0ODYuNSwyNzYuNXoiLz4NCjwvc3ZnPg0K');
      background-size: contain;
      background-repeat: no-repeat;
      width: 15px;
      height: 15px;
      overflow:hidden;
      color:transparent;
      display: inline-block;
      margin-left: 3px;
    }

    &:hover, &:focus{
      text-decoration: none;
      color: $hyperlink_blue;
    }
  }

  html[lang="en"] a.external::after{
    content:'(This content will open in a new window)';
  }

  html[lang="fr"] a.external::after{
    content:'(Ce contenu ouvrira dans une nouvelle fenêtre)';
  }

</style>

<i18n>

  {
    "en": {
      "linkTo": "Link to "
    },
    "fr": {
      "linkTo": "Lien vers "
    }
  }

</i18n>