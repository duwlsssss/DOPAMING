import './Header.css';
import { Button } from '../../ui/button/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userLogout } from '../../../../server/api/user';
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

      // 기본 이미지 경로 설정
      const defaultProfileImg = '/assets/imgs/profile/profile_null.jpg';

      let userName = '';
      let isAdmin = false;
      let userProfileImg = `url(${defaultProfileImg})`;

      if (userData) {
        userName = userData.user_name;
        isAdmin = userData.user_type;
        userProfileImg = userData.user_image
          ? `url(${userData.user_image})`
          : `url(${defaultProfileImg})`;
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
        onClick: userLogout,
      });

      const headerItem = header.querySelector('.header-items');
      headerItem.append(logoutBtn);

      const profileImgPosition = header.querySelector('.profile-circle');
      if (isAdmin) {
        profileImgPosition.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`; // 관리자는 프로필 고정
      } else {
        profileImgPosition.style.backgroundImage = userProfileImg;
      }

      const userNameEl = header.querySelector('.user-name');

      // 프로필 업데이트 반영
      window.addEventListener('profileUpdated', async () => {
        const updatedUserData = await fetchUserData(userId);
        userNameEl.textContent = `${updatedUserData.user_name}`;
        profileImgPosition.style.backgroundImage = `url(${updatedUserData.user_image || '/assets/imgs/profile/profile_null.jpg'})`;
      });
    });
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}
