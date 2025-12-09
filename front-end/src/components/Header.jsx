import React from "react";
import {ArrowLeft, Film, Home, MessageCircle, PlusSquare, User} from "lucide-react";
import {useNavigate} from "react-router-dom";
import apiService from "../service/apiService";

/*
* TODO :
* 과제 1: 로그아웃 대신 /myfeed 로 이동하게 설정하기
* 과제 2: FeedPage  key={story.storyId} 클릭하면 /story/detail로 이동하기
* 과제 3: MyFeedPage 와 StoryDetail 임의 데이터를 controller 에서 가져온 데이터로 변경해보기
*
*
* */
const Header = ({
    type="feed",
    title='',
    onSubmit = null,
    submitDisabled = false,
    submitText = '공유',
    loading = false
                }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) apiService.logout();
    };
    if(type ==='feed') {
        return (
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
        )
    }

    if(type ==='upload') {
        return (
            <header className="upload-header">
                <div className="upload-header-content">
                    <button className="upload-back-btn"
                            onClick={() => navigate(("/feed"))}>
                        <ArrowLeft size={24}/>
                    </button>

                    <h2 className="upload-title">{title}</h2>

                    <button className="upload-submit-btn"
                            onClick={onSubmit}
                            disabled={submitDisabled || loading}
                            style={{opacity: (submitDisabled || loading) ? 0.5 : 1}}

                    >
                        {loading ? '업로드 중' : submitText}
                    </button>
                </div>
            </header>
        )
    }



}
export default Header;