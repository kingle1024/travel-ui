import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from 'axios';
import KakaoMap from '../components/KakaoMap';
import CommentList from "../components/CommentList";
import { CommentDetail, ProductDetail, RegionDetail } from "../common/Types";
import API_URL from "../config";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Page</IonTitle>
        </IonToolbar>        
      </IonHeader>
      <IonContent fullscreen>      
        <div className="detail-container">
          {product ? (
            <>
              <h2>{product.title}</h2>
              <KakaoMap regions={regions} />
              <CommentList comments={comments} />
              <a href={product.url} target="_blank" rel="noopener noreferrer">방문하기</a>              
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