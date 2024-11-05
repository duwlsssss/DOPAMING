export const handleNoticeImage = {
  // 공지사항 이미지 업로드
  uploadNoticeImage: (position, base64ImageData) => {
    position.style.backgroundImage = `url(${base64ImageData})`;
    position.setAttribute('data-image', base64ImageData);

    // 커스텀 이벤트 발생
    const event = new CustomEvent('noticeImageUpdated', {
      detail: { imageData: base64ImageData },
    });
    window.dispatchEvent(event);
  },

  applyNoticeImage: (position, imageUrl) => {
    if (imageUrl) {
      position.style.backgroundImage = `url(${imageUrl})`;
      position.setAttribute('data-image', imageUrl);
    } else {
      position.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`;
      position.setAttribute(
        'data-image',
        '/assets/imgs/profile/profile_null.jpg',
      );
    }
  },

  setDefaultNoticeImage: position => {
    const defaultImage = '/assets/imgs/profile/profile_null.jpg';
    position.style.backgroundImage = `url(${defaultImage})`;
    position.setAttribute('data-image', defaultImage);

    const event = new CustomEvent('noticeImageUpdated', {
      detail: { imageData: defaultImage },
    });
    window.dispatchEvent(event);
  },
};
