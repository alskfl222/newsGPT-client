export interface NewsItem {
  _id: string,
  model: string,
  keyword: string,
  title: string,
  url: string,
  provider: string,
  time: Date,
  vote: {
    true: number,
    false: number,
  },
  subject: string,
  abstract: string,
  upload_time: string,
  sentiment: {
    overall: string,
    keyword: string,
  },
  related: string[],
  tokens: number
}