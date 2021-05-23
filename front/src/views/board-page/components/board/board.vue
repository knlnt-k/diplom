<template>
  <div class="board">
    <Selector
      :options="projects"
      :text-field="'name'"
      :value-field="'id'"
      :class-name="'selector-for-forms'"
      :label="'Проект'"
      v-model="filterTask.projectId"
    />
    <div class="board__wrapper">
      <div class="board__row board__row-head">
        <div class="board__cell board__first_cell board__head-cell"></div>
        <div
          class="board__cell board__head-cell text-ellipsis"
          v-for="(statuses, indexStatuses) in board[0].statuses"
          :key="indexStatuses"
        >
          {{ statuses.status.text }}
        </div>
      </div>
      <div class="board__row" v-for="(row, indexRow) in board" :key="indexRow">
        <div
          class="board__cell board__first_cell board__head-first_cell"
          :style="{
            backgroundColor: row.priority.color
          }"
        >
          <button
            class="board__toggle-show-cells board__head-toggle-show-cells text-ellipsis"
            :style="{
              backgroundColor: row.isShow ? row.priority.color : '#ffffff',
              border: `1px solid ${
                !row.isShow ? row.priority.color : '#ffffff'
              }`
            }"
            @click="handleToggleShowCells(row, indexRow, board)"
          >
            <span class="board__count-cells-in-toggle"
              >#{{
                row.statuses.reduce((c, s) => (c += s.tasks.length), 0)
              }}</span
            >
            {{ row.priority.text }}
          </button>
        </div>
        <template
          v-for="(statuses, indexStatuses) in row.statuses"
          :key="indexStatuses"
        >
          <div
            v-show="row.isShow && statuses.tasks.length"
            class="board__cell"
            :style="{ width: 100 / row.statuses.length + '%' }"
          >
            <button
              class="board__toggle-show-cells text-ellipsis"
              :style="{
                backgroundColor: statuses.isShow ? '#c5cae9' : '#ffffff',
                border: `1px solid ${!statuses.isShow ? '#c5cae9' : '#ffffff'}`
              }"
              @click="
                handleToggleShowCells(statuses, indexStatuses, row.statuses)
              "
            >
              <span class="board__count-cells-in-toggle">{{
                statuses.tasks.length
              }}</span>
              {{ statuses.status.text }}
            </button>
            <template
              v-for="(task, indexTask) in statuses.tasks"
              :key="indexTask"
            >
              <div
                v-show="statuses.isShow"
                class="board__task"
                @click="handleClickTask(task)"
              >
                {{ task.name }}
                <Button
                  v-if="isCan.deleteTask"
                  :type="'delete'"
                  @click.stop="$emit('deleteTask', task.id)"
                />
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./board.ts"></script>
<style src="./board.css"></style>
