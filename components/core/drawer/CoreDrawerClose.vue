<template>
  <div
    v-for="n in 2"
    :key="`elem-${n}`"
    class="core_drawer_elem"
    :class="{'menu_open': open}"
  />
</template>

<script setup lang="ts">
  interface Props {
      open: Boolean
  }

defineProps<Props>()
</script>

  <style lang="scss" scoped>
  .core_drawer {
    &_elem {
      width: 24px;
      height: 3px;
      background-color: white;
      transition: 0.2s;

      &:nth-child(1) {
        margin-bottom: 4px;
      }

      &.menu_open {
        position: absolute;
        transform-origin: center;
        top: calc(50% - 2px);
      }

      &.menu_open:nth-child(1) {
        transform: rotate(45deg);
      }

      &.menu_open:nth-child(2) {
        transform: rotate(-45deg);
      }
    }
  }
  </style>
