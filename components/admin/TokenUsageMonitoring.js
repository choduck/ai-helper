import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Heading, 
  Divider, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow, 
  SimpleGrid, 
  Badge, 
  Select, 
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TokenUsageMonitoring = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Fetch usage statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/admin/usage/statistics?timeRange=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        console.error('Error fetching token usage statistics:', err);
        setError('토큰 사용량 통계를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatistics();
  }, [timeRange]);
  
  if (loading) {
    return (
      <Flex justify="center" align="center" h="500px">
        <Spinner size="xl" />
      </Flex>
    );
  }
  
  if (error) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">토큰 사용량 모니터링</Heading>
        <Select 
          width="200px" 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">최근 7일</option>
          <option value="month">이번 달</option>
          <option value="quarter">최근 3개월</option>
          <option value="year">올해</option>
        </Select>
      </Flex>
      
      {statistics && (
        <>
          {/* 주요 토큰 통계 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Stat
              p={4}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <StatLabel fontSize="sm" color="gray.500">총 토큰 사용량</StatLabel>
              <StatNumber>{statistics.totalTokens.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type={statistics.tokenChange >= 0 ? 'increase' : 'decrease'} />
                {Math.abs(statistics.tokenChange)}% 변화
              </StatHelpText>
            </Stat>
            
            <Stat
              p={4}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <StatLabel fontSize="sm" color="gray.500">입력 토큰</StatLabel>
              <StatNumber>{statistics.inputTokens.toLocaleString()}</StatNumber>
              <StatHelpText>
                총 사용량의 {((statistics.inputTokens / statistics.totalTokens) * 100).toFixed(1)}%
              </StatHelpText>
            </Stat>
            
            <Stat
              p={4}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <StatLabel fontSize="sm" color="gray.500">출력 토큰</StatLabel>
              <StatNumber>{statistics.outputTokens.toLocaleString()}</StatNumber>
              <StatHelpText>
                총 사용량의 {((statistics.outputTokens / statistics.totalTokens) * 100).toFixed(1)}%
              </StatHelpText>
            </Stat>
            
            <Stat
              p={4}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <StatLabel fontSize="sm" color="gray.500">예상 비용</StatLabel>
              <StatNumber>${statistics.estimatedCost.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type={statistics.costChange >= 0 ? 'increase' : 'decrease'} />
                ${Math.abs(statistics.costChange).toLocaleString()} 변화
              </StatHelpText>
            </Stat>
          </SimpleGrid>
          
          {/* 사용자 활성화 및 모델 통계 */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
            {/* 모델별 사용량 */}
            <Box
              p={6}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              height="350px"
            >
              <Heading size="md" mb={4}>모델별 토큰 사용량</Heading>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={statistics.modelUsage}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statistics.modelUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            {/* 일별 사용량 트렌드 */}
            <Box
              p={6}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              height="350px"
            >
              <Heading size="md" mb={4}>일별 토큰 사용량 트렌드</Heading>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={statistics.dailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.getMonth() + 1}/${d.getDate()}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => value.toLocaleString()}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalTokens" 
                    stroke="#8884d8" 
                    name="총 토큰"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inputTokens" 
                    stroke="#82ca9d" 
                    name="입력 토큰"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="outputTokens" 
                    stroke="#ffc658" 
                    name="출력 토큰"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </SimpleGrid>
          
          {/* 활성 사용자 통계 */}
          <Box
            p={6}
            bg={cardBg}
            borderRadius="lg"
            boxShadow="md"
            borderWidth="1px"
            borderColor={borderColor}
            mb={8}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">활성 사용자 통계</Heading>
              <Badge colorScheme="blue" p={2} borderRadius="md">
                활성 사용자: {statistics.activeUsers}/{statistics.totalUsers} ({statistics.activePercentage}%)
              </Badge>
            </Flex>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Bar dataKey="value" fill="#8884d8" name="사용자 수" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TokenUsageMonitoring; 