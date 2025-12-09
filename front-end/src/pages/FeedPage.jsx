import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../service/apiService';
import {Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, PlusSquare, Film, User} from 'lucide-react';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);

    const [stories, setStories] = useState([]);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // TODO: useEffect를 사용하여 컴포넌트 마운트 시 loadFeedData 호출
    useEffect(() => {
        loadFeedData();
    },[]);
    // TODO: loadFeedData 함수를 작성하세요
    // 1. try-catch 사용
    // 2. apiService.getPosts()와 apiService.getStories() 개별 호출
    // 3. 받아온 데이터로 posts와 stories state 업데이트
    // 4. catch: 에러 처리 (console.error, alert)
    // 5. finally: loading을 false로 설정
    const loadFeedData = async () => {
       setLoading(true);

       try {
           const postsData = await apiService.getPosts();
           setPosts(postsData);
       } catch (err) {
           alert("포스트 피드를 불러오는데 실패했습니다.")
       } finally {
           setLoading(false);
       }

        try {
            const storiesData = await apiService.getStories();
            setStories(storiesData);
        } catch (err) {
            alert("스토리 피드를 불러오는데 실패했습니다.")
        } finally {
            setLoading(false);
        }
    };

    const toggleLike = async (postId, isLiked) => {
      try {
          if(isLiked) await  apiService.removeLike(postId);
          else await  apiService.addLike(postId);

          const postsData = await apiService.getPosts();
          setPosts(postsData);
      } catch (err) {
          alert("좋아요 처리에 실패했습니다.");
      }
    };

    const handleLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) apiService.logout();
    };

    if (loading) {
        return (
            <div className="feed-container">
                <div style={{padding: '2rem', textAlign: 'center'}}>
                    로딩 중...
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <header className="header">
                <div className="header-container">
                    <h1 className="header-title">Instagram</h1>
                    <div className="header-nav">
                        <Home className="header-icon"
                              onClick={() => navigate(('/'))}/>
                        <MessageCircle className="header-icon"/>
                        <PlusSquare className="header-icon"
                                    onClick={() => navigate(('/upload'))}/>
                        <Film className="header-icon"
                        onClick={() => navigate("/story/upload")}/>
                        <User className="header-icon" onClick={handleLogout}/>
                    </div>
                </div>
            </header>

            <div className="feed-content">
                {stories.length > 0 && (
                    <div className="stories-container">
                        <div className="stories-wrapper">
                            {stories.map((story) => (
                                <div key={story.storyId} className="story-item">
                                    <div className="story-avatar-wrapper" key={story.id}>
                                        <img src={story.userAvatar} className="story-avatar"/>
                                    </div>
                                    <span className="story-username">{story.userName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {posts.length > 0 && (
                    posts.map((post) => (
                        <article key={post.postId} className="post-card">
                            <div className="post-header">
                                <div className="post-user-info">
                                    <img src={post.userAvatar} className="post-user-avatar"/>
                                    <span className="post-username">{post.userName}</span>
                                </div>
                                <MoreHorizontal className="post-more-icon" />
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
                                        <MessageCircle className="action-icon" />
                                        <Send className="action-icon" />
                                    </div>
                                    <Bookmark className="action-icon" />
                                </div>

                                <div className="post-likes">
                                    좋아요 {post.likeCount}개
                                </div>

                                <div className="post-caption">
                                    <span className="post-caption-username">{post.userName}</span>
                                    {post.postCaption}
                                </div>
                                {post.commentCount > 0 && (
                                    <button className="post-comments-btn">
                                        댓글{post.commentCount}개 모두 보기
                                    </button>
                                )}
                                <div className="post-time">
                                    {post.createdAt ||'방금 전'}
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedPage;
