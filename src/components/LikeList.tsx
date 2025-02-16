import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import API_URL from "../config";
import './ListContainer.css';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonButtons, IonButton } from '@ionic/react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../common/AuthContextType';
import UseTokenRefresh from '../common/UseTokenRefresh';
import { Product_mst } from '../response/LikesResponse';

const LikeList: React.FC = () => {
  const { fetchWithToken } = UseTokenRefresh();
  const { user, logout } = useAuth();
  const history = useHistory();
  const [likedProducts, setLikedProducts] = useState<Product_mst[]>([]); // 좋아요 목록을 저장할 상태 변수
  const [activeTab, setActiveTab] = useState('profile'); // 기본 활성화된 탭 설정

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const data = await fetchWithToken(`${API_URL}/api/mypage/likes`);
      if (data) {
        setLikedProducts(data.product);
      }
    };

    fetchLikedProducts();
  }, []);

  const handleTitleClick = () => {
    history.push('/');
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // "내 정보" 클릭 시 /mypage로 이동
    if (tab === 'profile') {
      history.push('/mypage');
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
            </IonList>
          </div>

          <div className='content'>
            <h2>좋아요 목록</h2>
            <ul>
              {/* 좋아요 목록을 매핑하여 각 요소를 표시 */}
              {likedProducts.map((item: Product_mst) => (
                <li key={item.id}>
                  <Link to={`/detail/${item.id}`}>{item.title}</Link>
                  <div>
                    {item.regionTitle.split(',').map((region: string, index: number) => (
                      <span key={index} className="badge badge-secondary" style={{ marginRight: '5px' }}>
                        {region}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default LikeList;
