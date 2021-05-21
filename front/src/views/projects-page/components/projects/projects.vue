<template>
  <div class="projects">
    <div
      v-if="apiState.isLoadGetProjects"
      class="loader projects__loader"
    ></div>
    <template v-else>
      <List
        :rows="projects"
        :pagination="pagination"
        @changePage="$emit('changePage', $event)"
      >
        <template #default="row">
          <div
            class="projects__row-project"
            @click="handleClickProjectItem(row.data)"
          >
            <h3 class="projects__row-project-name">
              {{ row.data.name }}
            </h3>
            <Button
              v-if="isCan.deleteProject"
              @click.stop="$emit('deleteProject', row.data.id)"
              :type="'delete'"
            />
          </div>
        </template>
      </List>
      <Popup
        :is-load="apiState.isLoadEditProject"
        v-if="$popups.list.newProject.visible"
        @close="$emit('handleClosePopup')"
      >
        <div v-if="!isEdit && currentProject" class="projects__view">
          <h2 class="title2">{{ currentProject.name }}</h2>
          <p class="text_small" v-if="currentProject.description">
            {{ currentProject.description }}
          </p>
          <Button
            v-if="isCan.editProject"
            class="projects__view-button"
            @click="$emit('toggleIsEdit', true)"
            >Редактировать</Button
          >
        </div>
        <Form
          v-else-if="isCan.editProject"
          :form="form"
          :action="'/v1/api/' + apiPoint"
          :method="'POST'"
        />
      </Popup>
    </template>
  </div>
</template>

<script lang="ts" src="./projects.ts"></script>
<style src="./projects.css"></style>
