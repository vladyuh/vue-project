<template>
  <section
      class="projects-page"
      v-if="isLoaded"
  >
    <div class="container">
      <back-title
          text="Проекты"
          capitalize
      />
      <div class="projects-page__list">
        <router-link
            class="projects-list__item"
            v-for="(project, key) in projects"
            :key="key"
            :to="`${project.url}`"
        >
          <div class="projects-list__item-wr">
            <span class="projects-list__item-link">{{ project?.link }}</span>
            <section-header class="projects-list__item-title" :level="4" :text="project?.title"/>
            <p class="projects-list__item-desc" v-html="project?.description"/>
          </div>
        </router-link>
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
import SectionHeader from "@/common-components/section-header";
import Preloader from "@/common-components/preloader";

export default {
  name: 'ProjectsView',
  components: {
    Preloader,
    SectionHeader,
    backTitle,
  },
  data() {
    return {
      projects: null,
      isLoaded: false
    }
  },
  created() {
    this.getProjectsData()
  },
  mounted() {
  },
  computed: {},
  methods: {
    ...mapActions(['openModal']),
    getProjectsData() {
      fetch('projects.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.projects = data
            this.isLoaded = true
          });
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>