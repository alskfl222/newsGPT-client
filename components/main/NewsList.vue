<script setup lang="ts">
import { NewsItem } from '~/types/news';
import { prettyTimeString, determineSentiment } from '~/utils';

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
  <div class="p-4 flex flex-col gap-2 b-1 b-red rd-lg">
    <h2 class="text-xl font-bold">{{ keyword }}</h2>
    <div class="flex flex-col gap-2">
      <div
        v-for="news in props.newsList"
        :key="news.url"
        class="p-2 flex flex-col rd-lg bg-teal-100"
      >
        <a
          :href="news.url"
          target="_blank"
          class="overflow-hidden whitespace-nowrap text-ellipsis"
        >
          <span class="text-lg font-bold">
            {{ news.title }}
          </span>
        </a>
        <p>{{ news.provider }} - {{ prettyTimeString(news.time) }} 분석</p>
        <div>
          <p>
            <span class="font-bold">
              {{ determineSentiment(news.sentiment.overall) }} </span
            >인 내용의 기사입니다
          </p>
          <p>
            <span class="font-bold">
              {{ keyword }}
            </span>를
            <span class="font-bold">
              {{ determineSentiment(news.sentiment.keyword) }}
            </span>으로 표현합니다
          </p>
        </div>
        <div class="self-center w-[50%] flex justify-between">
          <button>적절한 : {{ news.vote.true }}</button
          ><button>부적절한 : {{ news.vote.false }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
