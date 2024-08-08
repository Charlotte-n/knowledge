import type { AxiosRequestConfig } from "axios"
import HYRequest from "./request"
import BASE_URL from "./config"


export const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestSuccessFn: (config: AxiosRequestConfig) => {
      console.log('请求成功的拦截')
      return config
    },
    requestFailureFn: (err:any) => {
      console.log('请求失败的拦截')
      return err
    },
    responseSuccessFn: (res:any) => {
        return res
    }
  }
})