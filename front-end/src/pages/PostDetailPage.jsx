import React, {useEffect, useState} from 'react';
import {Heart, MessageCircle, Send, Bookmark, Trash2} from 'lucide-react';
import {getImageUrl} from '../service/commonService';
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import apiService from "../service/apiService";
import PostOptionMenu from "../components/PostOptionMenu";
import MentionText from "../components/MentionText";

const PostDetailPage = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user") || '{}');

    useEffect(() => {
        loadPostData();
        loadComments();
    }, [postId]);

    const loadPostData = async () => {
        setLoading(true);
        try {
            const postData = await apiService.getPost(postId);
            setPost(postData);
        } catch (err) {
            alert("포스트를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            const commentsData = await apiService.getComments(postId);
            setComments(commentsData);
        } catch (err) {
            console.error("댓글 로딩 실패:", err);
        }
    };

    const toggleLike = async (postId, isLiked) => {
        const updatedPost = {...post};
        updatedPost.isLiked = !isLiked;
        updatedPost.likeCount += isLiked ? -1 : 1;
        setPost(updatedPost);

        try {
            if (isLiked) await apiService.removeLike(postId);
            else await apiService.addLike(postId);
        } catch (err) {
            alert("좋아요 처리에 실패했습니다.");
            loadPostData();
        }
    };

    const deletePost = async (postId) => {
        if (!window.confirm('게시물을 삭제하시겠습니까?')) return;

        try {
            await apiService.deletePost(postId);
            alert("게시물이 삭제되었습니다.");
            navigate('/feed');
        } catch (err) {
            alert("게시물 삭제에 실패했습니다.");
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;

        try {
            await apiService.createComment(postId, commentText);
            setCommentText('');
            loadComments();
            setPost({...post, commentCount: post.commentCount + 1});
        } catch (err) {
            alert("댓글 작성에 실패했습니다.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

        try {
            await apiService.deleteComment(commentId);
            loadComments();
            setPost({...post, commentCount: post.commentCount - 1});
        } catch (err) {
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    if (loading || !post) {
        return (
            <div className="feed-container">
                <Header/>
                <div style={{padding: '2rem', textAlign: 'center'}}>
                    로딩 중...
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <Header/>

            <div className="feed-content">
                <article className="post-card">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img
                                src={getImageUrl(post.userAvatar)}
                                className="post-user-avatar"
                                style={{cursor: 'pointer'}}
                                onClick={() => navigate(`/myfeed?userId=${post.userId}`)}
                            />
                            <span className="post-username">{post.userName}</span>
                        </div>
                        <PostOptionMenu
                            post={post}
                            currentUserId={currentUser.userId}
                            onDelete={deletePost}
                        />
                    </div>

                    <img src={post.postImage} className="post-image" />

                    <div className="post-content">
                        <div className="post-actions">
                            <div className="post-actions-left">
                                <Heart
                                    className={`action-icon like-icon ${post.isLiked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(post.postId, post.isLiked)}
                                    fill={post.isLiked ? "#ed4956" : "none"}
                                />
                                <MessageCircle className="action-icon"/>
                                <Send className="action-icon"/>
                            </div>
                            <Bookmark className="action-icon"/>
                        </div>

                        <div className="post-likes">
                            좋아요 {post.likeCount}개
                        </div>

                        <div className="post-caption">
                            <span className="post-caption-username">{post.userName}</span>
                            <MentionText text={post.postCaption}/>
                        </div>

                        {/* 댓글 목록 */}
                        <div className="comments-section">
                            {comments.length === 0 ? (
                                <div className="comments-empty">
                                    첫 번째 댓글을 남겨보세요!
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.commentId} className="comment-item">
                                        <img
                                            src={getImageUrl(comment.userAvatar)}
                                            alt={comment.userName}
                                            className="comment-avatar"
                                        />
                                        <div className="comment-content">
                                            <div className="comment-text">
                                                <span className="comment-username">
                                                    {comment.userName}
                                                </span>
                                                <MentionText text={comment.commentContent}/>
                                            </div>
                                            <div className="comment-time">
                                                {comment.createdAt}
                                            </div>
                                        </div>
                                        {currentUser.userId === comment.userId && (
                                            <Trash2
                                                size={16}
                                                className="comment-delete-btn"
                                                onClick={() => handleDeleteComment(comment.commentId)}
                                            />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="post-time">
                            {post.createdAt || '방금 전'}
                        </div>
                    </div>

                    {/* 댓글 입력 */}
                    <div className="comment-input-container">
                        <input
                            className="comment-input"
                            placeholder="댓글 달기..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleCommentSubmit();
                                }
                            }}
                        />
                        <button
                            className="comment-post-btn"
                            onClick={handleCommentSubmit}
                            disabled={!commentText.trim()}
                            style={{
                                opacity: commentText.trim() ? 1 : 0.3
                            }}
                        >
                            게시
                        </button>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;