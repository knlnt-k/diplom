<template>
  <div class="home">
    <div class="home__type-user">
      <input v-model.number="formData.isCompany" type="checkbox" id="type_0" />
      <label
        for="type_0"
        :class="{ 'home__type-user_enabled': formData.isCompany }"
      >
        Компания
      </label>
      <label
        for="type_0"
        :class="{ 'home__type-user_enabled': !formData.isCompany }"
      >
        Пользователь
      </label>
    </div>
    <form action="/" class="home__form" @submit.prevent>
      <Input
        v-model="formData.name"
        placeholder="name"
        :disabled="!formData.isSignUp"
      />
      <Input v-model="formData.login" placeholder="login" />
      <Input
        v-model="formData.password"
        placeholder="pass"
        :type="'password'"
      />
      <Selector
        :disabled="formData.isCompany"
        v-model="formData.companyID"
        :class-name="'selector-for-forms'"
        :options="companies"
        :value-field="'id'"
        :text-field="'name'"
      />
      <div class="home__type-auth">
        <input v-model.number="formData.isSignUp" type="checkbox" id="type_1" />
        <label
          for="type_1"
          :class="{ 'home__type-auth_enabled': formData.isSignUp }"
        >
          Регистрация
        </label>
        <label
          for="type_1"
          :class="{ 'home__type-auth_enabled': !formData.isSignUp }"
        >
          Вход
        </label>
      </div>
      <Button @click="handleClickCreateCompanyButton">{{
        formData.isSignUp ? "Зарегистрироваться" : "Войти"
      }}</Button>
    </form>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style src="./home.css"></style>
