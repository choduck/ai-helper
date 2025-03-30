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
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  Select,
  IconButton,
  Tooltip,
  Badge,
  Text,
  useToast,
  HStack,
  Stack
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const TokenLimitsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLimits, setUserLimits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLimit, setCurrentLimit] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    user_id: '',
    username: '',
    monthly_token_limit: 100000,
    warning_threshold: 70,
    critical_threshold: 90
  });
  
  // Fetch user limits
  useEffect(() => {
    fetchUserLimits();
  }, [page, searchTerm]);
  
  const fetchUserLimits = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/admin/usage/limits?page=${page}&size=10&search=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user limits');
      }
      
      const data = await response.json();
      setUserLimits(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Error fetching user limits:', err);
      setError('사용자 토큰 제한 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle add new limit
  const handleAddLimit = () => {
    setModalMode('add');
    setFormData({
      user_id: '',
      username: '',
      monthly_token_limit: 100000,
      warning_threshold: 70,
      critical_threshold: 90
    });
    onOpen();
  };
  
  // Handle edit limit
  const handleEditLimit = (limit) => {
    setModalMode('edit');
    setCurrentLimit(limit);
    setFormData({
      user_id: limit.user_id,
      username: limit.username,
      monthly_token_limit: limit.monthly_token_limit,
      warning_threshold: limit.warning_threshold,
      critical_threshold: limit.critical_threshold
    });
    onOpen();
  };
  
  // Handle delete limit
  const handleDeleteLimit = async (limitId) => {
    if (!window.confirm('이 토큰 제한을 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/usage/limits/${limitId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete limit');
      }
      
      toast({
        title: '토큰 제한 삭제 완료',
        description: '토큰 사용 제한이 성공적으로 삭제되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      fetchUserLimits();
    } catch (err) {
      console.error('Error deleting limit:', err);
      toast({
        title: '오류 발생',
        description: '토큰 제한 삭제 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Handle form submit
  const handleSubmit = async () => {
    try {
      let response;
      
      if (modalMode === 'add') {
        response = await fetch('/api/admin/usage/limits', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`/api/admin/usage/limits/${currentLimit.limit_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      
      if (!response.ok) {
        throw new Error(`Failed to ${modalMode} limit`);
      }
      
      toast({
        title: modalMode === 'add' ? '토큰 제한 추가 완료' : '토큰 제한 수정 완료',
        description: modalMode === 'add' 
          ? '새 토큰 사용 제한이 성공적으로 추가되었습니다.' 
          : '토큰 사용 제한이 성공적으로 수정되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onClose();
      fetchUserLimits();
    } catch (err) {
      console.error(`Error ${modalMode === 'add' ? 'adding' : 'updating'} limit:`, err);
      toast({
        title: '오류 발생',
        description: `토큰 제한 ${modalMode === 'add' ? '추가' : '수정'} 중 오류가 발생했습니다.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Handle form change
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  if (loading && userLimits.length === 0) {
    return (
      <Flex justify="center" align="center" h="500px">
        <Spinner size="xl" />
      </Flex>
    );
  }
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">사용자 토큰 제한 관리</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleAddLimit}>
          새 제한 추가
        </Button>
      </Flex>
      
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      {/* 검색 바 */}
      <Box mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="사용자 이름 또는 이메일로 검색" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      
      {/* 사용자 토큰 제한 테이블 */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>사용자</Th>
              <Th isNumeric>월별 토큰 제한</Th>
              <Th>경고 임계값</Th>
              <Th>중요 임계값</Th>
              <Th>상태</Th>
              <Th>작업</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userLimits.length > 0 ? (
              userLimits.map((limit) => (
                <Tr key={limit.limit_id}>
                  <Td>
                    <Text fontWeight="bold">{limit.username}</Text>
                  </Td>
                  <Td isNumeric>{limit.monthly_token_limit.toLocaleString()}</Td>
                  <Td>
                    <Badge colorScheme="yellow">{limit.warning_threshold}%</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme="red">{limit.critical_threshold}%</Badge>
                  </Td>
                  <Td>
                    {limit.current_usage && (
                      <Badge
                        colorScheme={
                          limit.current_usage / limit.monthly_token_limit >= limit.critical_threshold / 100
                            ? 'red'
                            : limit.current_usage / limit.monthly_token_limit >= limit.warning_threshold / 100
                            ? 'yellow'
                            : 'green'
                        }
                      >
                        {Math.round((limit.current_usage / limit.monthly_token_limit) * 100)}%
                      </Badge>
                    )}
                    {!limit.current_usage && (
                      <Badge colorScheme="green">0%</Badge>
                    )}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="수정">
                        <IconButton
                          aria-label="Edit limit"
                          icon={<EditIcon />}
                          size="sm"
                          onClick={() => handleEditLimit(limit)}
                        />
                      </Tooltip>
                      <Tooltip label="삭제">
                        <IconButton
                          aria-label="Delete limit"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteLimit(limit.limit_id)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  {loading ? '로딩 중...' : '설정된 토큰 제한이 없습니다.'}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      
      {/* 페이지네이션 */}
      <Flex justify="center" mt={6}>
        <HStack>
          <Button
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
            size="sm"
          >
            이전
          </Button>
          <Text>
            {page} / {totalPages}
          </Text>
          <Button
            onClick={() => setPage(page + 1)}
            isDisabled={page === totalPages}
            size="sm"
          >
            다음
          </Button>
        </HStack>
      </Flex>
      
      {/* 토큰 제한 추가/수정 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'add' ? '새 토큰 제한 추가' : '토큰 제한 수정'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>사용자 ID</FormLabel>
                <Input
                  placeholder="사용자 ID를 입력하세요"
                  value={formData.user_id}
                  onChange={(e) => handleFormChange('user_id', e.target.value)}
                  isReadOnly={modalMode === 'edit'}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>사용자 이름</FormLabel>
                <Input
                  placeholder="사용자 이름을 입력하세요 (선택사항)"
                  value={formData.username}
                  onChange={(e) => handleFormChange('username', e.target.value)}
                  isReadOnly={modalMode === 'edit'}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>월별 토큰 제한</FormLabel>
                <NumberInput
                  min={1000}
                  step={1000}
                  value={formData.monthly_token_limit}
                  onChange={(valueString) => handleFormChange('monthly_token_limit', parseInt(valueString.replace(/\D/g, ''), 10))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>경고 임계값 (%)</FormLabel>
                <NumberInput
                  min={1}
                  max={99}
                  value={formData.warning_threshold}
                  onChange={(valueString) => handleFormChange('warning_threshold', parseInt(valueString, 10))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>중요 임계값 (%)</FormLabel>
                <NumberInput
                  min={formData.warning_threshold ? formData.warning_threshold + 1 : 2}
                  max={100}
                  value={formData.critical_threshold}
                  onChange={(valueString) => handleFormChange('critical_threshold', parseInt(valueString, 10))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {modalMode === 'add' ? '추가' : '수정'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TokenLimitsManagement; 