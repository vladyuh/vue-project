<template>
  <section>
    <div class="container">
      <section-header
        level="1"
        text="Страница не найдена"
      />
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/common-components/section-header";
export default {
  name: 'PageNotFound',
  components: {SectionHeader},
  data () {
    return {
    }
  }
}
</script>
