<template>
  <div
      ref="customSelect"
      :class="[
      'custom-select',
      {'custom-select--opened': showOptions},
      {'pointer-event-none': isLocked},
      { 'custom-select--with-value': selectedValue }
    ]"
  >
    <div
        v-if="label"
        class="custom-select__label"
    >
      {{ label }}
    </div>
    <div
        :class="[
        'custom-select__selected',
        {
          'custom-select__selected--with-icon': iconName,
          'custom-select__selected--label': label
        }
      ]"
        :disabled="isDisabled"
        @click.stop="toggleSelect"
    >

      <icon
          v-if="iconName"
          :icon-name="iconName"
          width="20"
          height="20"
      />

      <span
          class="custom-select__name"
          v-html="selectedLabel || placeholder"
      />

      <icon
          icon-name="ic_expand"
          :class="[
          'custom-select__arrow',
          `${showOptions ? 'custom-select__arrow-up' : 'custom-select__arrow-down'}`,
        ]"
      />
    </div>

    <transition
        @enter="enter"
        @leave="leave"
    >
      <div
          v-show="showOptions"
          v-bar
          :class="['custom-select__options-wrap js-custom-select-menu', {
          'custom-select__options-wrap--top': selectMenuTop
        }]"
      >
        <div class="custom-select__options">
          <ul class="custom-select__options-scroll">
            <li
                v-for="(option, index) in options"
                :key="index"
                :class="['custom-select__option', { 'active': option.value === selectedValue }]"
                @click.stop="selectOption(option, true)"
            >
              <label
                  class="custom-select__option-label pointer-event-none"
              >
                <input
                    type="radio"
                    :name="name"
                    :value="option.value"
                >
                <span v-html="option.label" />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import icon from "@/common-components/icon";

export default {
  name: 'custom-select',
  components: {
    icon
  },
  props: {
    name: String,
    id: String,
    options: Array,
    maxHeight: Number,
    placeholder: String,
    isDisabled: String,
    label: String,
    iconName: null
  },
  data () {
    return {
      showOptions: false,
      selectMenuTop: false,
      selectedValue: '',
      selectedLabel: '',
      isLocked: false
    }
  },
  watch: {
    showOptions (val) {
      if (val) {
        this.$emit('show-options')
        this.$emit('focus')
        document.body.addEventListener('mousedown', this.clickOutside)
      }
      else {
        this.$emit('close-options')
        document.body.removeEventListener('mousedown', this.clickOutside)
      }
    },
  },
  computed: {
    selectMenuMaxHeight () {
      return this.maxHeight || 240
    },
    selectHeight () {
      return this.selectMenuMaxHeight + 'px'
    },
  },
  mounted () {},
  beforeDestroy () {
    document.body.removeEventListener('mousedown', this.clickOutside)
  },
  methods: {
    selectOption (option, toggle) {
      this.selectedValue = option.value
      this.selectedLabel = option.label
      this.$emit('input', option)

      if(toggle) {
        this.toggleSelect()
      }
    },
    toggleSelect () {
      this.showOptions = !this.showOptions
    },
    clickOutside (event) {
      if (this.$refs.customSelect && !(this.$refs.customSelect === event.target || this.$refs.customSelect.contains(event.target))) {
        this.toggleSelect()
      }
    },
    enter (el) {
      setTimeout(() => {
        el.classList.add('open')
      }, 0)
    },
    leave (el) {
      setTimeout(() => {
        el.classList.remove('open')
      }, 0)
    },
  }
}
</script>

<style src="./style.scss" lang="scss"></style>