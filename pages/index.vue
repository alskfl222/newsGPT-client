<script setup>
const { data, pending, error, refresh } = await useAsyncData('latest', () =>
  $fetch('http://192.168.100.165:8008/latest')
);

const newsObj = data._value;
</script>

<template>
  <div class="p-4 b-1 b-black">
    <h1>Index page</h1>
    <div v-if="pending">데이터 로딩 중...</div>
    <div v-if="error">데이터를 불러오는데 실패했습니다: {{ error }}</div>
    <div v-if="data && !pending" class="grid grid-cols-2 gap-4">
      <MainNewsList
        v-for="(newsList, keyword) in newsObj"
        :key="keyword"
        :keyword="keyword"
        :newsList="newsList"
      />
      <button @click="refresh">새로 고침</button>
    </div>
  </div>
</template>
