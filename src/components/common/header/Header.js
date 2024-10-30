import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { clearStorage } from '../../../utils/storage';
import { listenForProfileImageUpdate } from '../../../utils/handleProfileImg';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // getAuth와 onAuthStateChanged 가져오기
import { fetchUserData } from '../../../../server/api/user'; // 사용자 데이터 가져오기 함수

export async function RenderHeader(header, editProfilePath) {
  try {
    if (!header) {
      console.error('header element is not found');
      return;
    }

    const auth = getAuth(); // 현재 로그인한 ID

    onAuthStateChanged(auth, async user => {
      if (!user) {
        console.error('사용자가 로그인하지 않았습니다.');
        return;
      }

      const userId = user.uid; // 사용자 고유 ID
      console.log('로그인한 사용자 ID:', userId); // 로그인한 사용자 ID 로그

      // Realtime Database에서 사용자 데이터 가져오기
      const userData = await fetchUserData(userId);
      console.log('사용자 데이터:', userData); // 사용자 데이터 로그

      let userName = '사용자 이름 없음'; // 기본 사용자 이름
      let userImage = '/assets/imgs/profile/profile_null.jpg'; // 기본 프로필 이미지
      let isAdmin = false; // 관리자 여부 기본값

      if (userData) {
        userName = userData.user_name || '사용자 이름 없음'; // user_name 필드 사용
        userImage = userData.user_image || userImage; // user_image 필드 사용
        isAdmin = userData.user_role === 'admin'; // user_role 필드 사용하여 관리자 여부 결정
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
          clearStorage(); // 로그아웃 누르면 로컬 스토리지 정리
          Router();
        },
      });

      const headerItem = header.querySelector('.header-items');
      headerItem.append(logoutBtn);

      const profileImgPosition = header.querySelector('.profile-circle');
      if (isAdmin) {
        // 관리자는 프로필 고정 (이미지 설정 필요 시 추가)
        profileImgPosition.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`; // 관리자는 프로필 고정
      } else {
        // 업데이트 반영
        listenForProfileImageUpdate(profileImgPosition);
      }
    });
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}
