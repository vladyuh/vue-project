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
        <project-list-item
            v-for="(project, index) in projects"
            :key="index"
            :project="project"
        />
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
import Preloader from "@/common-components/preloader";
import ProjectListItem from "@/views/projects/project-list-item";

export default {
  name: 'ProjectsView',
  components: {
    ProjectListItem,
    Preloader,
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