export interface NewsItem {
  keyword: string,
  title: string,
  url: string,
  provider: string,
  time: Date,
  vote: {
    true: number,
    false: number,
  },
  topic: string,
  upload_time: string,
  sentiment: {
    overall: string,
    keyword: string,
  },
  related: string[],
  tokens: number
}