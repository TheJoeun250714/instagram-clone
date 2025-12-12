import React, {useState, useRef, useEffect} from 'react';
import apiService from '../service/apiService';
import {getImageUrl} from "../service/commonService";

const MentionInput = ({value, onChange, placeholder, rows = 4}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const suggestionsRef = useRef(null);

    const searchUsers = async (query) => {
        console.log("검색시작 : ",query);
        if (!query || query.length < 1) {
            console.log("쿼리가 비어있어요.");
            setSuggestions([]);
            return;
        }
        try {
            const res = await apiService.searchUsers(query);
            setSuggestions(res || []);
        } catch (err) {
            console.error("유저검색실패 : ", err);
            setSuggestions([]);
        }

    };

    // TODO 4: 텍스트 변경 처리 함수 구현
    const handleTextChange = (e) => {
        const newValue = e.target.value;
        const newCursorPosition = e.target.selectionStart;

        // 부모 컴포넌트로 값 전달
        onChange(newValue);
        setCursorPosition(newCursorPosition);

        const textBeforeCursor = newValue.substring(0, newCursorPosition);
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');

        if (lastAtIndex !== -1) {
            const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
            if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
                setShowSuggestions(true);
                searchUsers(textAfterAt);
                setSelectedIndex(0);
            } else setShowSuggestions(false);
        } else setShowSuggestions(false);

    };

    // TODO 5: 유저 선택 함수 구현
    const selectUser = (user) => {
        // 요구사항:
        // 1. 커서 이전/이후 텍스트 추출
        const textBeforeCursor = value.substring(0, cursorPosition);
        const textAfterCursor = value.substring(cursorPosition);
        // 2. 마지막 '@' 위치 찾기
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');
        // 3. '@' 이전 텍스트 + '@유저네임 ' + 커서 이후 텍스트 합치기
        if (lastAtIndex !== -1) {
            const beforeAt = textBeforeCursor.substring(0, lastAtIndex);
            const newValue = `${beforeAt}@${user.username} ${textAfterCursor}`;
            const newCursorPos = beforeAt.length + user.userName.length + 2;
            // 4. onChange로 새로운 값 전달
            onChange(newValue);
            setShowSuggestions(false);
            setSuggestions([]);
            // 6. setTimeout으로 textarea에 포커스하고 커서 위치 조정
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
                }
            })
        }


    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSuggestions((prev) => prev < suggestions.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => prev > 0 ? prev - 1 : suggestions.length - 1);
                break;
            case 'Enter':
                if(showSuggestions && suggestions[selectedIndex]) {
                    e.preventDefault();
                    selectUser(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                break;
            default:
                break;
        }
    };

    // TODO 7: 외부 클릭 감지 useEffect 구현
    useEffect(() => {
        // 요구사항:
        // 1. handleClickOutside 함수 생성
        const handleClickOutside = (e) => {
            if(suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {document.removeEventListener('mousedown', handleClickOutside);};
    }, []);

    return (
        <div style={{position: 'relative', width: '100%'}}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={rows}
                className="upload-caption-input"
            />

            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="mention-suggestions"
                >
                    {suggestions.map((user, index) => (
                        <div
                            key={user.userId}
                            className={`mention-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => selectUser(user)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <img
                                src={getImageUrl(user.userAvatar)}
                                alt={user.userName}
                                className="mention-avatar"
                            />
                            <div className="mention-info">
                                <div className="mention-username">{user.userName}</div>
                                {user.userFullname && (
                                    <div className="mention-fullname">{user.userFullname}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MentionInput;