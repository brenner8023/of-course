<template>
  <div class="of-course-container">
    <NSpace justify="end">
      <NSwitch v-model:value="isAppOn" />
    </NSpace>
    <FormCard v-show="isAppOn" />
    <EmptyImg v-show="!isAppOn" />
  </div>
</template>

<script lang="ts" setup>
import { useAppOn } from '@/hooks/useApp'
import FormCard from '@/components/FormCard.vue'
import EmptyImg from '@/components/EmptyImg.vue'

const {
  isAppOn,
} = useAppOn()
</script>

<style scoped>
.of-course-container {
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    height: 100vh;
}
</style>
