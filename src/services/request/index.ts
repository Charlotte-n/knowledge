import type { AxiosInstance } from "axios"
import type { HYRequestConfig } from "./type"
import axios from "axios"


class HYRequest{
    instance: AxiosInstance

    constructor(config:HYRequestConfig){
        this.instance = axios.create(config)

        //添加拦截器
        this.instance.interceptors.request.use(config=>{

            return config
        },
        (err)=>{

            return err
        }
    )

        this.instance.interceptors.response.use((res:{data:any})=>{
            return res.data
        },
        (err)=>{
            return err.response.data
        }
    )
    }

    //封装请求
    request<T = any>(config:HYRequestConfig<T>){
        return new Promise<T>((resolve,reject)=>{
            this.instance.request<any,T>(config).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    //封装get
    get<T = any>(config:HYRequestConfig<T>){
        return this.request<T>({...config,method:'get'})
    }

    //封装post
    post<T = any>(config:HYRequestConfig<T>){
        return this.request<T>({...config,method:'post',onUploadProgress(event){
            if(config.onUploadProgress){
                config.onUploadProgress(event)
            }
        }})
    }

}

export default HYRequest