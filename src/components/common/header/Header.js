import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { clearStorage } from '../../../utils/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchUserData } from '../../../../server/api/user';

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
      const userData = await fetchUserData(userId);

      let userName = '';
      let isAdmin = false;
      let userProfileImg;

      if (userData) {
        userName = userData.user_name;
        isAdmin = userData.user_type;
        userProfileImg = userData.user_image
          ? `url(${userData.user_image})`
          : `url('/assets/imgs/profile/profile_null.jpg')`;
      } else {
        console.error('사용자 데이터가 존재하지 않습니다.');
      }

      header.innerHTML = `
        <div class="header-items">
          <div class="user-name"> ${isAdmin ? '관리자' : userName}</div>
        </div>
        <figure class="profile-circle" style="cursor: ${isAdmin ? 'default' : 'pointer'}">
          ${isAdmin ? '' : `<a href="${editProfilePath}" class="hidden-link">.</a>`}
        </figure>
        <div class="header-mobile">DOPAMING</div>
      `;

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
        profileImgPosition.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`; // 관리자는 프로필 고정
      } else {
        profileImgPosition.style.backgroundImage = userProfileImg;
      }

      // 프로필 이미지 업데이트 반영
      window.addEventListener('profileImageUpdated', async () => {
        const updatedUserData = await fetchUserData(userId); // 새로고침 없이 최신 데이터 가져오기
        profileImgPosition.style.backgroundImage = `url(${updatedUserData.user_image || '/assets/imgs/profile/profile_null.jpg'})`;
      });
    });
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}
