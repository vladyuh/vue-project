<template>
  <div
      class="switcher"
      :class="{ disabled: disabled }"
  >
    <div class="switcher__item">
      <div
        class="switcher__ch-wr"
      >
        <input
          :id="id"
          type="checkbox"
          class="switcher__ch"
          :name="name"
          :checked="value"
          :disabled="disabled"
          @change="updateValue"
        >
        <div class="switcher__pseudo-block"/>
      </div>
      <label
        :for="id"
        class="switcher__label"
      >
        <span
          class="switcher__label-text"
        >
          <slot />
        </span>
      </label>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'switcher',
  props: {
    name: String,
    id: {
      type: String,
      default: 'switcher'
    },
    disabled: Boolean,
    value: Boolean,
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>
