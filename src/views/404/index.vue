<template>
  <section class="not-found">
    <div class="container">
      <section-header
        level="1"
        text="Страница не найдена"
      />
      <btn
          to="/"
      >
        <span>Вернуться на главную</span>
      </btn>
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/common-components/section-header";
import Btn from "@/common-components/btn";
export default {
  name: 'PageNotFound',
  components: {Btn, SectionHeader },
}
</script>

<style src="./style.scss" lang="scss"/>
