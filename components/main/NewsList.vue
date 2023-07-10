<script setup lang="ts">
import dayjs from 'dayjs';

interface NewsItem {
  title: string;
  provider: string;
  time: Date;
  url: string;
}

const props = defineProps({
  keyword: {
    type: String,
    required: true,
  },
  newsList: {
    type: Array as () => NewsItem[],
    default: () => [],
  },
});

console.log(props)

const prettyTimeString = (time: Date) => {
  return dayjs(time).format('YYYY년 MM월 DD일');
};
</script>

<template>
  <div class="news-list-wrapper">
    <h2>{{ keyword }}</h2>
    <div v-for="news in props.newsList" :key="news.url">
      <h3>{{ news.title }}</h3>
      <p>{{ news.provider }} - {{ prettyTimeString(news.time) }}</p>
      <p></p>
      <a :href="news.url" target="_blank">기사 보기</a>
    </div>
  </div>
</template>

<style lang="scss">
  .news-list-wrapper {
    padding: 1rem;
    border: 1px solid black;
    border-radius: 2rem;
  }
</style>