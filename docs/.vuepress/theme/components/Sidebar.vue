<template>
  <aside class="sidebar">
    <t-scrollbar wrap-class="scrollbar-wrapper">
      <NavLinks />

      <slot name="top" />

      <SidebarLinks :depth="0" :items="items" />
      <slot name="bottom" />
    </t-scrollbar>
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks },

  props: ['items']
}
</script>

<style lang="stylus">

.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }
  .tulp-scrollbar__view {
    padding-top: 3.6rem;
  }
}

.tulp-scrollbar__view {
  & > .sidebar-links {
    // padding: 1.5rem 0;
    padding: 0.65rem .8rem .5rem .8rem
    & > li > a {
      transition background-color 0.2s, color 0.2s
      &.active, &:hover {
        background-color $sidebarActive
      }
    }

    & > li > a.sidebar-link {
      // font-size: 1.1em;
      font-size: 14px;
      line-height: 1.7;
      color #999
      // font-weight: bold;
    }

    & > li:not(:first-child) {
      // margin-top: 0.75rem;
      margin-top 0.5rem
    }

    & > li:nth-child(2) {
      margin-top 0.25rem
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }
  }
  .tulp-scrollbar__view {
    & > .sidebar-links {
      // padding: 1rem 0;
      padding: 0.5rem;
    }
  }
}
</style>
