/**
 * @fileoverview
 * 이 패키지는 프로젝트 전반에서 사용되는 유틸리티 함수들을 모아놓은 곳입니다.
 *
 * ## 라이브러리 사용 규칙
 *
 * 기능이 중복되는 라이브러리의 무분별한 추가를 방지하기 위해,
 * 각 기능별로 아래의 표준 라이브러리 사용을 권장합니다.
 *
 * - **날짜/시간:** `date-fns`
 * - **정밀한 숫자 계산:** `decimal.js`
 * - **범용 유틸리티:** `lodash-es`
 *
 * 새로운 유틸리티 함수를 추가할 때는, 위 라이브러리를 최대한 활용해주세요.
 */

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce, throttle } from "lodash-es";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

// 날짜 관련 유틸리티
export const formatDate = (date: Date | string, formatStr: string = "yyyy-MM-dd") => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ko });
};

export const formatRelativeTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
};

// 성능 최적화 유틸리티
export const debounced: typeof debounce = debounce;
export const throttled: typeof throttle = throttle;

// ID 생성 유틸리티
export const generateId = () => uuidv4();

// 쿠키 관련 유틸리티
export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(name, value, options);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

// 문자열 유틸리티
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const capitalizeFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// 배열 유틸리티
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// 객체 유틸리티
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}; 