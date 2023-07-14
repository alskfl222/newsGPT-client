<script setup>
const config = useRuntimeConfig();
const { data, pending, error, refresh } = await useAsyncData('latest', () =>
  $fetch(`${config.public.SERVER_URL}/latest`)
);

</script>

<template>
  <div class="p-4 b-1 b-black">
    <h1>Index page</h1>
    <div v-if="pending">데이터 로딩 중...</div>
    <div v-if="error">데이터를 불러오는데 실패했습니다: {{ error }}</div>
    <div v-if="data && !pending">
      <MainSearch />
      <div class="grid grid-cols-2 gap-4">
        <MainNewsList
          v-for="(newsList, keyword) in data"
          :key="keyword"
          :keyword="keyword"
          :newsList="newsList"
          :refresh="refresh"
        />
      </div>
      <button @click="refresh">새로 고침</button>
    </div>
  </div>
</template>
