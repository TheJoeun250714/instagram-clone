
import React from 'react';
import { X, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { getImageUrl } from '../service/commonService';
import MentionText from './MentionText';
import PostOptionsMenu from './PostOptionsMenu';

const PostDetailModal = ({ post, currentUserId, onClose, onDelete, onToggleLike }) => {

    // ============================================
    // TODO 1-1: post가 없으면 null 반환하기
    // ============================================



    // ============================================
    // TODO 2: 링크 공유 함수 구현
    // ============================================
    const handleShare = async () => {
        // TODO 2-1: 공유할 URL 만들기
        const shareUrl = /* 여기에 코드 작성 */;

        // TODO 2-2: Web Share API 지원 여부 확인
        if (/* 여기에 조건 작성 */) {
            try {
                // TODO 2-3: 공유하기
                await navigator.share({
                    title: /* 제목 작성 */,
                    text: /* 게시물 캡션 */,
                    url: /* URL */
                });
            } catch (err) {
                // TODO 2-4: 에러 처리 (AbortError 제외)
                if (err.name !== 'AbortError') {
                    // 클립보드 복사 함수 호출
                }
            }
        } else {
            // TODO 2-5: Web Share API 미지원 시 클립보드 복사

        }
    };

    // ============================================
    // TODO 2-6: 클립보드 복사 함수 구현
    // ============================================
    const copyToClipboard = (text) => {
        // navigator.clipboard.writeText() 사용
        // 성공: "링크가 클립보드에 복사되었습니다!" 알림
        // 실패: "링크 복사에 실패했습니다." 알림



    };

    return (
        // ============================================
        // 모달 오버레이 (배경)
        // ============================================
        <div className="post-detail-overlay" onClick={onClose}>

            {/* ============================================
          TODO 3-1: 모달 컨테이너 
          - className: post-detail-container
          - 클릭 시 이벤트 버블링 방지
          ============================================ */}
            <div className="post-detail-container" onClick={/* 여기에 이벤트 핸들러 */}>

                {/* TODO 3-2: 닫기 버튼 */}
                <button className="post-detail-close" onClick={onClose}>
                    {/* X 아이콘 (size=24) */}

                </button>

                <div className="post-detail-content">

                    {/* ============================================
              TODO 3-3: 이미지 섹션
              ============================================ */}
                    <div className="post-detail-image-section">
                        {/* 게시물 이미지 표시 */}
                        {/* className: post-detail-image */}
                        {/* src: post.postImage */}

                    </div>

                    {/* ============================================
              정보 섹션
              ============================================ */}
                    <div className="post-detail-info-section">

                        {/* TODO 3-4: 헤더 (사용자 정보) */}
                        <div className="post-detail-header">
                            <div className="post-user-info">
                                {/* 프로필 이미지 */}
                                {/* src: getImageUrl(post.userAvatar) */}
                                {/* className: post-user-avatar */}


                                {/* 사용자 이름 */}
                                {/* className: post-username */}

                            </div>

                            {/* PostOptionsMenu 컴포넌트 */}
                            {/* props: post, currentUserId, onDelete */}

                        </div>

                        {/* TODO 3-5: 캡션 섹션 */}
                        <div className="post-detail-caption-section">
                            <div className="post-caption">
                                {/* 사용자 이름 (굵게) */}
                                {/* className: post-caption-username */}


                                {/* MentionText 컴포넌트로 캡션 표시 */}
                                {/* props: text={post.postCaption} */}

                            </div>
                        </div>

                        {/* TODO 3-6: 액션 버튼들 */}
                        <div className="post-detail-actions">
                            <div className="post-actions">
                                <div className="post-actions-left">

                                    {/* 좋아요 버튼 (Heart 아이콘) */}
                                    {/*
                    className: action-icon like-icon
                              + post.isLiked면 'liked' 클래스 추가
                    onClick: onToggleLike(post.postId, post.isLiked) 호출
                    fill: post.isLiked ? "#ed4956" : "none"
                  */}



                                    {/* 공유 버튼 (MessageCircle 아이콘) */}
                                    {/* onClick: handleShare 호출 */}


                                    {/* 전송 버튼 (Send 아이콘) */}

                                </div>

                                {/* 북마크 버튼 (Bookmark 아이콘) */}

                            </div>

                            {/* 좋아요 개수 */}
                            <div className="post-likes">
                                {/* "좋아요 {post.likeCount}개" 형식 */}

                            </div>

                            {/* 게시 시간 */}
                            <div className="post-time">
                                {/* post.createdAt 표시, 없으면 "방금 전" */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;