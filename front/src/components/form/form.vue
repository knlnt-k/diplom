<template>
  <form
    :action="action"
    class="form"
    :key="form.name"
    :method="method"
    @submit.prevent.stop
  >
    <template v-for="(row, indexRow) in form.schema" :key="indexRow">
      <div v-if="getCountElementsInRow(row)" class="form__row">
        <template v-for="(elementKey, indexElement) in row" :key="indexElement">
          <div
            v-if="form.elements[elementKey].html"
            v-html="form.elements[elementKey].html"
            :style="getWidthCell(row)"
          ></div>
          <div
            v-else-if="
              !('vIf' in form.elements[elementKey]) ||
                form.elements[elementKey].vIf
            "
            class="form__cell"
            :class="form.elements[elementKey].class || ''"
            :style="getWidthCell(row)"
          >
            <template v-if="form.elements[elementKey].isPrimitive">
              <br />
            </template>
            <component
              v-else
              :is="
                form.elements[elementKey].component ||
                  form.elements[elementKey].nameComponent
              "
              v-model="form.elements[elementKey].vModel"
              v-bind="form.elements[elementKey].props || {}"
              v-on="form.elements[elementKey].methods || {}"
              :style="form.elements[elementKey].style || {}"
              :disabled="!!form.disabled"
            >
              <template
                v-for="(slot, indexSlot) in form.elements[elementKey].slots"
                :key="indexSlot"
                v-slot:[slot.name]="payload"
              >
                <div v-html="slot.slot(payload)"></div>
              </template>
            </component>
            <transition name="fade">
              <p
                class="form__error text-ellipsis"
                v-if="
                  'valid' in form.elements[elementKey] &&
                    !form.elements[elementKey].valid.isValid &&
                    !form.isValid
                "
                :title="
                  form.elements[elementKey].valid.error ||
                    'Это поле заполнено не корректно'
                "
              >
                {{
                  form.elements[elementKey].valid.error ||
                    "Это поле заполнено не корректно"
                }}
              </p>
            </transition>
          </div>
        </template>
      </div>
    </template>
  </form>
</template>

<script lang="ts" src="./form.ts"></script>
<style>
.form__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.form__cell {
  flex: 0 0 100%;
  margin-bottom: 15px;
}

.form__error {
  color: #d50000;
  font-size: 12px;
  margin-top: 3px;
  cursor: default;
  padding-left: 5px;
}

@media screen and (min-width: 992px) {
  .form__row {
    flex-wrap: nowrap;
    margin-bottom: 15px;
  }

  .form__cell {
    flex: 0 0 auto;
    margin-bottom: 0;
  }
}
</style>
