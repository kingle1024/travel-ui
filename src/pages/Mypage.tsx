import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonButtons, IonButton } from '@ionic/react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import './Mypage.css';
import { useAuth } from '../common/AuthContextType';

const Mypage: React.FC = () => {  
  const { user, logout } = useAuth();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('profile'); // 기본 활성화된 탭 설정

  const handleTitleClick = () => {
    history.push('/');
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // "내 정보" 클릭 시 /mypage로 이동
    if (tab === 'profile') {
      history.push('/mypage');
    } else if (tab === 'addCourse') {
      history.push('/mypage/course/add'); // 수정된 부분
    } else {
      history.push(`/mypage/${tab}`);
    }
  };

  return (
    <IonPage>
      <Helmet>
        <title>마이페이지</title>
        <meta name="google-adsense-account" content="ca-pub-9366813459634197" />      
        <meta charSet="utf-8" />        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="마이페이지" />
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle onClick={handleTitleClick} style={{ cursor: 'pointer' }}>Home</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={logout}>로그아웃</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mypage-container">
          <div className="sidebar">
            <IonList>
              <IonItem
                button
                onClick={() => handleTabClick('profile')}
                className={activeTab === 'profile' ? 'active' : ''}
              >
                내 정보
              </IonItem>
              <IonItem
                button
                onClick={() => handleTabClick('likes')}
                className={activeTab === 'likes' ? 'active' : ''}
              >
                좋아요 목록
              </IonItem>
              <IonItem
                button
                onClick={() => handleTabClick('addCourse')}
                className={activeTab === 'addCourse' ? 'active' : ''}
              >
                데이트 코스 등록
              </IonItem>
            </IonList>
          </div>
          <div className="content">
                <h2>내 정보</h2>
                {user ? (
                  <p>안녕하세요, {user.name}님!</p> // 사용자 이름 표시
                ) : (
                  <p>사용자 정보를 불러오는 중입니다...</p>
                )}
            {/* 좋아요 목록과 다른 컨텐츠는 별도 페이지에서 처리 */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mypage;
