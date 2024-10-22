// 모바일 환경인지 확인하는 로직
import Router from '../routes/Router';
let isMobile = window.matchMedia('(max-width: 767px)').matches; // 초기 모바일 상태 확인

const handleResize = () => {
  const newisMobile = window.matchMedia('(max-width: 767px)').matches; // 화면 크기 변경 시 업데이트
  if (newisMobile !== isMobile) {
    isMobile = newisMobile;
    console.log('isMobile 변경됨', isMobile);
    Router();
  }
};

window.addEventListener('resize', handleResize);

export const getIsMobile = () => isMobile;
