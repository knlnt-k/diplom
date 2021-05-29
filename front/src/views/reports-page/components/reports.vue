<template>
  <div class="reports">
    <ul class="reports__list">
      <template v-for="(report, key) in reports.list" :key="key">
        <li
          v-if="report && key !== 'empty'"
          class="reports__item text-ellipsis"
          @click="handleClickReportItem(report, key)"
        >
          {{ report.text }}
        </li>
      </template>
    </ul>

    <Selector
      class="reports__selector-projects"
      v-if="reports.currentName === 'gantReport'"
      v-model="projectID"
      :options="projects"
      :text-field="'name'"
      :value-field="'id'"
      :class-name="'selector-for-forms'"
      :label="'Проект'"
    />

    <div class="reports__chart">
      <div id="chart" v-if="reports.currentName"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./reports.ts"></script>
<style>
.reports__list {
  display: flex;
  flex-direction: column;
}

.reports__item {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 7px;
  background-color: #eeeeee;
  transition: background-color 0.3s;
  cursor: pointer;
  margin: 10px;
}

.reports__item:hover {
  background-color: #e0e0e0;
}

.reports__chart {
  margin-top: 100px;
  overflow: auto;
}

.reports__selector-projects {
  margin-top: 20px;
}

@media screen and (min-width: 768px) {
  .reports__list {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
