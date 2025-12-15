
import React from 'react';
import { X, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { getImageUrl } from '../service/commonService';
import MentionText from './MentionText';
import PostOptionsMenu from './PostOptionsMenu';

const PostDetailModal = ({ post, currentUserId, onClose, onDelete, onToggleLike }) => {

    // ============================================
    // TODO 1-1: post가 없으면 null 반환하기
    // ============================================
    if (!post) {return  null};


    // ============================================
    // TODO 2: 링크 공유 함수 구현
    // ============================================
    const handleShare = async () => {
        // TODO 2-1: 공유할 URL 만들기
        const shareUrl =`${window.location.origin}/post/${post.postId}`;

        // TODO 2-2: Web Share API 지원 여부 확인
        if (navigator.share) {
            try {
                // TODO 2-3: 공유하기
                await navigator.share({
                    title: `${post.userName}의 게시물`,
                    text: post.postCaption,
                    url:  shareUrl
                });
            } catch (err) {
                // TODO 2-4: 에러 처리 (AbortError 제외)
                if (err.name !== 'AbortError') {
                   copyToClipboard(shareUrl);
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
        navigator.clipboard.writeText(text).then(() => {
            alert('링크가 클립보트에 복사되었습니다.');
        }).catch(() => {
            alert("링크 복사에 실패했습니다.");
        })
        // navigator.clipboard.writeText() 사용
        // 성공: "링크가 클립보드에 복사되었습니다!" 알림
        // 실패: "링크 복사에 실패했습니다." 알림



    };

    return (
        <div className="post-detail-overlay" onClick={onClose}>
            <div className="post-detail-container"
                 onClick={e => e.stopPropagation()}
            >
                <button className="post-detail-close" onClick={onClose}>
                   <X size={24} />
                </button>

                <div className="post-detail-content">
                    <div className="post-detail-image-section">
                       <img className="post-detail-image"
                        src={post.postImage} />
                    </div>

                    <div className="post-detail-info-section">
                        <div className="post-detail-header">
                            <div className="post-user-info">
                                <img className="post-user-avatar"
                                     src={getImageUrl(post.userAvatar)} />
                                <span className="post-user-name">{post.userName}</span>
                            </div>
                            <PostDetailModal
                                post={post}
                                currentUserId={currentUserId}
                                onDelete={onDelete} />
                        </div>

                        <div className="post-detail-caption-section">
                            <div className="post-caption">
                                <span className="post-caption-username">{post.userName}</span>
                                <MentionText text={post.postCaption} />
                            </div>
                        </div>

                        <div className="post-detail-actions">
                            <div className="post-actions">
                                <div className="post-actions-left">
                                    <Heart
                                        className={`action-icon like-icon ${post.isLiked} ?'liked' :''`}
                                        onClick={() => onToggleLike(post.postId, post.isLiked)}
                                        fill={post.isLiked ? '#ed4956' : 'none'}
                                        />
                                    <MessageCircle className="action-icon" onClick={handleShare} />
                                    <Send className="action-icon" />
                                </div>
                               <Bookmark className="action-icon" />
                            </div>
                            <div className="post-likes">
                              좋아요 {post.likeCount}개
                            </div>
                            <div className="post-time">
                                {post.createdAt || "방금 전"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;