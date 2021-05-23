<template>
  <div class="popup-create-task" v-if="$popups.list.newTask.visible">
    <Popup :is-load="apiState.isLoad" @close="handleClose">
      <template #header v-if="task && !isEdit">
        <div class="label-mark" style="width: 100%" v-if="task.created">
          {{ task.created.getString("dd MMMM YYYY HH:mm:ss") }}
        </div>
        <button
          v-if="isCan.editTask"
          class="label-mark label-mark__button"
          @click="handleClickEditButton"
        >
          Редактировать
        </button>
        <div class="label-mark" v-if="task.priority">
          <span
            class="label-mark__mark"
            :style="{ backgroundColor: task.priority.color }"
          ></span>
          {{ task.priority.text }}
        </div>
        <div class="label-mark" v-if="task.status">#{{ task.status.text }}</div>
      </template>

      <template #default>
        <template v-if="task && !isEdit">
          <div class="popup-create-task__view-form" v-if="task">
            <div class="popup-create-task__view-task">
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

              <Button @click="init">Обновить</Button>

              <ul
                class="popup-create-task__time-and-comments"
                v-if="timesAndComments.length"
              >
                <li
                  class="popup-create-task__time-and-comment"
                  v-for="(timeAndComment, indexTAC) in timesAndComments"
                  :key="indexTAC"
                  :class="{
                    'popup-create-task__time-and-comment_my': isMyComment(
                      timeAndComment
                    )
                  }"
                >
                  <h3 class="title3">
                    {{ getNameUser(timeAndComment.userID) }}
                    <span
                      class="popup-create-task__delete-button-time-and-comment"
                      v-if="
                        isCan.deleteComment(timeAndComment.userID) &&
                          !timeAndComment.time
                      "
                      @click="handleClickDeleteComment(timeAndComment)"
                    ></span>
                  </h3>
                  <p class="text_small">
                    {{ timeAndComment.comment }}
                  </p>
                  <label class="label">{{
                    timeAndComment.created.getString("dd MMMM YYYY HH:mm:ss")
                  }}</label>
                </li>
              </ul>
            </div>
            <div class="popup-create-task__view-settings">
              <Selector
                class="popup-create-task__view-settings-selector-statuses"
                :options="form.elements.status.props.options"
                :class-name="'selector-for-forms'"
                :text-field="'text'"
                :value-field="'id'"
                :label="'Статус'"
                v-model="form.elements.status.vModel"
                @update:model-value="handleChangeStatusTask"
              />
              <Form
                :method="'POST'"
                :action="'/v1/api/set-time'"
                class="popup-create-task__time-form"
                :form="formTime"
              />
              <Form
                :method="'POST'"
                class="popup-create-task__comment-form"
                :action="'/v1/api/set-comment'"
                :form="formComments"
              />
              <Button @click="init">Обновить</Button>
            </div>
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
