import { nowDate } from './format'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugClientLog = (first?: any, second?: any) => {
  // eslint-disable-next-line no-console
  console.log(`[ ${nowDate()} ] ${first}`, second || '')
}
