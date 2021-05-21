<template>
  <div
    class="select"
    :class="[{ [className]: !!className, select_disabled: !!disabled }]"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <label
      class="label text-ellipsis"
      :title="label"
      :class="{
        required: isRequired,
        label_hide: !(label || (placeholder && modelValue !== null)),
        [className + '_label']: className,
        [className + '_hide']:
          className && !(label || (placeholder && modelValue !== null))
      }"
      >{{ label || (modelValue !== null ? placeholder : "") }}
    </label>
    <div
      class="select__wrapper"
      :class="[
        { [className + '__wrapper']: className },
        { [className + '__wrapper_open']: isOpen && className },
        { [className + '__wrapper_error']: isError && className },
        { select__wrapper_open: isOpen }
      ]"
      :title="isTitle ? current || placeholder || '' : ''"
      @click.self="handleClickCurrent"
    >
      <input
        v-show="isSearch && isOpen"
        ref="smallSelectOrSearchInput"
        v-model="searchText"
        type="text"
        class="select__search"
        :class="{ [className + '__search']: className }"
        :disabled="!!disabled"
        @input="debouncedEmitOfSearchInput"
        @focus="handleSearch($event)"
      />
      <div
        v-show="!isSearch || (isSearch && !isOpen)"
        class="select__current text-ellipsis"
        :class="{
          [className + '__current']: className,
          select__placeholder: placeholder && isSelectNeverValue,
          [className + '__placeholder']:
            placeholder && isSelectNeverValue && className
        }"
        @click="handleClickCurrent"
      >
        {{ placeholder && isSelectNeverValue ? placeholder : current }}
      </div>
      <button
        v-if="isShowClearButton && !isNotClear"
        data-testid="selectorClearBtn"
        class="select__clear-button"
        :class="{ [className + '__clear-button']: !!className }"
        @click="handleClickClearButton"
      ></button>
      <ul
        v-show="isOpen"
        :class="{ [className + '__select']: className }"
        data-testid="selectorList"
        class="select__select"
      >
        <template v-if="viewOptions && viewOptions.length">
          <li
            v-if="multiple"
            class="select__option"
            :class="classNamesForOptionSelectAll"
            @click="handleClickOptionSelectAll"
          >
            Все
          </li>
          <!--          <template >-->
          <li
            v-for="(option, index) in viewOptions"
            v-show="
              !isSearch ||
                'handleSearch' in $attrs ||
                (isSearch &&
                  (textField ? option[textField] : option)
                    .toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase()))
            "
            :key="index"
            data-testid="item"
            :class="getClassNamesForOption(option)"
            class="select__option"
            @click="handleClickOption(option, index)"
          >
            <slot v-if="$slots.default" :option="option" :index="index"></slot>
            <template v-else>
              {{ textField ? option[textField] : option }}
            </template>
          </li>
          <!--          </template>-->
        </template>
        <li
          v-else
          class="select__option"
          :class="{ [className + '__option']: !!className }"
        >
          Список пуст
        </li>
      </ul>
    </div>
    <div
      v-if="errorText !== undefined"
      :style="{ opacity: Number(isError) }"
      class="error-text"
      :title="errorText || 'Это поле обязательно к заполнению'"
    >
      {{ errorText || "Это поле обязательно к заполнению" }}
    </div>
  </div>
</template>

<script lang="ts" src="./selector.ts"></script>
<style src="./selector.css"></style>
