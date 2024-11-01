import { ADMIN_PATH } from '../../../utils/constants';
import navigate from '../../../utils/navigation';

export const RenderAdminNoticeItem = ({
  post,
  itemContainerClassName,
  imageClassName,
  contentContainerClassName,
  contentTitleClassName,
  contentDescriptionClassName,
  contentDateClassName,
}) => {
  const handleNoticeClick = () => {
    navigate(`${ADMIN_PATH.NOTICE}/${post.post_id}`);
  };

  const uniqueId = `admin-notice-item-${post.post_id}`;

  // DOM이 실제로 생성되고 난 후에 이벤트 리스너를 등록하기 위해 setTimeout을 사용함.
  // HTML 문자열을 반환하고 있는데 이는 나중에 DOM에 등록되고
  // document.getElementById를 바로 실행하면 HTML이 아직 DOM에 등록되지 않아 null이 반환될 수 있기 때문.
  // setTimeout을 사용하면 해당 함수가 이벤트 루프에 등록되어 나중에 실행되기 때문에 DOM이 생성된 후에 실행됨.
  // setTimeout은 콜백을 매크로태스크 큐에 넣고, 현재 실행 코드 스택이 비워지고 DOM 업데이트가 이뤄진 후에 실행됨.
  setTimeout(() => {
    const element = document.getElementById(uniqueId);
    if (element) {
      element.addEventListener('click', handleNoticeClick);
    }
  }, 0);

  return `
        <div class="${itemContainerClassName}" id="${uniqueId}">
          <div class="${imageClassName}">
            <img src="${post.post_image}" alt="${post.post_title}" />
          </div>
          <div class="${contentContainerClassName}">
            <div class="${contentTitleClassName}">${post.post_title}</div>
            <div class="${contentDescriptionClassName}">${post.post_description}</div>
            <div class="${contentDateClassName}">
              <span class="material-symbols-rounded">
                  update
              </span>
              <p>${new Date(post.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      `;
};
