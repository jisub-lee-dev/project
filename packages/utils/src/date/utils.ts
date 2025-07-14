import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

// 날짜 관련 유틸리티
export const formatDate = (date: Date | string, formatStr: string = "yyyy-MM-dd") => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ko });
};

export const formatRelativeTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
}; 