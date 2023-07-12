<script setup>
const { data, pending, error, refresh } = await useAsyncData('latest', () =>
  $fetch('http://192.168.100.165:8008/latest')
);

const newsObj = data._value;
</script>

<template>
  <div class="main-container">
    <h1>Index page</h1>
    <div v-if="pending">데이터 로딩 중...</div>
    <div v-if="error">데이터를 불러오는데 실패했습니다: {{ error }}</div>
    <div v-if="data && !pending" class="news-wrapper">
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

<style lang="scss">
  .main-container {
    padding: 1rem;
    border: 1px solid black;
  }

  .news-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    gap: 2rem;

    @media screen and (min-width: 769px) {
      grid-template-columns: repeat(auto-fill, minmax(33.33%, 1fr));      
    }
  }
</style>