<template>
  <label class="checkbox">
    <input
        type="checkbox"
        :name="name"
        :id="id"
        :value="value"
        :checked="value"
        :disabled="disabled"
        @change="updateValue"
    >
    <span class="checkbox__elem"></span>
    <span class="checkbox__text" v-html="label"></span>
  </label>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'checkbox',
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