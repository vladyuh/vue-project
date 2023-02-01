<template>

  <footer class="main-footer">
    <div class="container">
      <div class="main-footer__nav-wr">
        <ul class="main-footer__nav">
          <li
              v-for="(link, i) in links"
              :key="i"
          >

            <router-link
                v-if="link.href"
                :to="link.href"
            >

              {{ link.label }}

            </router-link>

          </li>
        </ul>
      </div>
    </div>
  </footer>

</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "main-footer",
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
  }
}

</script>

<style src="./style.scss" lang="scss"></style>