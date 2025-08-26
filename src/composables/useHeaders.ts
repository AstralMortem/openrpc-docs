import { ref } from "vue"

const headers = ref<{ [key: string]: string }>({
        'Content-Type': 'application/json'
    })

export const useHeaders = () => {
    

    const setHeader = (key: string, value: string) => {
        headers.value[key] = value
    }

    const removeHeader = (key: string) => {
        delete headers.value[key]
    }

    return {
        headers,
        setHeader,
        removeHeader
    }

}