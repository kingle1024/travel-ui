import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonButtons, IonButton, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ListContainer from '../components/ListContainer'
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Home.css';
import { useAuth } from '../common/AuthContextType';
import KakaoLoginButton from '../components/KakoLoginButton';

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9366813459634197";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    const meta = document.createElement('meta');
    meta.name = "google-adsense-account";
    meta.content = "ca-pub-9366813459634197";
    document.head.appendChild(meta);


    return () => {
      document.body.removeChild(script); // 컴포넌트가 언마운트될 때 스크립트 제거
      document.head.removeChild(meta); // 메타 태그 제거
    };
  }, []);

  return (
    <IonPage>
      <Helmet>
        <title>당일 데이트 코스 목록</title>        
        <meta charSet="utf-8" />
        <meta name="keywords" content="당일치기데이트, 서울당일치기데이트, 데이트코스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="서울 당일치기 데이트하기 좋은 코스들을 볼 수 있어요. 연인과 행복한 추억을 만들어보세요." />
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Travel</IonTitle>
          {            
            isLoggedIn && (
            <IonButtons slot="end">
              <IonButton routerLink="/mypage">마이페이지</IonButton>
            </IonButtons>
          )}

          {
            // !isLoggedIn && (
              // true
              // <KakaoLoginButton />
            // )
          }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ListContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
