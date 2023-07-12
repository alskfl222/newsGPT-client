<script setup lang="ts">
import { NewsItem } from '~/types/news';

const route = useRoute();
const newsId = route.params.id;
const { data, pending, error } = await useAsyncData<NewsItem>(
  `news_${newsId}`,
  () => $fetch(`${process.env.SERVER_URL}/news/${newsId}`)
);

const newsObj: Ref<NewsItem | null> = ref(null);
if (data.value) {
  newsObj.value = data.value;
}
</script>

<template>
  <div v-if="pending">데이터를 불러오는 중...</div>
  <div v-if="error">데이터 로딩 에러: {{ error }}</div>
  <div v-if="newsObj">
    <div>{{ newsObj.keyword }}</div>
    <div>{{ newsObj.title }}</div>
    <div>{{ newsObj.url }}</div>
    <div>{{ newsObj.provider }}</div>
    <div>{{ newsObj.time }}</div>
    <div>{{ newsObj.related }}</div>
    <div>{{ newsObj.vote }}</div>
    <div>{{ newsObj.topic }}</div>
    <div>{{ newsObj.sentiment }}</div>
  </div>
  <div v-else>잘못된 ID입니다.</div>
</template>

<style lang="scss">
</style>