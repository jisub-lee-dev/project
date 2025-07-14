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

// 도메인별 유틸리티 export
export * from './date'
export * from './performance'
export * from './id'
export * from './cookie'
export * from './string'
export * from './array'
export * from './object' 