<template>
  <iframe v-bind:src='url' id='show' width='100%' height="660px" frameborder=0 name='showPlugin' ></iframe>
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
