import { handleNoticeImage } from '../../../utils/handleProfileImg';
import { Button } from '../../ui/button/Button';

export const attachProfileImageEvents = container => {
  // 이미지 관련 이벤트 수정된 설정
  const fileInput = container.querySelector('#fileInput');
  const profileImgPosition = container.querySelector('.real-profileImg');
  const buttonPosition = container.querySelector(
    '.user-profileImg-button-container',
  );

  const imgUploadBtn = Button({
    className: 'img-upload-btn',
    text: '사진 선택하기',
    color: 'transparent',
    shape: 'line',
    padding: 'var(--space-small)',
    onClick: e => {
      e.preventDefault();
      fileInput.click();
    },
  });

  const imgDeleteBtn = Button({
    className: 'img-delete-btn',
    text: '기본 이미지로 변경',
    color: 'white',
    shape: 'line',
    padding: 'var(--space-small)',
    onClick: e => {
      e.preventDefault();
      handleNoticeImage.setDefaultNoticeImage(profileImgPosition);
    },
  });

  buttonPosition.append(imgUploadBtn);
  buttonPosition.append(imgDeleteBtn);

  fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = event => {
        handleNoticeImage.uploadNoticeImage(
          profileImgPosition,
          event.target.result,
        );
      };

      reader.readAsDataURL(file);
    } else {
      alert('파일을 선택해 주세요.');
    }
  });
};
