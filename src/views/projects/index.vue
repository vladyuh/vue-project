<template>
  <section class="projects-page">
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
</template>

<script>
import {mapActions} from "vuex";
import backTitle from "@/common-components/back-title";
import SectionHeader from "@/common-components/section-header";

export default {
  name: 'ProjectsView',
  components: {
    SectionHeader,
    backTitle,
  },
  data() {
    return {
      projects: null
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
          });
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>