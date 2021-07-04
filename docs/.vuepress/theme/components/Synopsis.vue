<template>
  <div class="synopsis">
    <div class="synopsis-container">
      <TOC />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.synopsis {
  min-width: $synopsisWidth;
  position: fixed;
  top: 3.6rem;
  right: 0;
  left: auto;
  will-change: top;
  transition: top 0.2s ease 0.2s;
  padding-top: 32px;
}
.synopsis-container {
  position: relative;  
}

.synopsis-wrap {
  font-size: 14px;

  > .synopsis-ul:before {
    content: '';
    position: absolute;
    top: 0;
    left: 2.5px;
    bottom: 0;
    width: 2px;
    background-color: #ebedef;
    opacity: 0.5;
    z-index: -1;
  }
}

.synopsis li {
  line-height: 28px;
}

.synopsis .synopsis-link {
  color: #333;
  display: inline-block;
  transition: border-color 0.2s;

  &.router-link-active {
    border-left-color: $accentColor;
  }
}

.catalog-list[data-v-411504a4]:before {
}
</style>