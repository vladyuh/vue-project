<template>
  <div class="styles styles-container">
    <section>
      <div class="container">
        <section-header
            :level="1"
            text="Заголовок H1"
        />
        <section-header
            :level="2"
            text="Заголовок H2"
        />
        <section-header
            :level="3"
            text="Заголовок H3"
        />
        <section-header
            :level="4"
            text="Заголовок H4"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Иконки</h2>
        <div class="icons" style="display: flex; flex-wrap: wrap; gap: 12px">
          <icon
              icon-name="ic_home"
              width="24"
              height="24"
          />
          <icon
              icon-name="ic_apps"
              width="24"
              height="24"
          />
          <icon
              icon-name="ic_person"
              width="24"
              height="24"
          />
          <icon
              icon-name="ic_projects"
              width="24"
              height="24"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Хлебные крошки</h2>
        <breadcrumbs
            :items="breadcrumbs"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Icon Buttons</h2>
        <div class="buttons" style="display: flex; flex-wrap: wrap; gap: 16px;">
          <icon-btn
              filled
              icon="ic_home"
          />
          <icon-btn
              icon="ic_apps"
          />
          <icon-btn
              outline
              icon="ic_projects"
          />
          <icon-btn
              no-bg
              icon="ic_person"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Кнопки</h2>
        <div class="buttons" style="display: flex; flex-wrap: wrap; gap: 16px;">
          <btn elevated><span>Elevated</span></btn>
          <btn><span>Normal</span></btn>
          <btn tonal><span>Tonal</span></btn>
          <btn outline><span>Outline</span></btn>
          <btn notbg><span>Text</span></btn>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Чекбоксы</h2>
        <checkbox
            label="Unchecked"
        />
        <checkbox
            label="Unchecked and disabled"
            :disabled="true"
        />
        <checkbox
            label="Checked"
            :value="true"
        />
        <checkbox
            label="Checked and disabled"
            :disabled="true"
            :value="true"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Переключатели</h2>
        <switcher>
          <span>Not active</span>
        </switcher>
        <switcher
            :value="true"
        >
          <span>Active</span>
        </switcher>
        <switcher
            :value="true"
            :disabled="true"
        >
          <span>Active and disabled</span>
        </switcher>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Радиокнопки</h2>
        <radio
            name="radio"
            label="Unchecked"
        />
        <radio
            name="radio"
            label="Unchecked and disabled"
            :disabled="true"
        />
        <radio
            name="radio"
            label="Checked and disabled"
            :disabled="true"
            :value="true"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Выпадающий список</h2>
        <div class="selects" style="display: flex; flex-direction: column; gap: 12px">
          <custom-select
              label="Dropdown"
              placeholder="Select option"
              :options="options"
          />
          <custom-select
              label="Dropdown"
              placeholder="Select option"
              icon-name="ic_apps"
              :options="options"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Текстовые поля</h2>
        <div class="inputs" style="display: flex; flex-direction: column; gap: 12px">
          <input-field
              type="text"
              name="user"
              placeholder="Your name"
              label="Name"
          />
          <input-field
              icon-name="ic_apps"
              type="tel"
              name="phone"
              placeholder="Your phone"
              label="Phone"
          />
          <input-field
              :is-input="false"
              name="message"
              placeholder="Your message"
              label="Message"
          />
          <input-field
              :is-input="false"
              icon-name="ic_apps"
              name="message"
              placeholder="Additional info"
              label="Info"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Вкладки</h2>
        <toggles
            :toggles="toggles.items"
            @active-index-change="getActiveTab($event)"
        />
        <div v-if="toggles.activeToggle==='toggle-1'">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <div v-if="toggles.activeToggle==='toggle-2'">
          Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </div>
        <div v-if="toggles.activeToggle==='toggle-3'">
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining
          essentially
          unchanged.
        </div>
        <div v-if="toggles.activeToggle==='toggle-4'">
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Модальное окно</h2>
        <btn
            @click="openCheckboxModal"
        >
          <span>Показать модальное окно 1</span>
        </btn>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Bottom Sheet</h2>
        <btn
            @click="$refs.bottomSheet.open()"
        >
          <span>Показать Bottom Sheet</span>
        </btn>
        <bottom-sheet
            ref="bottomSheet"
        >
          <h4>Текстовые поля</h4>
          <div class="inputs" style="display: flex; flex-direction: column; gap: 12px">
            <input-field
                type="text"
                name="user"
                placeholder="Your name"
                label="Name"
            />
            <input-field
                icon-name="ic_apps"
                type="tel"
                name="phone"
                placeholder="Your phone"
                label="Phone"
            />
            <input-field
                :is-input="false"
                name="message"
                placeholder="Your message"
                label="Message"
            />
            <input-field
                :is-input="false"
                icon-name="ic_apps"
                name="message"
                placeholder="Additional info"
                label="Info"
            />
          </div>
        </bottom-sheet>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import Breadcrumbs from "@/common-components/breadcrumbs";
import Btn from "@/common-components/btn";
import Checkbox from "@/common-components/checkbox";
import CustomSelect from "@/common-components/custom-select";
import InputField from "@/common-components/input-field";
import radio from "@/common-components/radio";
import Toggles from "@/common-components/toggles";
import BottomSheet from "@/common-components/bottom-sheet";
import Switcher from "@/common-components/switcher";
import sectionHeader from "@/common-components/section-header";
import Icon from "@/common-components/icon";
import IconBtn from "@/common-components/icon-btn";

export default {
  name: 'StylesView',
  components: {
    IconBtn,
    Icon,
    Switcher,
    BottomSheet,
    Toggles,
    CustomSelect,
    Checkbox,
    Breadcrumbs,
    Btn,
    InputField,
    radio,
    sectionHeader,
  },
  data() {
    return {
      options: [
        {name: "Option 1", value: "Option 1", label: "Option 1"},
        {name: "Option 2", value: "Option 2", label: "Option 2"},
        {name: "Option 3", value: "Option 3", label: "Option 3"},
        {name: "Option 4", value: "Option 4", label: "Option 4"},
        {name: "Option 5", value: "Option 5", label: "Option 5"},
        {name: "Option 6", value: "Option 6", label: "Option 6"}
      ],
      toggles: {
        activeToggle: null,
        items: [
          {name: "Toggle 1", code: "toggle-1"},
          {name: "Toggle 2", code: "toggle-2"},
          {name: "Toggle 3", code: "toggle-3"},
          {name: "Toggle 4", code: "toggle-4"},
        ],
      },
    }
  },
  mounted() {
    this.toggles.activeToggle = this.toggles?.items[0]?.code
  },
  computed: {
    ...mapGetters(['breadcrumbs'])
  },
  methods: {
    ...mapActions(['openModal']),
    getActiveTab(event) {
      this.toggles.activeToggle = event
    },
    openCheckboxModal() {
      this.openModal({
        name: "checkbox-modal",
        props: {
          isCloseBtn: true,
        },
        component: '',
        replace: true
      })
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>
