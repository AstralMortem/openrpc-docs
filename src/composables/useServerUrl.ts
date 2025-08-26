import { ref } from "vue"

const url = ref()


export const useServerEndpoint = (newUrl?: string) => {
    if (newUrl){
        url.value = newUrl
    }
    return url
}