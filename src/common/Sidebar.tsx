import React from 'react';
import { IonList, IonItem } from '@ionic/react';

interface SidebarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="sidebar">
      <IonList>
        <IonItem
          button
          onClick={() => onTabClick('profile')}
          className={activeTab === 'profile' ? 'active' : ''}
        >
          내 정보
        </IonItem>
        <IonItem
          button
          onClick={() => onTabClick('likes')}
          className={activeTab === 'likes' ? 'active' : ''}
        >
          좋아요 목록
        </IonItem>
        <IonItem
          button
          onClick={() => onTabClick('addCourse')}
          className={activeTab === 'addCourse' ? 'active' : ''}
        >
          데이트 코스 등록
        </IonItem>
      </IonList>
    </div>
  );
};

export default Sidebar;
