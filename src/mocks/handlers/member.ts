import { BASE_URL } from '@/constants/api'
import { HttpResponse, http } from 'msw'

export const memberHandlers = [
  http.get(`${BASE_URL}/member`, ({ request }) => {
    return HttpResponse.json({
      response: {
        memberId: 1,
        nickName: 'test',
        contact: '010-1234-5678',
        name: '홍길동',
      },
      statusCode: 200,
      msg: '회원 정보를 조회하였습니다',
    })
  }),
  http.post(`${BASE_URL}/member`, ({ request }) => {
    return HttpResponse.json({
      response: {},
      statusCode: 200,
      msg: '회원 가입 성공',
    })
  }),
]
