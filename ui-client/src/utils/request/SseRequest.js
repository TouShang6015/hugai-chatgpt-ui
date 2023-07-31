import {EventSourcePolyfill} from 'event-source-polyfill'
import {getToken} from "@/utils/auth";

const apiUrl = process.env.VUE_APP_BASE_API

export function linkSseEvent() {
  return new EventSourcePolyfill(`${apiUrl}/sse/connect`, {
    retryOnTimeout: false,
    autoReconnectTimeMs: -1,
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
  });
}
