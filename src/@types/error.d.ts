export interface ErrorResponse {
  errCode: number
  errMsg: string
}

export type ErrorCodes = Record<string, ErrorResponse>
