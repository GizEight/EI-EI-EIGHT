export interface GetMicroCmsRequest {
  offset: number
  limit: number
  filters: string
  fields: string
}
export interface GetMicroCmsResponse<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
export interface ExceptingGetMicroCmsResponse {
  id: string
}
