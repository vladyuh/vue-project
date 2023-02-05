<template>
  <div
      v-if="isLoaded"
      class="home home-container"
  >
    <section>
      <div class="container">
        <section-header
            :level="1"
            v-html="homePageData?.pageTitle"
        />
        <section-header
            :level="4"
            v-html="homePageData?.pageDesc"
        />
        <section-header
            :level="5"
            v-html="homePageData?.pageCaption"
        />
        <btn
          no-rounded
          icon="ic_telegram"
          href="https://t.me/amogus_1997"
        >
          <span>Telegram</span>
        </btn>
      </div>
    </section>
  </div>
  <preloader
      v-else
      full-page
      remove-overflow
  />
</template>

<script>
import sectionHeader from "@/common-components/section-header";
import preloader from "@/common-components/preloader"
import Btn from "@/common-components/btn";

export default {
  name: 'HomeView',
  components: {
    Btn,
    sectionHeader,
    preloader
  },
  data() {
    return {
      homePageData: null,
      isLoaded: false
    }
  },
  created() {
    this.getHomepageData()
  },
  mounted() {
  },
  computed: {},
  methods: {
    getHomepageData() {
      fetch('home.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.homePageData = data
            this.isLoaded = true
          });
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>
