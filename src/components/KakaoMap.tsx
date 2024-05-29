import React, { useEffect } from 'react';
import './KakaoMap.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b3851f460ed49a031b6c35cb808a1514&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 좌표 (서울)
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다    
        // imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        const imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(64, 69), imageOption);
        // 마커 추가
        // 마커를 표시할 위치와 title 객체 배열입니다 
        const positions = [
          { lat: 37.5665, lng: 126.9780, title: '서울시청' },
          { lat: 37.5655, lng: 126.9760, title: '덕수궁' },
          { lat: 37.5645, lng: 126.9740, title: '경복궁' },
        ];
        positions.forEach(position => {

          const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
          });
          marker.setMap(map);

          const content = `<div class="customoverlay">
            <a href="https://map.kakao.com/link/map/11394059" target="_blank">
              <span class="title">${position.title}</span>
            </a>
          </div>`;
          const overlay = new window.kakao.maps.CustomOverlay({
            map: map,
            position: markerPosition,
            content: content,    
            yAnchor: 1,
          }); 
        });
      });
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

export default KakaoMap;
