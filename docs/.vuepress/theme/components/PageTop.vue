<template>
  <div class="re-page-top">
    <h2 class="title">
      <span>{{ $frontmatter.title ? $frontmatter.title : $page.title }}</span>
    </h2>
    <!-- <div class="re-page-index" :class="{'hide-index': indexState}" v-if="showCatalog || inTouch">
      <div class="page-index-title" @click="clickIndex()">
        <span class="open-catalog" :class="{ active: showIndex }">
          <svg
            class="icon arrow-right"
            :class="{ show: showIndex }"
            aria-hidden="true"
          >
            <use xlink:href="#icon-bold-right"></use>
          </svg>
          <span class="text">{{ indexText }}</span>
        </span>
      </div>
      <div class="page-index-content" v-if="showCatalog">
        <transition name="fade">
          <div v-show="showIndex" class="page-catalog">
            <TOC />
          </div>
        </transition>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      showIndex: false,
      indexText: "目录",
      inTouch: false,
    };
  },
  computed: {
    showCatalog() {
      return this.$page.headers && this.$page.headers.length > 0 ? true : false;
    },
    indexState() {
      return this.$frontmatter.hideIndex
    }
  },
  mounted() {
    this.autoTouch();
  },
  methods: {
    clickIndex() {
      this.showIndex = !this.showIndex;
    },
    autoTouch() {
      this.inTouch = document.body.ontouchstart !== undefined ? true : false;
    },
  },
};
</script>
<style lang="stylus">
$paddingTop = 3.6rem
$paddingBottom = 0
.re-page-top {
  padding: $paddingTop 40px $paddingBottom;
  max-width: $contentWidth;
  margin: 0 auto -24px;
  h2.title {
    margin: 0;
    font-size 2.2rem
  }
}

@media (max-width: $MQNarrow) {
  .re-page-top {
    padding: $paddingTop 32px $paddingBottom;
  }
}

// wide mobile
@media (max-width: $MQMobile) {
  .re-page-top {
    padding: $paddingTop 24px $paddingBottom;
  }
}
</style>
