<template>
  <div class="tulp-example-block__footer" @click="handleCodeVisible">
    <span class="tulp-example-block__action">code</span>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getContent().style.height = 0
  },
  methods: {
    handleCodeVisible() {
      const content = this.getContent()
      const code = this.getCodeBlock()
      this.$nextTick(()=>{
        if(parseInt(content.style.height) === 0) {
          content.style.height = code.offsetHeight + 'px'
        } else {
          content.style.height = 0
        }
      })
    },
    getContent() {
      return this.$el.parentElement.querySelector('.tulp-example-block__content')
    },
    getCodeBlock() {
      const content = this.getContent()
      return content.querySelector('div[class*="language-"] > pre[class*="language-"]')
    }
  }
}
</script>
<style lang="stylus" scoped>
.tulp-example-block
  &__footer
    display flex
    justify-content center
    cursor pointer
    transition color 0.3s
    color #d3dce6
    border-top 1px solid #eaecef
    &:hover
      color $accentColor
  &__action
    padding 8px 0
</style>