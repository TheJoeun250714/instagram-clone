import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../service/apiService';
import {getImageUrl} from '../service/commonService';
import Header from '../components/Header';

const EditProfilePage = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        userFullname: '',
        userEmail: ''
    });

    // TODO 3-4: 이미지 관련 상태 선언
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState(null);

    // TODO 3-5: useEffect로 loadUserData 호출
    useEffect(() => {
        loadUserData();
    }, []);

    // TODO 3-6: loadUserData 함수 작성
    const loadUserData = async () => {
        try {

            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) navigate('/login');
            // 3. apiService.getUser(storedUser.userId) 호출
            //  apiService.getUser(user.userId); -> localstorage 존재하기 때문에 필요하지 않음

            setUser(user);
            setFormData({
                userName: user.userName,
                userFullname: user.userFullname,
                userEmail: user.userEmail,
            })
            setPreviewImage(getImageUrl(user.userAvatar));
        } catch (err) {
            console.error('사용자 정보 로드 실패', err);
        }
    };

    // TODO 3-7: handleImageChange 함수 작성
    const handleImageChange = (e) => {
        // 1. e.target.files[0] 가져오기
        // 2. selectedFile이 있으면:
        //    - setFile(selectedFile)
        //    - URL.createObjectURL()로 미리보기 URL 생성
        //    - setPreviewImage() 설정
    };

    // TODO 3-8: handleChange 함수 작성
    const handleChange = (e) => {
        // 1. e.target에서 name, value 추출 (구조분해)
        // 2. setFormData(prev => ({ ...prev, [name]: value }))
    };

    // TODO 3-9: handleSubmit 함수 작성
    const handleSubmit = async () => {
        if (!user) return;
        setLoading(true);

        try {
            // 1. new FormData() 생성
            // 2. formData의 각 필드를 submitData.append()로 추가
            // 3. file이 있으면 submitData.append('profileImage', file)
            // 4. apiService.updateProfile(user.userId, submitData) 호출
            // 5. alert('프로필이 저장되었습니다.')
            // 6. navigate('/myfeed')
        } catch (err) {
            console.error(err);
            alert('프로필 저장 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;
    return (
        <div className="feed-container">
            <Header/>

            <div className="edit-profile-wrapper">
                <div className="edit-profile-card">
                    {/* TODO 3-10: 사이드바 구현 */}
                    <div className="edit-profile-sidebar">
                        {/* '프로필 편집', '비밀번호 변경', '앱 및 웹사이트' div 3개 */}
                        <div className="sidebar-item active">프로필 편집</div>
                        <div className="sidebar-item">비밀번호 변경</div>
                        <div className="sidebar-item ">앱 및 웹사이트</div>
                    </div>

                    <div className="edit-profile-form">
                        {/* TODO 3-11: 프로필 사진 섹션 구현 */}
                        <div className="form-group photo-section">
                            <div className="photo-label-area">
                                <img src={getImageUrl(user.userAvatar)} alt="프로필 미리보기"

                                />
                            </div>
                            <div className="photo-input-area">
                                <label htmlFor="profile-upload">프로필 사진 바꾸기
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{display: 'none'}}
                                />
                            </div>
                        </div>

                        {/* TODO 3-12: 이름 입력 필드 */}
                        <div className="form-group">
                            <label className="form-label">이름
                                <input className=""
                                       type="text"
                                       value={formData.userFullname}
                                       onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label">사용자 이름
                                <input className=""
                                       type="text"
                                       value={formData.userName}
                                       onChange={handleChange}
                                />
                            </label>

                        </div>

                        {/* TODO 3-14: 이메일 입력 필드 */}
                        <div className="form-group">
                            <label className="form-label">사용자 이름
                                <input className=""
                                       type="text"
                                       value={formData.userEmail}
                                       onChange={handleChange}
                                       disabled={true}
                                       readOnly
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label"></label>
                            <button className="" onClick={handleSubmit} disabled={loading}>
                                {loading ? '저장 중' : '수정'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
