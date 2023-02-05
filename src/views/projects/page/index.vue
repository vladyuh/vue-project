<template>
  <section
      v-if="isProjectLoaded"
      class="project-page-detail"
  >
    <div class="container">
      <back-title
          :text="project?.title"
          capitalize
      />
    </div>
    <div v-if="isLoaded" class="container project-container">
      <div class="project-page-detail__left">
        <section-header :level="4" text="Описание"/>
        <p v-html="project?.description"></p>
        <section-header :level="4" text="Разработка"/>
        <p v-html="project?.dev"></p>
        <div class="project-page__btn-wr">
          <btn
              class="project-page__btn"
              :href="`https://${project?.link}`"
          >
            Подробнее
          </btn>
        </div>
      </div>
      <div class="project-page-detail__right">
        <div class="img-wrp">
          <img :src="project?.image" :alt="project?.title">
        </div>
      </div>
    </div>
  </section>
  <preloader
      v-else
      full-page
      remove-overflow
  />
</template>

<script>
import {mapActions} from "vuex";
import backTitle from "@/common-components/back-title";
import sectionHeader from "@/common-components/section-header";
import Btn from "@/common-components/btn"
import Preloader from "@/common-components/preloader"

export default {
  name: 'ProjectsPageView',
  components: {
    backTitle,
    sectionHeader,
    Btn,
    Preloader
  },
  props: {
    code: String
  },
  data() {
    return {
      projects: null,
      project: null,
      isProjectLoaded: false
    }
  },
  created() {
    if (this.code) {
      this.getProjectData()
    }
  },
  mounted() {
  },
  computed: {
    isLoaded() {
      return this.projects
    },
  },
  methods: {
    ...mapActions(['openModal']),
    getProjectData() {
      fetch('../projects.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.projects = data
            this.isProjectLoaded = true
            this.currentProject()
          });
    },
    currentProject() {
      this.project = this.projects?.find((el) => el.code === this.code)

      if(!this.project) {
        this.$router.push({ path: '/404/' })
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>
