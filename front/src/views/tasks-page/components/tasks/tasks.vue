<template>
  <div class="tasks">
    <Form class="tasks__filters" :form="formFilter" />
    <div v-if="apiState.isLoadTasks" class="loader tasks__loader"></div>
    <List v-else :rows="tasks" :pagination="pagination">
      <template #default="row">
        <div
          class="tasks__task-item"
          :style="{ borderLeft: '5px solid ' + row.data.priority.color }"
          @click="handleClickTaskItem(row.data)"
        >
          <div class="tasks__task-item-info">
            <h2 class="title2">{{ row.data.name }}</h2>
            <ul class="tasks__task-item-params">
              <li
                class="tasks__task-item-param"
                v-if="getNameProject(row.data.projectID)"
              >
                #{{ getNameProject(row.data.projectID) }}
              </li>
              <li
                class="tasks__task-item-param"
                v-if="getNameUser(row.data.userID)"
              >
                #{{ getNameUser(row.data.userID) }}
              </li>
              <li class="tasks__task-item-param">
                #{{ row.data.status.text }}
              </li>
            </ul>
            <label class="label">{{
              "Дата и время создания: " +
                row.data.created.getString("dd MMMM YYYY HH:mm:ss")
            }}</label>
          </div>
          <Button
            v-if="isCan.deleteTask"
            @click.stop="$emit('deleteTask', row.data.id)"
            :type="'delete'"
          />
        </div>
      </template>
    </List>
  </div>
</template>

<script lang="ts" src="./tasks.ts"></script>
<style src="./tasks.css"></style>
