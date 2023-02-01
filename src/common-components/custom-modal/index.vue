<template>
  <div
      :class="[
          'custom-modal',
          customClass ? customClass : ''
      ]"
      ref="customModal"
  >
    <div class="custom-modal__overlay" @click="closeOutside($event)"></div>
    <div class="custom-modal__inner" v-bar>
      <div class="custom-modal__inner-wr">
        <div
            :class="{ 'custom-modal__header': modalProps.isHeader }"
        >
          <div
              v-if="modalProps.isHeader"
              v-html="modalProps.isHeader"
              class="custom-modal__title"
          />
          <div
              v-if="modalProps.isCloseBtn"
              class="custom-modal__close"
              @click="closeModal(currentModal)"
          >
            <icon
                icon-name="ic_close"
                width="24"
                height="24"
            />
          </div>
        </div>

        <div class="custom-modal__content">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "@/common-components/icon";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'custom-modal',
  components: {
    icon
  },
  props: {
    isCloseBtn: Boolean,
    customClass: String,
    componentName: {
      type: String,
      default: ''
    },
    modalProps: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['currentModal'])
  },
  methods: {
    ...mapActions(['closeModal']),
    closeOutside (event) {
      if (event.target === event.currentTarget) {
        this.closeModal(this.currentModal)
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>