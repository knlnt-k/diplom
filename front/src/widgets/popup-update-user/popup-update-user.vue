<template>
  <div class="popup-update-user" v-if="isVisible">
    <Popup :is-load="apiState.isLoad" @close="handleClose">
      <template #header>
        <div class="label-mark" v-if="user.access">
          {{ "Доступ - " + user.access.text }}
        </div>
      </template>
      <h2 class="title2">
        {{ user.fullName }}
        <span class="label" v-if="user.profession">{{
          user.profession.text
        }}</span>
      </h2>
      <Form :form="form" />
    </Popup>
  </div>
</template>

<script lang="ts" src="./popup-update-user.ts"></script>
<style>
.popup-update-user .popup__body {
  max-width: 500px;
}

.popup-update-user .title2 {
  margin-bottom: 20px;
}

.popup-update-user .info-message {
  margin-bottom: 20px;
}
</style>
