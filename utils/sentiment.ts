export function determineSentiment(sentimentString: string) {
  if (sentimentString === 'Positive') {
    return "긍정적"
  } else if (sentimentString === 'Negative') {
    return "부정적"
  } else {
    return "중립적"
  }
}