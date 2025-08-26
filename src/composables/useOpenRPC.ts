import { ref } from "vue";
import type {OpenrpcDocument} from '@open-rpc/meta-schema'
import $RefParser from "@apidevtools/json-schema-ref-parser";



export function dereferenceOpenRPC(root) {
  function resolveRef(obj) {
    if (Array.isArray(obj)) {
      return obj.map(i => resolveRef(i));
    }
    if (obj && typeof obj === "object") {
      if (obj.$ref && typeof obj.$ref === "string") {
        if (!obj.$ref.startsWith("#/")) {
          throw new Error("Only local refs (#/) are supported");
        }
        const parts = obj.$ref.slice(2).split("/");
        let refObj = root;
        for (const p of parts) {
          if (!(p in refObj)) {
            throw new Error(`Invalid $ref path: ${obj.$ref}`);
          }
          refObj = refObj[p];
        }
        return resolveRef(refObj); // recursive resolution
      }
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, resolveRef(v)])
      );
    }
    return obj;
  }

  return resolveRef(root);
}
export function useOpenRPC() {
    const schema = ref<OpenrpcDocument>()
    const status = ref<'idle' | 'loading' | 'error' | 'success'>('idle')
    const error = ref<string | null>(null)

    async function loadSchema(url: string | OpenrpcDocument ){
        status.value = 'loading'
        let raw: OpenrpcDocument
        if(typeof url === 'string'){
            try{
                const response = await fetch(url)
                raw = await response.json()
                status.value = 'success'
            }catch(e){
                status.value = 'error'
                error.value = (e as Error).message
                schema.value = undefined
                return
            }
        }else{
            raw = url
            status.value = 'success'
        }

        schema.value = dereferenceOpenRPC(raw)
    }

    return {schema, status, error, loadSchema}
}