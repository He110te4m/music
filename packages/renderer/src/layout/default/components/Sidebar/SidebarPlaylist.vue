<script lang="ts" setup>
import { ref, watch, unref } from 'vue'
import { useVModel } from '@vueuse/core'
import { type FormInst, type FormRules, useMessage } from 'naive-ui'

type FormData = Record<'title', string>
interface Props {
  show: boolean;
  title: string;
  value: string;
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:show', show: boolean): void;
  (e: 'submit', data: FormData): void;
}>()

const isShow = useVModel(props, 'show', emits)

const submitData = ref<FormData>({ title: '' })
watch(() => props.value, (title: string) => {
  submitData.value.title = title
})

const titleMinLen = 1
const titleMaxLen = 60
const titleIllegalChars = ['@', '#', '<', '>', '{', '}']
const formRules: FormRules = {
  title: {
    required: true,
    trigger: ['blur'],
    validator(_, title) {
      if (title.length < titleMinLen || title.length > titleMaxLen) {
        return new Error(`播放列表名字长度应该在 ${titleMinLen}-${titleMaxLen} 之间`)
      }
      if (titleIllegalChars.some(char => title.includes(char))) {
        return new Error(`播放列表名字不能含有 "${titleIllegalChars.join('"、"')}"`)
      }
      return true
    }
  }
}
const formRef = ref<FormInst | null>(null)
const message = useMessage()
function onSubmit() {
  formRef.value?.validate(errors => {
    if (!errors) {
      emits('submit', unref(submitData))
      isShow.value = false
      return
    }
    message.error('校验失败，请检查输入')
  })
}
</script>

<template>
  <NModal
    v-model:show="isShow"
    class="default-sidebar__playlist-modal"
  >
    <NCard
      class="default-sidebar__playlist-modal__content"
      :title="title"
      :bordered="false"
      size="small"
      closable
      @close="isShow = false"
    >
      <NForm
        ref="formRef"
        label-placement="left"
        label-width="auto"
        :model="submitData"
        :rules="formRules"
      >
        <NFormItem
          label="播放列表名字"
          path="title"
        >
          <NInput
            v-model:value="submitData.title"
            placeholder="输入播放列表名字"
          />
        </NFormItem>
      </Nform>
      <template #action>
        <div class="default-sidebar__playlist-modal__operation">
          <NButton
            class="default-sidebar__playlist-modal__operation--btn"
            type="primary"
            @click="onSubmit"
          >
            确认
          </NButton>
          <NButton
            class="default-sidebar__playlist-modal__operation--btn"
            @click="isShow = false"
          >
            取消
          </NButton>
        </div>
      </template>
    </NCard>
  </NModal>
</template>

<style lang="less">
.default-sidebar__playlist-modal {
  &__content {
    width: @xsModalSize;
  }

  &__operation {
    display: flex;
    justify-content: flex-end;

    &--btn {
      & + & {
        margin-left: 8px;
      }
    }
  }
}
</style>
