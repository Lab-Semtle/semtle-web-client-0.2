/** 브라우저 환경에서의 MSW 설정 */

import { setupWorker } from 'msw/browser';
import handlers from './handlers';

export const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'warn', // 미처리된 요청 경고 표시
});
