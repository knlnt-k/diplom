<template>
  <div class="users">
    <div v-if="apiState.isLoadUsers" class="loader"></div>
    <template v-else>
      <Input class="users__search" v-model="search" :label="'Поиск'" />
      <List :rows="usersFiltered" class="users__items">
        <template #default="row">
          <div class="label">
            #{{ row.data.login + " #" + row.data.profession.text }}
          </div>
          <div class="users__user-item">
            <h2 class="title2">{{ row.data.fullName }}</h2>
            <Selector
              :options="accesses"
              :class-name="'selector-for-forms'"
              :text-field="'text'"
              :value-field="'id'"
              :is-not-clear="true"
              v-model="row.data.access.id"
              @update:modelValue="$emit('changeUserAccess', row.data)"
            />
          </div>
        </template>
      </List>
    </template>
  </div>
</template>

<script lang="ts" src="./users.ts"></script>
<style src="./users.css"></style>
