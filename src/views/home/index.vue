<template>
  <div
      class="home home-container"
  >
    <section
      v-if="isLoaded"
    >
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
        <div class="btns">
          <btn
              icon="ic_email"
              @click="$refs.feedbackBottomSheet.open()"
          >
            <span>Обратная связь</span>
          </btn>
          <btn
              tonal
              icon="ic_telegram"
              href="https://t.me/amogus_1997"
          >
            <span>Telegram</span>
          </btn>
        </div>
      </div>

      <bottom-sheet
        ref="feedbackBottomSheet"
      >
        <feedback-modal
            @on-success="$refs.feedbackBottomSheet.close()"
        />
      </bottom-sheet>
    </section>
    <preloader
      v-else
      full-page
      remove-overflow
    />
  </div>
</template>

<script>
import sectionHeader from "@/common-components/section-header";
import preloader from "@/common-components/preloader"
import Btn from "@/common-components/btn";
import BottomSheet from "@/common-components/bottom-sheet";
import FeedbackModal from "@/views/home/feedback-modal";

export default {
  name: 'HomeView',
  components: {
    FeedbackModal,
    BottomSheet,
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
  methods: {
    getHomepageData() {
      fetch('home.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.homePageData = data
            setTimeout(() => {
              this.isLoaded = true
            },1000)
          });
    },
  }
}
</script>

<style src="./style.scss" lang="scss"/>
