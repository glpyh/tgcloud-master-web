<template>
  <div class="app-container">
    <span>Hystrix Stream: http://gateway.tgcloud.net:7979/actuator/hystrix.stream</span>
    <iframe src='http://hystrix.tgcloud.net:8010/hystrix' id='show' width='100%' height="600px" frameborder=0 name='showHystrix' ></iframe>
  </div>
</template>

<script>
export default {
  name: '断路器监控'
}
</script>