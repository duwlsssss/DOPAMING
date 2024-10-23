import axios from 'axios';
import { RenderNotice } from '../../../../components';
import './Notice.css';

export const RenderUserNotice = async (container, jsonFilePath) => {
  try {
    const response = await axios.get(jsonFilePath);
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    ); // updated_at 기준 최신순 정렬

    const postIds = posts.map(post => post.post_id); // post_id 필터링

    container.innerHTML = `
      <div class="notice-list">
        ${postIds
          .map(postId => {
            const post = posts.find(post => post.post_id === postId);
            return post
              ? `
            <div class="notice-item-container" id="notice-${postId}"></div> 
          `
              : '';
          })
          .join('')}
      </div>
    `;

    postIds.forEach(postId => {
      const post = posts.find(post => post.post_id === postId);
      const postContainer = document.getElementById(`notice-${postId}`);
      if (postContainer && post) {
        RenderNotice(postContainer, post); // 각 공지 렌더링
      }
    });
  } catch (e) {
    console.error('공지 가져오다 에러 발생:', e);
  }
};
