import {
  adminFetchMemberDetail,
  adminFetchVacation,
  adminMemberDelete,
} from '../../../../../server/api/admin';
import { Button } from '../../../../components';
import { Accordion } from '../../../../components/ui/accordion/Accordion';
import './MemberDetail.css';

export async function RenderAdminMemberDetail(container, memberId) {
  const memberDetailData = await adminFetchMemberDetail(memberId);
  const memberVactionDetail = await adminFetchVacation(memberId);

  const buttonElement = Button({
    width: 40,
    text: '삭제',
    color: 'coral',
    shape: 'block',
    className: 'detail_button',

    onClick: () => adminMemberDelete(memberId),
  });

  const downloadButton = new Button({
    text: '다운로드',
    color: 'white',
    shape: 'line',
    padding: 'var(--space-xsmall) var(--space-xsmall)',
  });
  const renderHeader = () => /*html*/ `
  <header class="member-detail-info">
    <div class="member-detail-status-dot active">
    </div>
    <img src="${memberDetailData.user_image}" alt="${
      memberDetailData.user_name
    }" class="admin-vacation-avatar">
    <span >${memberDetailData.user_position}</span>
    <span >${memberDetailData.user_birthday.replace('-', '.')}</span>
    <span >${memberDetailData.user_name}</span>
    <span >${memberDetailData.user_phone}</span>
    <span >${memberDetailData.user_sex}</span>
    <span >${memberDetailData.user_email}</span>
  </header>
`;

  //휴가 관련 정보
  const vactionDetailRender = memberVacationDetail => {
    if (memberVacationDetail) {
      return `
      <div class="member-detail-list">               
        ${Accordion({
          items: memberVacationDetail,
          renderHeader,
          renderContent,
        })}
      `;
    } else {
      return `
        <div>
          데이터가 존재하지 않습니다.
        </div>
      `;
    }
  };
  const renderContent = (value, index) => {
    return `
          <article class="member-detail-content">
          <div class="member-detail-grid">
            <section class="member-detail-item">
              <h3 class="member-detail-label">휴가 제목</h3>
              <div class="member-detail-value">${value.abs_title}</div>
            </section>            
            <div class="member-detail-item">
              <h3 class="member-detail-label">휴가 기간</h3>
              <div class="member-detail-value">
                <time class="date">${value.abs_start_date}</time>
                <span class="date-separator">~</span>
                <time class="date">${value.abs_end_date}</time>
              </div>
            </div>
    
            <section class="member-detail-item">
              <h3 class="member-detail-label">첨부 파일</h3>
              <div class="member-download-file">
                <p class="member-detail-value">${value.abs_proof_document}</p>
                ${downloadButton.outerHTML}
              </div>
            </section>
            <section class="member-detail-item member-detail-content-box">
              <h3 class="member-detail-label">휴가 내용</h3>
              <p class="member-detail-value content-box" data-index="${index}">${value.abs_content}</p>
            </section>
          </div>          
        </article>
        `;
  };
  container.innerHTML = /*html*/ `
    <div class="member-detail-container">    
      <div class="member-detail-header">
      <h1>직원 상세</h1>
        
      </div>
      <div class="member-detail-wapper">
        <div class="member-detail-items">
          <div class="profile-top">
            <img src="${
              memberDetailData.user_image
            }" alt="프로필 이미지" class="profile-img-item"/>          
          </div>       
          <div class="profile-information">         
            <div class="profle-information-left">
              <span>직책:${memberDetailData.user_position}</span>
              <span>전화번호:${memberDetailData.user_phone}</span>                 
              <span>이름:${memberDetailData.user_name}</span>
            </div>
            <div class="profle-information-right">
              <span>생년월일:${memberDetailData.user_birthday.replace(
                '-',
                '.',
              )}</span>                
              <span>성별:${memberDetailData.user_sex}</span>
              <span>이메일:${memberDetailData.user_email}</span>        
            </div>
          </div>
        </div>      
        <div class="member-bottom">
          <div class="member-bottom-line"></div>
        </div>    
        <div class="member-detail-footer">
          <h1>부재 신청 내역</h1>
          <div class="member-detail-footer-item">
          <div class="member-detail-item-wrapper"> 
          ${vactionDetailRender(memberVactionDetail)}                           
          </div>
        </div>
        </div>     
        </div>                      
      </div>
    </div>
  `;
  const buttonEl = document.querySelector('.member-detail-header');
  buttonEl.append(buttonElement);
}
