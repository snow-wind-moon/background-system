<template>
  <div>
      <button @click = "add"> + </button>
      <p> count: {{ this.$store.state.count }} </p>

      <button @click = "handler"> + </button>
      <p> {{ num }} </p>
  </div>
</template>

<script>
export default {

  data () {
    return {
      num: 0
    }
  },

  methods: {
    handler () {
      this.num++
    },
    add () {
      // this.$store.dispatch('increment') // dispatch中参数为actions中方法名称
      this.$store.commit('INCREMENT')
    }
  }
 }
</script>