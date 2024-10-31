import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { clearStorage } from '../../../utils/storage';
import { listenForProfileImageUpdate } from '../../../utils/handleProfileImg';
import { getCurrentUserId, fetchUserData } from '../../../../server/api/user';

export async function RenderHeader(header, editProfilePath) {
  try {
    if (!header) {
      console.error('header element is not found');
      return;
    }

    // 현재 로그인한 ID를 가져오기
    getCurrentUserId(async userId => {
      if (!userId) {
        console.error('사용자가 로그인하지 않았습니다.');
        return;
      }

      console.log('로그인한 사용자 ID:', userId);

      // Realtime Database에서 사용자 데이터 가져오기
      const userData = await fetchUserData(userId);
      console.log('사용자 데이터:', userData); // 사용자 데이터 로그

      let userName = '사용자 이름 없음';
      let userImage = '/assets/imgs/profile/profile_null.jpg'; // 기본 프로필 이미지
      let isAdmin = false;

      if (userData) {
        userName = userData.user_name || '사용자 이름 없음';
        userImage = userData.user_image || userImage; // user_image 필드 사용
        isAdmin = userData.user_role === 'admin';

        // 값 확인을 위한 로그 추가
        console.log('사용자 이름:', userName);
        console.log('사용자 이미지:', userImage); // 업데이트된 프로필 이미지 로그
        console.log('관리자 여부:', isAdmin);
      } else {
        console.error('사용자 데이터가 존재하지 않습니다.');
      }

      // 헤더 내용 설정
      header.innerHTML = `
        <div class="header-items">
          <div class="user-name">${userName}</div>
        </div>
        <figure class="profile-circle" style="cursor: ${isAdmin ? 'default' : 'pointer'}; background-image: url(${userImage});">
          ${isAdmin ? '' : `<a href="${editProfilePath}" class="hidden-link">.</a>`}
        </figure>
        <div class="header-mobile">DOPAMING</div>
      `;

      // 로그아웃 버튼 생성
      const logoutBtn = Button({
        className: 'logout-btn',
        text: '로그아웃',
        color: 'white',
        shape: 'line',
        onClick: () => {
          clearStorage();
          Router();
        },
      });

      const headerItem = header.querySelector('.header-items');
      headerItem.append(logoutBtn);

      const profileImgPosition = header.querySelector('.profile-circle');
      if (isAdmin) {
        profileImgPosition.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`; // 관리자는 프로필 고정
      } else {
        listenForProfileImageUpdate(profileImgPosition);
      }
    });
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}
