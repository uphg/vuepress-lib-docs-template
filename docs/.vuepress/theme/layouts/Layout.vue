<template>
  <t-scrollbar wrap-class="scrollbar-wrapper">
    <div
      class="theme-container"
      :class="pageClasses"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <Navbar
        v-if="shouldShowNavbar"
        @toggle-sidebar="toggleSidebar"
      />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <Home v-if="$page.frontmatter.home" />

      <Page v-else :sidebar-items="sidebarItems">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
      <!-- <Synopsis /> -->
    </div>
  </t-scrollbar>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
// import Synopsis from '@theme/components/Synopsis.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
import activeHeaderLinks from '../mixins/active-header-links'

export default {
  name: 'Layout',

  mixins: [activeHeaderLinks],

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    // Synopsis
  },

  data() {
    return {
      isSidebarOpen: false,
      // navClass: '', // 导航栏滚动附加class
      // scroll: {     // 存储window滚动变量
      //   before: 0,
      //   current: 0,
      // }
    }
  },

  watch: {
    '$route'() {
      this.scrollTo(location.hash)
    }
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    },

    scrollbar() {
      return this.$el.querySelector('#app > .tulp-scrollbar > .tulp-scrollbar__wrap')
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
    this.initScrollTo()
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    initScrollTo() {
      this.closeBehavior()
      this.scrollTo(location.hash)
      this.$nextTick(this.openBehavior)
    },

    // 修复页面不会自动跳转锚点的 bug
    scrollTo(selector) {
      if (!selector || selector === '#') {
        this.closeBehavior()
        this.scrollbar.scrollTo(0, 0)
        this.$nextTick(this.openBehavior)
        return
      }
      const el = document.querySelector(decodeURIComponent(selector))
      if (el && el.offsetTop) {
        this.scrollbar.scrollTo(0, el.offsetTop)
      }
    },

    closeBehavior() {
      this.scrollbar.style.scrollBehavior = 'auto'
    },

    openBehavior() {
      this.scrollbar.style.scrollBehavior = ''
    },

    // 监听 window 窗口滚动事件
    // initNav() {
    //   this.scrollbar.addEventListener('scroll', this.windowScroll)
    // },

    // // 窗口滚动时执行函数
    // windowScroll() {
    //   let searchInput = document.querySelector(".search-box input[aria-label='Search']")
    //   // 判断input搜索框是否获得焦点，获得焦点不滚动
    //   if (document.activeElement !== searchInput) {
    //      // this.scroll.current = document.documentElement.scrollTop || document.body.srcollTop;
    //     this.scroll.current = this.scrollbar.scrollTop;
    //     // 判断滚动方向
    //     if (this.scroll.before < this.scroll.current) {
    //       this.navClass = 'nav-down'
    //     } else {
    //       this.navClass = 'nav-up'
    //     }
    //     this.scroll.before = this.scroll.current
    //   }
    // }
  }
}
</script>
<style lang="stylus">
// // 导航栏向下滚动
// .nav-down {
//   transition: top 0.3s;
//   top: -3.6rem;
// }

// // 导航栏向上滚动
// .nav-up {
//   transition: top 0.3s;
//   top: 0;
// }
</style>
