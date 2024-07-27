import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import axios from 'axios';
import KakaoMap from '../components/KakaoMap';
import CommentList from "../components/CommentList";
import { CommentDetail, ProductDetail, RegionDetail } from "../common/Types";
import API_URL from "../config";
import CommentForm from "../components/CommentForm";
import './Detail.css';
import { Helmet } from "react-helmet";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [regions, setRegions] = useState<RegionDetail[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<{ 
          product: ProductDetail; 
          regions: RegionDetail[]; 
          comments: CommentDetail[]; 
        }>(`${API_URL}/detail/${id}`);

        setProduct(response.data.product);
        setRegions(response.data.regions);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const addComment = (newComment: CommentDetail) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  }
  
  const handleTitleClick = () => {
    history.push('/');
  }

  return (
    <IonPage>
      <Helmet>
        <title>데이트 코스 상세</title>
        <meta name="google-adsense-account" content="ca-pub-9366813459634197" />      
        <meta charSet="utf-8" />        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="데이트 코스 상세 페이지" />
        
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle onClick={handleTitleClick} style={{ cursor: 'pointer' }}>Home</IonTitle>
        </IonToolbar>        
      </IonHeader>
      <IonContent fullscreen>      
        <div className="detail-container">
          {product ? (
            <>
              <div className="d-flex">
                <h2>{product.title}</h2> 
                <IonButton 
                  className="small-button"
                  href={product.url} 
                  target="_blank" 
                  rel="noopener noreferrer"                  
                >
                  방문하기
                </IonButton>                
              </div>

              <div>
                <h3>방문 순서</h3>
                {regions.map((region, index) => (
                  <div key={region.regionCd}>
                    <h3>{`${index +1}. ${region.title}`}</h3>
                  </div>
                ))}
              </div>

              <div className="map-container">
                <KakaoMap regions={regions} />
              </div>
              
              <div className="comment-section">
                <CommentForm productCd={id} addComment={addComment} />
                
              </div>

              <div className="comment-list">
                <CommentList comments={comments} />
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
      </IonContent>
    </IonPage>
  )
}

export default Detail;
