import React from 'react';
import KakaoLogin from 'react-kakao-login';

const KakaoLoginButton = () => {
    const responseKakao = (response: any) => {
        console.log(response);
        // 여기서 받은 response를 이용해 백엔드로 토큰을 보내 로그인 처리
        fetch('/api/kakaoLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: response.response.access_token
            })
        })
        .then(res => res.json())
        .then(data => {
            // 응답 처리
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <KakaoLogin
            token="5d5c2528a7452989d4031cf83b48700d"
            onSuccess={responseKakao}
            onFail={(error: any) => console.error(error)}
        >
            <button>Login with Kakao</button>
        </KakaoLogin>
    );
};

export default KakaoLoginButton;
