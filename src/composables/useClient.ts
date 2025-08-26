import { ref } from "vue";
import { useServerEndpoint } from "./useServerUrl";
import { useHeaders } from "./useHeaders";

type Status = 'idle' | 'loading' | 'error' | 'success';

export type JsonRpcRequest = {
    jsonrpc: '2.0';
    method: string;
    params?: any;
    id: string | number;
}

export interface JsonRpcResponse<T = any> {
  jsonrpc: "2.0";
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id: number | string | null;
}

const idCounter = ref(0);
const status = ref<Status>('idle');
const error = ref<any>(null);


export function useRpcClient() {
    const {headers} = useHeaders();
    const baseUrl = useServerEndpoint();


    async function call<T = any>(method: string, params?: any): Promise<T> {
        
        const request: JsonRpcRequest = {
            jsonrpc: '2.0',
            method,
            params,
            id: idCounter.value++,
        }
        
        try{
            status.value = 'loading';
            if (!baseUrl.value){
                throw new Error("No endpoint provided")
            }
            const res = await fetch(baseUrl.value, {
                method: 'POST',
                headers: headers.value,
                body: JSON.stringify(request)
            })

            const data: JsonRpcResponse<T> = await res.json();

            if(data.error){
                throw new Error(`${data.error.code}: ${data.error.message}`);
            }

            status.value = 'success';
            return data.result as T;

        }catch(e){
            status.value = 'error',
            error.value = e
            throw e;
        }
    }   

    return {
        call,
        baseUrl,
        status,
        error
    }
}