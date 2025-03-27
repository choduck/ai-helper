// 이것은 프론트엔드 개발 단계에서 사용하는 임시 API입니다.
// 실제로는 Spring Boot 백엔드에 연결해야 합니다.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;
  
  // 간단한 응답 로직
  let response;
  
  if (message.includes('안녕') || message.includes('반가워')) {
    response = '안녕하세요! 오늘 어떤 업무를 도와드릴까요?';
  } else if (message.includes('문서') || message.includes('보고서')) {
    response = '문서 작성을 도와드릴 수 있습니다. 어떤 종류의 문서가 필요하신가요?';
  } else if (message.includes('이미지') || message.includes('그림')) {
    response = '이미지 생성 기능을 통해 원하시는 이미지를 만들어 드릴 수 있습니다. 어떤 이미지가 필요하신가요?';
  } else if (message.includes('데이터') || message.includes('분석')) {
    response = '데이터 분석을 도와드릴 수 있습니다. 어떤 데이터를 분석하고 싶으신가요?';
  } else if (message.includes('이메일') || message.includes('메일')) {
    response = '이메일 작성을 도와드릴 수 있습니다. 어떤 종류의 이메일을 작성하고 싶으신가요?';
  } else {
    response = '말씀하신 내용에 대해 더 자세히 알려주시면 더 정확한 도움을 드릴 수 있습니다.';
  }

  // 응답 전송 (실제 API에서는 더 복잡한 처리가 필요할 수 있음)
  res.status(200).json({ response });
}