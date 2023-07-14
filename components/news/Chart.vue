<script setup lang="ts">
import {
  Chart,
  PieController,
  Title,
  Tooltip,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { ChartData } from 'chart.js';

Chart.register(
  PieController,
  Title,
  Tooltip,
  ArcElement,
  CategoryScale,
  LinearScale
);

const props = defineProps<{
  data: ChartData
}>();

const chart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if(chart.value) {
    new Chart(chart.value, {
      type: 'pie',
      data: props.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
              boxPadding: 5,
              displayColors: true,
            },
        },
      },
    });
  }
});
</script>

<template>
  <div class="w-[100px] h-[100px]">
    <canvas ref="chart"></canvas>
  </div>
</template>
