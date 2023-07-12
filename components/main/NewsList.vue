<script setup lang="ts">
import { NewsItem } from '~/types/news';
import { prettyTimeString } from '~/utils/time';

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
</script>

<template>
  <div class="p-2 b-1 b-red rd-lg">
    <h2>{{ keyword }}</h2>
    <div class="b-1">
      <div
        v-for="news in props.newsList"
        :key="news.url"
        class="p-2 bg-teal-300"
      >
        <h3>{{ news.title }}</h3>
        <p>{{ news.provider }} - {{ prettyTimeString(news.time) }} 분석</p>
        <p>{{ news.vote }}</p>
        <a :href="news.url" target="_blank">기사 보기</a>
      </div>
    </div>
  </div>
</template>
