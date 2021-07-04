<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <!-- <span
        v-if="collapsable"
        class="arrow"
        :class="open ? 'down' : 'right'"
      /> -->
      <svg
        v-if="collapsable"
        class="icon arrow"
        :class="{down: open}"
        aria-hidden="true"
      >
        <use xlink:href="#icon-bold-right"></use>
      </svg>
    </RouterLink>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <!-- <span
        v-if="collapsable"
        class="arrow"
        :class="open ? 'down' : 'right'"
      /> -->
      <svg
        v-if="collapsable"
        class="icon arrow"
        :class="{down: open}"
        aria-hidden="true"
      >
        <use xlink:href="#icon-bold-right"></use>
      </svg>
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from '../util'
import DropdownTransition from '@theme/components/DropdownTransition.vue'

export default {
  name: 'SidebarGroup',

  components: {
    DropdownTransition
  },

  props: [
    'item',
    'open',
    'collapsable',
    'depth'
  ],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate () {
    this.$options.components.SidebarLinks = require('@theme/components/SidebarLinks.vue').default
  },

  methods: { isActive }
}
</script>

<style lang="stylus">
$arrowSize = 18px;
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      // color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  // color $textColor
  color #999
  transition color .15s ease
  cursor pointer
  font-size 14px
  // font-weight bold
  // text-transform uppercase
  // padding 0.35rem 1.25rem 0.35rem 1.25rem
  padding 0.35rem 0.8rem 0.35rem 1rem
  width 100%
  box-sizing border-box
  margin 0
  // border-left 0.25rem solid transparent
  display flex
  justify-content space-between
  align-items center
  transition background-color 0.2s, color 0.2s
  border-radius 4px
  &.open, &:hover
    // color inherit
  .arrow
    // position relative
    // top -0.12em
    // left 0.5em
    fill #b2bac2
    transition transform 0.1s ease-out, fill 0.1s ease-out;
    width $arrowSize
    height $arrowSize
    &.down
      border none
      transform rotate(90deg)
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
    &:hover
      color $accentColor

.collapsable .sidebar-heading
  &:hover
    color $accentColor
    background-color $sidebarActive
    svg
      fill $accentColor

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden
  
.sidebar-links.sidebar-group-items
  padding-left 0.9rem
  padding-top 0.2rem
  padding-bottom 0.2rem
  font-weight: bold;

.collapsable, .sidebar-group-items
  color #ccc
</style>
