<template>
  <RouterLink
    class="home-button"
    :to="link"
  >
    <span>{{ item.text }}</span>
  </RouterLink>
</template>
<script>
import { ensureExt } from "../util";
export default {
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    link() {
      return ensureExt(this.item.link);
    },
  },
};
</script>
<style lang="stylus" scoped>
.home-button {
  margin: 1.6rem;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.8rem 1.6rem;
  color: #ffffff;
  transition: background-color 0.3s;
  border-radius: 10px;
  background-color: $accentColor;

  &:hover {
    background-color: lighten($accentColor, 20%);
    // &::before, &::after {
    //   opacity: 1;
    // }
  }

  &::before, &::after {
    // opacity: 0;
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid $accentColor;
    transition: all 0.5s;
    animation: clippath 3s infinite linear;
    border-radius: 10px;
  }

  &::after {
    animation: clippath 3s infinite -1.5s linear;
  }
}

@keyframes clippath {
  0%, 100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }

  50% {
    clip-path: inset(98% 0 0 0);
  }

  75% {
    clip-path: inset(0 0 0 98%);
  }
}
</style>