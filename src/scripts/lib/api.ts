import apiInstance from './axios'

export const test = async () => {
  const res = await apiInstance.get('articles')
  return res
}
