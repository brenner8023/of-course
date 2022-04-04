<template>
  <NCard
    title="掘金一键三连插件"
    embedded
    :bordered="false"
  >
    <NSpace :vertical="true">
      <NCheckbox
        v-model:checked="formData.agree"
        :disabled="true"
      >
        点赞
      </NCheckbox>
      <NCheckbox v-model:checked="formData.collect">
        收藏
      </NCheckbox>
      <NCheckbox v-model:checked="formData.follow">
        关注
      </NCheckbox>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { useCheck } from '@/hooks/useCheck'

const { formData } = useCheck()
</script>
