import type { AxiosRequestConfig, AxiosResponse } from "axios";

//定义单个接口的拦截器
export interface HYInterceptors<T = AxiosResponse>{
    requestSuccessFn?:(config:AxiosRequestConfig)=>AxiosRequestConfig
    requestFailureFn?:(err:any)=>any
    responseSuccessFn?:(res:T)=>T
    responseFailureFn?:(err:any)=>any
}

export interface HYRequestConfig<T=AxiosResponse> extends AxiosRequestConfig{
    interceptors?:HYInterceptors<T>,
    showLoading?:boolean,
    dataType?:string

}




// 这个 TypeScript 代码定义了两个接口：HYInterceptors 和 HYRequestConfig，用来扩展和增强 Axios 的请求配置和拦截器功能。

// HYInterceptors 接口
// HYInterceptors 接口用于定义请求和响应的拦截器函数。

// typescript
// 复制代码
// export interface HYInterceptors<T = AxiosResponse>{
//     requestSuccessFn?:(config:AxiosRequestConfig)=>AxiosRequestConfig
//     requestFailureFn?:(err:any)=>any
//     responseSuccessFn?:(res:T)=>T
//     responseFailureFn?:(err:any)=>any
// }
// requestSuccessFn?：一个可选函数，在请求成功发送前调用。接收一个 AxiosRequestConfig 对象并返回一个 AxiosRequestConfig 对象。
// requestFailureFn?：一个可选函数，在请求发送失败时调用。接收一个错误对象并返回一个处理后的错误对象或其他任意值。
// responseSuccessFn?：一个可选函数，在响应成功接收时调用。接收一个类型为 T（默认是 AxiosResponse）的响应对象并返回一个相同类型的响应对象。
// responseFailureFn?：一个可选函数，在响应接收失败时调用。接收一个错误对象并返回一个处理后的错误对象或其他任意值。
// HYRequestConfig 接口
// HYRequestConfig 接口扩展了 Axios 的请求配置对象 AxiosRequestConfig，增加了拦截器和其他自定义配置选项。

// typescript
// 复制代码
// export interface HYRequestConfig<T=AxiosResponse> extends AxiosRequestConfig{
//     interceptors?:HYInterceptors<T>,
//     showLoading?:boolean,
//     dataType?:string
// }
// interceptors?：一个可选的 HYInterceptors<T> 对象，用于在请求和响应过程中应用自定义拦截器。
// showLoading?：一个可选的布尔值，用于指示是否在请求过程中显示加载状态。
// dataType?：一个可选的字符串，用于指定请求的数据类型。
// 作用
// 通过定义这些接口，你可以在创建 Axios 请求实例时，传入自定义的拦截器和配置。例如：

// typescript
// 复制代码
// import axios from 'axios';

// const requestConfig: HYRequestConfig = {
//     url: '/api/data',
//     method: 'get',
//     interceptors: {
//         requestSuccessFn: (config) => {
//             // 在请求发送前做一些处理
//             console.log('Request success:', config);
//             return config;
//         },
//         responseSuccessFn: (response) => {
//             // 在响应接收后做一些处理
//             console.log('Response success:', response);
//             return response;
//         }
//     },
//     showLoading: true,
//     dataType: 'json'
// };

// axios(requestConfig).then(response => {
//     console.log('Data:', response.data);
// }).catch(error => {
//     console.error('Error:', error);
// });