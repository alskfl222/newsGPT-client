<script setup lang="ts">
import Item from './Item.vue';
import { NewsItem } from '~/types/news';

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
</script>

<template>
  <div class="p-4 flex flex-col gap-2 b-1 b-red rd-lg">
    <h2 class="text-xl font-bold">{{ keyword }}</h2>
    <div class="flex flex-col gap-2">
      <Item
        :keyword="props.keyword"
        :newsList="props.newsList"
        :refresh="props.refresh"
      />
    </div>
  </div>
</template>
