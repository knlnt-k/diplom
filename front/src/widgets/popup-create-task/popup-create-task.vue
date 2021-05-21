<template>
  <div class="popup-create-task">
    <Popup
      :is-load="apiState.isLoad"
      v-if="$popups.list.newTask.visible"
      @close="handleClose"
    >
      <template #header v-if="task && !isEdit">
        <div
          class="popup-create-task__header-label"
          style="width: 100%"
          v-if="task.created"
        >
          {{ task.created.getString("dd MMMM YYYY HH:mm:ss") }}
        </div>
        <button
          v-if="isCan.editTask"
          class="popup-create-task__header-label popup-create-task__header-label-button"
          @click="handleClickEditButton"
        >
          Редактировать
        </button>
        <div class="popup-create-task__header-label" v-if="task.priority">
          <span
            class="popup-create-task__header-label-mark"
            :style="{ backgroundColor: task.priority.color }"
          ></span>
          {{ task.priority.text }}
        </div>
        <div class="popup-create-task__header-label" v-if="task.status">
          #{{ task.status.text }}
        </div>
      </template>

      <template #default>
        <template v-if="task && !isEdit">
          <div class="popup-create-task__view-form" v-if="task">
            <h2 class="title2">{{ task.name }}</h2>
            <template v-if="task.description">
              <label class="label">Описание задачи</label>
              <p class="text_small">
                {{ task.description }}
              </p>
            </template>
            <label class="label">Исполнитель</label>
            <p class="text_small">
              {{ getNameUser(task.userID) || "Не выбран" }}
            </p>
            <label class="label">Проект</label>
            <p class="text_small">
              {{ getNameProject(task.projectID) || "Не выбран" }}
            </p>
            <ul
              class="popup-create-task__time-and-comments"
              v-if="timesAndComments.length"
            >
              <li
                class="popup-create-task__time-and-comment"
                v-for="(timeAndComment, indexTAC) in timesAndComments"
                :key="indexTAC"
              >
                <h3 class="title3">
                  {{ getNameUser(timeAndComment.userID) }}
                </h3>
                <p class="text_small">
                  {{ "Затрачено " + timeAndComment.time.getString() }}
                </p>
                <label class="label">{{
                  timeAndComment.created.getString("dd MMMM YYYY HH:mm:ss")
                }}</label>
              </li>
            </ul>
            <Form
              :method="'POST'"
              :action="'/v1/api/set-time'"
              class="popup-create-task__time-form"
              :form="formTime"
            />
          </div>
        </template>
        <Form
          v-else-if="isCan.editTask"
          :form="form"
          :action="'/v1/api/' + isEdit ? 'update-task' : 'create-task'"
          :method="isEdit ? 'PUT' : 'POST'"
        />
      </template>
    </Popup>
  </div>
</template>

<script lang="ts" src="./popup-create-task.ts"></script>
<style src="./popup-create-task.css"></style>
