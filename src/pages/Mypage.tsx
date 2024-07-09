import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Mypage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>마이페이지</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>여기는 로그인한 사용자만 접근할 수 있는 마이페이지입니다.</p>
      </IonContent>
    </IonPage>
  );
};

export default Mypage;
