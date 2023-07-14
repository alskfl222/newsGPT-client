<script setup lang="ts">
import Chart from './Chart.vue';
import { NewsItem } from '~/types/news';
import { prettyTimeString, determineSentiment } from '~/utils';
const config = useRuntimeConfig();

const props = defineProps({
  keyword: {
    type: String,
    required: true,
  },
  newsList: {
    type: Array as () => NewsItem[],
    default: () => [],
  },
  refresh: {
    type: Function,
    required: true,
  },
});

function voteTrue(newsId: string) {
  const voteHistory = localStorage.getItem('voteHistory')
    ? JSON.parse(localStorage.getItem('voteHistory')!)
    : [];
  if (voteHistory.includes(newsId)) {
    alert('이미 투표하셨습니다');
  } else {
    $fetch(`${config.public.SERVER_URL}/news/${newsId}`, {
      method: 'PUT',
      body: { vote: 1 },
    }).then(() => {
      localStorage.setItem(
        'voteHistory',
        JSON.stringify([...voteHistory, newsId])
      );
      props.refresh();
    });
  }
}

function voteFalse(newsId: string) {
  const voteHistory = localStorage.getItem('voteHistory')
    ? JSON.parse(localStorage.getItem('voteHistory')!)
    : [];
  if (voteHistory.includes(newsId)) {
    alert('이미 투표하셨습니다');
  } else {
    $fetch(`${config.public.SERVER_URL}/news/${newsId}`, {
      method: 'PUT',
      body: { vote: -1 },
    }).then(() => {
      localStorage.setItem(
        'voteHistory',
        JSON.stringify([...voteHistory, newsId])
      );
      props.refresh();
    });
  }
}
</script>

<template>
  <div
    v-for="news in props.newsList"
    :key="news.url"
    class="w-full h-[240px] p-4 flex flex-col gap-2 rd-xl shadow-lg"
  >
    <div class="w-full flex justify-between items-center">
      <div class="h-12 px-2 flex items-center b-1 b-red">
        {{ news.provider }}
      </div>
      <span>{{ prettyTimeString(news.time) }} 분석</span>
    </div>
    <div class="flex justify-between gap-4">
      <div class="flex-none w-[70%] flex flex-col gap-2">
        <a
          :href="news.url"
          target="_blank"
          class="overflow-hidden whitespace-nowrap text-ellipsis"
        >
          <span class="text-lg font-bold">
            {{ news.title }}
          </span>
        </a>
        <div>
          <p>
            <span class="font-bold">
              {{ determineSentiment(news.sentiment.overall) }}
            </span>
            인 내용의 기사입니다
          </p>
          <p>
            <span class="font-bold"> {{ keyword }} </span>를
            <span class="font-bold">
              {{ determineSentiment(news.sentiment.keyword) }}
            </span>
            으로 표현합니다
          </p>
        </div>
      </div>
      <div class="w-[30%] flex flex-col justify-evenly items-center gap-2">
        <Chart
          v-if="news.vote.true !== 0 || news.vote.false !== 0"
          :data="{
            labels: ['적절', '부적절'],
            datasets: [
              {
                data: [news.vote.true, news.vote.false],
                backgroundColor: ['rgb(50, 50, 250)', 'rgb(250, 50, 50)'],
                hoverOffset: 2,
                borderWidth: 0,
              },
            ],
          }"
        />
        <div v-else>평가가 없습니다</div>
        <div class="flex gap-2">
          <button @click="() => voteTrue(news._id)">적절한</button>
          <button @click="() => voteFalse(news._id)">부적절한</button>
        </div>
      </div>
    </div>
  </div>
</template>
