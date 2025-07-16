import { debounce, throttle } from "lodash-es";

// 성능 최적화 유틸리티
export const debounced: typeof debounce = debounce;
export const throttled: typeof throttle = throttle;
