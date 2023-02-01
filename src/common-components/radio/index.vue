<template>
  <label class="radio">
    <input
        type="radio"
        :name="name"
        :id="id"
        :value="value"
        :checked="value"
        :disabled="disabled"
        @change="updateValue"
    >
    <span class="radio__elem"></span>
    <span class="radio__text" v-html="label"></span>
  </label>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'radio',
  props: {
    value: Boolean,
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>