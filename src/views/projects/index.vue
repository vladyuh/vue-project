<template>
  <section
      v-if="isLoaded"
      class="projects-page"
  >
    <div class="container">
      <section-header
        :level="2"
        text="Проекты"
      />
      <div class="projects-page__filter">
        <custom-select
            v-show="false"
            ref="customSelect"
            placeholder="Сортировать по:"
            :options="options"
            @input="setSelected($event)"
        />
      </div>
      <div class="projects-page__list">
        <project-list-item
            v-for="(project, index) in filteredProjects"
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
import ProjectListItem from "@/views/projects/project-list-item";
import CustomSelect from "@/common-components/custom-select";
import SectionHeader from "@/common-components/section-header";
import Preloader from "@/common-components/preloader";

export default {
  name: 'ProjectsView',
  components: {
    SectionHeader,
    CustomSelect,
    ProjectListItem,
    Preloader
  },
  data() {
    return {
      projects: null,
      isLoaded: false,
      options: [
        {name: "filter", value: "new", label: "Сначала новые"},
        {name: "filter", value: "old", label: "Сначала старые"},
      ],
      selected: null
    }
  },
  created() {
    this.getProjectsData()
  },
  mounted() {},
  computed: {
    filteredProjects () {

      const filtered = this.projects

      if(this.selected?.value === 'old') {
        filtered?.sort((a,b) => a.code - b.code)
      }

      if(this.selected?.value === 'new') {
        filtered?.sort((a,b) => b.code - a.code)
      }

      return filtered
    }
  },
  watch: {
    isLoaded: {
      immediate: true,
      handler: async function (value) {
        if (value) {
          await this.$nextTick()
          this.selected = JSON.parse(localStorage?.getItem('value'))
          if (this.selected) {
            this.$refs.customSelect.selectOption(this.selected, false)
          }
        }
      }
    }
  },
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
    },
    setSelected (option) {
      localStorage.setItem('value', JSON.stringify(option))
      this.selected = JSON.parse(localStorage.getItem('value'))
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>