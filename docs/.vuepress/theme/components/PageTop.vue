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
$defaultLinkColor = #333333;
$pageArrowSize = 12px;
.re-page-top {
  padding: 5.5rem 40px 1.6rem;
  max-width: $contentWidth;
  margin: 0 auto -3.5rem;
  h2.title {
    margin: 0;
    font-size 2.2rem
  }
}

// .re-page-index {
//   margin-top: 2rem;
//   // border 1px solid #cfd4db
//   // border: 1px solid #e7e6e6;
//   position: relative;
//   z-index: 1;
//   // background-color: #fafafa;
//   background-color #f8f8f8
//   &.hide-index {
//     display: none;
//   }
// }

// .page-index-title {
//   color: #363636;
//   padding: calc(1.6em - 3px) 1.6em;
//   cursor: pointer;
//   &:hover {
//     .open-catalog {
//       color: $accentColor;
//     }
//   }
// }

// /* 组件显示/隐藏过渡 */
// .fade-enter-active, .fade-leave-active {
//   transition: opacity 0.16s ease-out;
// }

// .fade-enter, .fade-leave-to {
//   opacity: 0;
// }

// .page-catalog {
//   color: #6a737d;
//   padding: 0 1.6em calc(1.6em - 3px);

//   .synopsis-ul {
//     margin: 0;
//     line-height: 2;
//   }

//   .synopsis-link {
//     color: $defaultLinkColor;
//     transition: color 0.2s;
//     border-bottom: 1px solid transparent;

//     &:hover {
//       color: $accentColor;
//       border-bottom-color: $accentColor;
//     }
//   }
// }

// .open-catalog {
//   transition: all 0.5s;
//   align-self: flex-end;
//   max-height: 18px;
//   font-size: 15px;
//   margin-right: 3px;
//   display: flex;
//   align-items: center;

//   svg {
//     margin-top: 1px;
//     width: $pageArrowSize;
//     height: $pageArrowSize;
//     fill: currentColor;
//   }
// }

// .arrow-right {
//   margin-right: 5px;
//   width: 10px;
//   height: 10px;
//   transition: transform 0.16s ease-out;

//   &.show {
//     transform: rotate(90deg);
//   }
// }

@media (max-width: $MQNarrow) {
  .re-page-top {
    padding: 5.5rem 32px 1.6rem;
  }
}

// wide mobile
@media (max-width: $MQMobile) {
  .re-page-top {
    padding: 5.5rem 24px 1.6rem;
  }
}
</style>
