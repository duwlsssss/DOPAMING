import axios from 'axios';
import { Pagenation } from '../pagenation/Pagenation';

export const RenderAdminNoticeList = async ({
  container,
  renderItemComponent,
  containerClassName,
  itemClassName,
  itemIdPrefix,
  emptyClassName,
  onDataLoad,
  searchInput = '',
  usePagination = false,
  itemsPerPage = 8,
  currentPage = 1,
}) => {
  try {
    const response = await axios.get(
      '../../../../server/data/company_posts.json',
    );
    let posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );

    // 검색어가 입력되었을 때 필터링
    if (searchInput.trim() !== '') {
      const searchResult = searchInput.toLowerCase();
      posts = posts.filter(
        post =>
          post.post_title.toLowerCase().includes(searchResult) ||
          post.post_description.toLowerCase().includes(searchResult),
      );
    }

    // 데이터 로드 후 총 개수를 상위 컴포넌트로 전달
    if (onDataLoad) {
      onDataLoad(posts.length);
    }

    // 페이지네이션
    let dispalyedPosts = posts;
    if (usePagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      dispalyedPosts = posts.slice(startIndex, endIndex);
    }

    container.innerHTML = `
      <ul class="${containerClassName}">
        ${
          dispalyedPosts.length
            ? dispalyedPosts
                .map(
                  post => `
            <li class="${itemClassName}" id="${itemIdPrefix}-${post.post_id}">
              ${renderItemComponent(post)}
            </li>
            `,
                )
                .join('')
            : `<li class="${emptyClassName}">공지사항이 없습니다.</li>`
        }
      </ul>
    `;

    // 페이지네이션 버튼 컨테이너 생성
    if (usePagination) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination';
      container.appendChild(paginationContainer);

      // 페이지 변경 시 새로운 페이지의 데이터를 렌더링
      const handlePageChange = newPage => {
        RenderAdminNoticeList({
          container,
          renderItemComponent,
          containerClassName,
          itemClassName,
          itemIdPrefix,
          emptyClassName,
          onDataLoad,
          searchInput,
          usePagination,
          itemsPerPage,
          currentPage: newPage,
        });
      };

      // 페이지네이션 컴포넌트 렌더링
      const paginationElement = Pagenation(
        posts.length,
        itemsPerPage,
        currentPage,
        handlePageChange,
      );
      paginationContainer.appendChild(paginationElement);
    }
  } catch (e) {
    console.error('공지를 가져오는 과정에서 에러가 발생했습니다: ', e);
  }
};
