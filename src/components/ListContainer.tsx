import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

// 백엔드 API로부터 받아온 데이터의 형식을 정의합니다.
interface Item {
  id: number;
  title: string;
}

const ListContainer: React.FC = () => {
  const [data, setData] = useState<Item[]>([]); // 데이터를 저장할 상태 변수

  useEffect(() => {
    // 백엔드 API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        // Axios를 사용하여 백엔드 API 호출
        const response: AxiosResponse<Item[]> = await axios.get<Item[]>('http://localhost:8080/list');
        // API 응답 데이터를 상태 변수에 저장
        setData(response.data);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {/* 데이터 배열을 매핑하여 각 요소를 표시 */}
        {data.map((item: Item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListContainer;
