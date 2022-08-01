import got from 'got';

export const notify = (message: string) => {
  const api = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${message}`;
  return got(api);
}
