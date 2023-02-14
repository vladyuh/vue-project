<template>
  <section
      v-if="isProjectLoaded"
      class="project-page-detail"
  >
    <div class="container">
      <div class="project-page-detail__head">
        <icon-btn
            icon="ic_back"
            is-back-button
        />
        <section-header
            :level="1"
            :text="project?.title"
        />
      </div>
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
import sectionHeader from "@/common-components/section-header";
import Btn from "@/common-components/btn"
import Preloader from "@/common-components/preloader"
import iconBtn from "@/common-components/icon-btn";

export default {
  name: 'ProjectsPageView',
  components: {
    sectionHeader,
    Btn,
    Preloader,
    iconBtn
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
            setTimeout(() => {
              this.isProjectLoaded = true
            },1000)
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
