import { format } from 'date-fns'

export function parseYoutubeUrl(url: string){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length===11)? match[7] : undefined;
}

export function formatDate(dateUnix: number){
  return format(new Date(dateUnix * 1000), 'd.M.yyyy (HH:mm)')
}