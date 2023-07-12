import dayjs from 'dayjs';

export function prettyTimeString(time: Date) {
  return dayjs(time).format('YYYY년 MM월 DD일');
}
