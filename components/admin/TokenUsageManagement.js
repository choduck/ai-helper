import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  useTheme
} from '@chakra-ui/react';
import TokenUsageMonitoring from './TokenUsageMonitoring';
import TokenLimitsManagement from './TokenLimitsManagement';
import TokenAlertsManagement from './TokenAlertsManagement';

const TokenUsageManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // 탭 이름과 해당 컴포넌트 정의
  const tabs = [
    { 
      name: '사용량 모니터링', 
      component: <TokenUsageMonitoring />,
      description: '토큰 사용량 통계와 트렌드를 모니터링합니다.'
    },
    { 
      name: '사용자 제한 관리', 
      component: <TokenLimitsManagement />,
      description: '사용자별 토큰 사용 제한을 설정하고 관리합니다.'
    },
    { 
      name: '알림 관리', 
      component: <TokenAlertsManagement />,
      description: '토큰 사용량 관련 알림을 관리하고 알림 설정을 구성합니다.'
    }
  ];
  
  return (
    <Box p={4}>
      <Heading size="lg" mb={2}>토큰 사용량 관리</Heading>
      <Text color="gray.500" mb={6}>
        사용자 토큰 사용량을 모니터링하고 제한을 설정하며 알림을 관리합니다.
      </Text>
      
      <Tabs 
        index={activeTab} 
        onChange={setActiveTab} 
        variant="enclosed" 
        colorScheme="blue"
        isLazy
      >
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index}>{tab.name}</Tab>
          ))}
        </TabList>
        
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index} p={4}>
              {tab.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TokenUsageManagement; 