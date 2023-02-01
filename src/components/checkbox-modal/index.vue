<template>
  <div class="checkbox-modal">
    <h3>Выберите вариант</h3>
    <checkbox
        label="1 вариант"
    />
    <checkbox
        label="2 вариант"
    />
    <checkbox
        label="3 вариант"
    />
    <checkbox
        label="4 вариант"
    />
    <btn
        style="margin-top: 16px"
        @click="openSwitcherModal"
    >
      <span>Показать модальное окно 2</span>
    </btn>
  </div>
</template>

<script>
import checkbox from "@/common-components/checkbox";
import btn from "@/common-components/btn"
import {mapActions} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "checkbox-modal",
  components: {
    checkbox,
    btn
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['openModal']),
    openSwitcherModal () {
      this.$bus.emit('bottom-sheet-close')
      this.openModal({
        name: "switcher-modal",
        props: {
          isCloseBtn: true,
          isHeader: 'Модалка c headerом'
        },
        component: () => import('@/components/switcher-modal'),
        replace: true
      })
    }
  }
}

</script>

<style src="./style.scss" lang="scss"/>