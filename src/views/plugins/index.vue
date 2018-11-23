<template>
  <iframe v-bind:src='url' id='show' width='100%' height="840px" frameborder=0 v-bind:name='name' ></iframe>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    },
    name: {
      type: String
    }
  }
}
</script>
