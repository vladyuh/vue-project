<template>
  <div
    :class="{'input': isInput, 'textarea': !isInput }"
  >
    <label
        v-if="label"
        v-html="label"
        :for="id"
    >
    </label>
    <div
        :class="[
        {
          'input-wr': isInput,
          'textarea-wr': !isInput,
          'input-wr--with-icon': isInput && iconName,
          'textarea-wr--with-icon': !isInput && iconName
        }]"
    >
      <icon
          v-if="iconName"
          :icon-name="iconName"
      >
      </icon>
      <input
          v-if="isInput"
          v-model="inputValue"
          :type="inputType"
          :name="name"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          @change="updateValue"
          @keyup="inputKeyup"
          @blur="inputBlur"
          @focus="inputFocus"
          @paste="inputPaste"
          @input="inputEvent"
      >
      <textarea
          v-else
          v-model="inputValue"
          :name="name"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          @change="updateValue"
          @keyup="inputKeyup"
          @blur="inputBlur"
          @focus="inputFocus"
          @paste="inputPaste"
          @input="inputEvent"
      >

      </textarea>
    </div>
  </div>
</template>

<script>
import Icon from "@/common-components/icon";

const getPasteValue = e => {
  const clipboard = e.clipboardData || window.clipboardData

  return clipboard.getData('Text')
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'input-field',
  components: {Icon},
  props: {
    isInput: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    iconName: null,
  },
  data() {
    return {
      isFocus: false,
      inputValue: this.value,
      inputPassType: 'password',
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
  },
  computed: {
    inputType() {
      if (this.type === 'password') {
        return this.inputPassType
      }

      return this.type
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', this.inputValue, e)
    },
    inputFocus(e) {
      this.isFocus = true
      this.$emit('focus', e)
    },
    inputPaste(e) {
      this.$emit('paste', getPasteValue(e), e)
    },
    inputBlur(e) {
      this.isFocus = false
      this.$emit('blur', this.inputValue, e)
    },
    inputKeyup(e) {
      this.$emit('keyup', e)
    },
    inputEvent(e) {
      const cursorPosition = e?.currentTarget?.selectionStart
      let value = e.target.value

      this.inputValue = value

      if (this.maxlength && (value.length > this.maxlength)) {
        this.inputValue = value.substr(0, this.maxlength)
      }

      this.$emit('input', this.inputValue, e)

      e.target.value = this.inputValue

      // Для мак и iphone - оставляет на том месте где вводится символ
      if (!isNaN(parseInt(cursorPosition))) {
        e.currentTarget.selectionEnd = cursorPosition
      }
    },
  },
}
</script>

<style src="./style.scss" lang="scss"></style>