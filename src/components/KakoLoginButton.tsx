import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { FaComment } from 'react-icons/fa';
import axios from 'axios';
import API_URL from '../config';
import { useAuth } from '../common/AuthContextType';

const KakaoLoginButton = () => {
    const { login } = useAuth();
    
    const responseKakao = async (response: any) => {
        
        try {
            const res = await fetch(`${API_URL}/api/kakaoLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: response.response.access_token
                })
            });

            if(!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            localStorage.setItem('jwtToken', data.token);
            const userInfo = {
                name: data.nickname,
                userId: data.userId,
            };
            login(data, userInfo);
        } catch (error) {
            console.log('Error: ', error);
        }
       
    };

    // 인증이 필요한 API 요청을 위한 함수 예시
    const getProtectedData = () => {
        const token = localStorage.getItem('jwtToken');
        axios.get(`${API_URL}/api/protected`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Protected data:', response.data);
        })
        .catch(error => {
            console.error('Error fetching protected data:', error);
        });
    };

    return (
        <KakaoLogin
            token="b3851f460ed49a031b6c35cb808a1514"
            onSuccess={responseKakao}
            onFail={(error: any) => console.error(error)}
            render={({ onClick }) => (
                <button onClick={onClick} style={{ backgroundColor: '#fee500', color: '#3c1e1e', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    <FaComment size={24} />
                    Login
                </button>
            )}
        />            
    );
};

export default KakaoLoginButton;
