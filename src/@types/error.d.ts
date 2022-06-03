export interface ErrorResponse {
  errCode: number
  errMsg: string
}

export type ErrorCodes = Record<string, ErrorResponse>

export interface FirebaseError {
  code: string
  message: string
  name: string
}
