import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  Divider,
  Stack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  useToast,
  Select,
  Icon
} from '@chakra-ui/react';
import { CheckIcon, EmailIcon, BellIcon, DeleteIcon } from '@chakra-ui/icons';

const TokenAlertsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [alertSettings, setAlertSettings] = useState({
    send_warning_emails: true,
    send_critical_emails: true,
    send_limit_reached_emails: true,
    warning_threshold: 70,
    critical_threshold: 90,
    admin_notification_enabled: true,
    daily_usage_report: false
  });
  const [settingsChanged, setSettingsChanged] = useState(false);
  
  const toast = useToast();
  
  // Fetch alerts
  useEffect(() => {
    fetchAlerts();
  }, []);
  
  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/usage/alerts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      
      const data = await response.json();
      setAlerts(data.alerts);
      
      // 알림 설정도 가져오기 (실제 구현에서는 별도 API 또는 이 응답의 일부로 포함)
      // 현재는 더미 데이터로 설정
      setAlertSettings({
        send_warning_emails: true,
        send_critical_emails: true,
        send_limit_reached_emails: true,
        warning_threshold: 70,
        critical_threshold: 90,
        admin_notification_enabled: true,
        daily_usage_report: false
      });
      
      setSettingsChanged(false);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('알림 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle alert markAsRead
  const handleMarkAsRead = async (alertId) => {
    try {
      const response = await fetch(`/api/admin/usage/alerts/${alertId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_read: true })
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark alert as read');
      }
      
      // 성공 시 로컬 상태 업데이트
      setAlerts(alerts.map(alert => 
        alert.alert_id === alertId 
          ? { ...alert, is_read: true } 
          : alert
      ));
      
      toast({
        title: '알림 읽음 표시',
        description: '알림이 읽음으로 표시되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error marking alert as read:', err);
      toast({
        title: '오류 발생',
        description: '알림 읽음 처리 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Handle alert delete
  const handleDeleteAlert = async (alertId) => {
    try {
      const response = await fetch(`/api/admin/usage/alerts/${alertId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete alert');
      }
      
      // 성공 시 로컬 상태 업데이트
      setAlerts(alerts.filter(alert => alert.alert_id !== alertId));
      
      toast({
        title: '알림 삭제',
        description: '알림이 삭제되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error deleting alert:', err);
      toast({
        title: '오류 발생',
        description: '알림 삭제 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Handle settings change
  const handleSettingsChange = (field, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setSettingsChanged(true);
  };
  
  // Save alert settings
  const saveAlertSettings = async () => {
    try {
      const response = await fetch('/api/admin/usage/alerts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alertSettings)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save alert settings');
      }
      
      setSettingsChanged(false);
      
      toast({
        title: '설정 저장 완료',
        description: '알림 설정이 성공적으로 저장되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error saving alert settings:', err);
      toast({
        title: '오류 발생',
        description: '알림 설정 저장 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Get alert type color
  const getAlertTypeColor = (alertType) => {
    switch (alertType) {
      case 'WARNING':
        return 'yellow';
      case 'CRITICAL':
        return 'red';
      case 'ANOMALY':
        return 'orange';
      case 'LIMIT_REACHED':
        return 'red';
      default:
        return 'blue';
    }
  };
  
  if (loading && alerts.length === 0) {
    return (
      <Flex justify="center" align="center" h="500px">
        <Spinner size="xl" />
      </Flex>
    );
  }
  
  return (
    <Box>
      <Heading size="lg" mb={6}>토큰 사용량 알림 관리</Heading>
      
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <Tabs isFitted variant="enclosed" isLazy>
        <TabList mb={4}>
          <Tab>알림 목록</Tab>
          <Tab>알림 설정</Tab>
        </TabList>
        
        <TabPanels>
          {/* 알림 목록 탭 */}
          <TabPanel p={0}>
            {alerts.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>유형</Th>
                      <Th>메시지</Th>
                      <Th>사용자</Th>
                      <Th>날짜</Th>
                      <Th>상태</Th>
                      <Th>작업</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alerts.map((alert) => (
                      <Tr 
                        key={alert.alert_id} 
                        bg={alert.is_read ? 'transparent' : 'blue.50'}
                        _dark={{
                          bg: alert.is_read ? 'transparent' : 'blue.900'
                        }}
                      >
                        <Td>
                          <Badge colorScheme={getAlertTypeColor(alert.alert_type)}>
                            {alert.alert_type}
                          </Badge>
                        </Td>
                        <Td>{alert.message}</Td>
                        <Td>
                          {alert.username ? (
                            <Text>{alert.username}</Text>
                          ) : (
                            <Badge>시스템</Badge>
                          )}
                        </Td>
                        <Td>
                          {new Date(alert.created_at).toLocaleDateString()} {new Date(alert.created_at).toLocaleTimeString()}
                        </Td>
                        <Td>
                          <Badge colorScheme={alert.is_read ? 'green' : 'blue'}>
                            {alert.is_read ? '읽음' : '안 읽음'}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            {!alert.is_read && (
                              <Tooltip label="읽음으로 표시">
                                <IconButton
                                  aria-label="Mark as read"
                                  icon={<CheckIcon />}
                                  size="sm"
                                  colorScheme="blue"
                                  onClick={() => handleMarkAsRead(alert.alert_id)}
                                />
                              </Tooltip>
                            )}
                            <Tooltip label="삭제">
                              <IconButton
                                aria-label="Delete alert"
                                icon={<DeleteIcon />}
                                size="sm"
                                colorScheme="red"
                                onClick={() => handleDeleteAlert(alert.alert_id)}
                              />
                            </Tooltip>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Box textAlign="center" py={10}>
                <BellIcon boxSize={10} color="gray.400" mb={4} />
                <Text fontSize="lg" color="gray.500">알림이 없습니다.</Text>
              </Box>
            )}
          </TabPanel>
          
          {/* 알림 설정 탭 */}
          <TabPanel>
            <Stack spacing={6}>
              <Card>
                <CardHeader>
                  <Heading size="md">이메일 알림 설정</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='warning-email' mb='0'>
                        사용량 경고 알림 이메일 (70% 도달)
                      </FormLabel>
                      <Switch 
                        id='warning-email' 
                        isChecked={alertSettings.send_warning_emails}
                        onChange={(e) => handleSettingsChange('send_warning_emails', e.target.checked)}
                      />
                    </FormControl>
                    
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='critical-email' mb='0'>
                        사용량 심각 알림 이메일 (90% 도달)
                      </FormLabel>
                      <Switch 
                        id='critical-email' 
                        isChecked={alertSettings.send_critical_emails}
                        onChange={(e) => handleSettingsChange('send_critical_emails', e.target.checked)}
                      />
                    </FormControl>
                    
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='limit-email' mb='0'>
                        사용량 제한 도달 알림 이메일
                      </FormLabel>
                      <Switch 
                        id='limit-email' 
                        isChecked={alertSettings.send_limit_reached_emails}
                        onChange={(e) => handleSettingsChange('send_limit_reached_emails', e.target.checked)}
                      />
                    </FormControl>
                  </Stack>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <Heading size="md">임계값 설정</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel htmlFor='warning-threshold'>경고 임계값 (%)</FormLabel>
                      <Select
                        id='warning-threshold'
                        value={alertSettings.warning_threshold}
                        onChange={(e) => handleSettingsChange('warning_threshold', parseInt(e.target.value, 10))}
                      >
                        {Array.from({ length: 19 }, (_, i) => (i + 1) * 5).map(value => (
                          <option key={value} value={value}>{value}%</option>
                        ))}
                      </Select>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel htmlFor='critical-threshold'>심각 임계값 (%)</FormLabel>
                      <Select
                        id='critical-threshold'
                        value={alertSettings.critical_threshold}
                        onChange={(e) => handleSettingsChange('critical_threshold', parseInt(e.target.value, 10))}
                        isDisabled={!alertSettings.send_critical_emails}
                      >
                        {Array.from({ length: 19 }, (_, i) => (i + 1) * 5)
                          .filter(value => value > alertSettings.warning_threshold)
                          .map(value => (
                            <option key={value} value={value}>{value}%</option>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Stack>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <Heading size="md">관리자 알림 설정</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='admin-notification' mb='0'>
                        관리자 알림 활성화
                      </FormLabel>
                      <Switch 
                        id='admin-notification' 
                        isChecked={alertSettings.admin_notification_enabled}
                        onChange={(e) => handleSettingsChange('admin_notification_enabled', e.target.checked)}
                      />
                    </FormControl>
                    
                    <FormControl display='flex' alignItems='center'>
                      <FormLabel htmlFor='daily-report' mb='0'>
                        일일 사용량 리포트 수신
                      </FormLabel>
                      <Switch 
                        id='daily-report' 
                        isChecked={alertSettings.daily_usage_report}
                        onChange={(e) => handleSettingsChange('daily_usage_report', e.target.checked)}
                      />
                    </FormControl>
                  </Stack>
                </CardBody>
              </Card>
              
              <Flex justify="flex-end">
                <Button 
                  colorScheme="blue" 
                  leftIcon={<EmailIcon />}
                  onClick={saveAlertSettings}
                  isDisabled={!settingsChanged}
                >
                  알림 설정 저장
                </Button>
              </Flex>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TokenAlertsManagement; 