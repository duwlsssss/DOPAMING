// 모바일 환경인지 확인하는 로직
import Router from '../routes/Router';
let isMobile = window.matchMedia('(max-width: 767px)').matches; // 초기 모바일 상태 확인

// 리사이즈가 멈춘 후 alertWhenResizingStops 실행
let alertTimer;
const alertWhenResizingStops = () => {
  if (alertTimer) {
    clearTimeout(alertTimer);
  } //resize 이벤트가 발생할때마다(resize 진행 중엔) alertTimer가 게속 초기화됨
  alertTimer = setTimeout(() => {
    const newisMobile = window.matchMedia('(max-width: 767px)').matches;
    if (newisMobile !== isMobile) {
      // 상태가 변할 때만 업데이트
      isMobile = newisMobile;
      Router();
    }
  }, 10); // 리사이즈가 멈추면 resize 이벤트 호출이 중단되고, 그 순간 설정된 마지막 setTimeout 타이머가 실행됨
};

window.addEventListener('resize', alertWhenResizingStops);

export const getIsMobile = () => isMobile;
