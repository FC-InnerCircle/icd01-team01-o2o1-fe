import { BASE_URL } from '@/constants/api'
import { delay, http, HttpResponse } from 'msw'

const encoder = new TextEncoder()

export const orderStatus = [
  {
    courierId: 123,
    latitude: 37.5665,
    longitude: 126.978,
    timestamp: '2024-08-22T10:00:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56652,
    longitude: 126.9782,
    timestamp: '2024-08-22T10:01:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56654,
    longitude: 126.9784,
    timestamp: '2024-08-22T10:02:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56656,
    longitude: 126.9786,
    timestamp: '2024-08-22T10:03:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56658,
    longitude: 126.9788,
    timestamp: '2024-08-22T10:04:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.5666,
    longitude: 126.979,
    timestamp: '2024-08-22T10:05:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56662,
    longitude: 126.9792,
    timestamp: '2024-08-22T10:06:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56664,
    longitude: 126.9794,
    timestamp: '2024-08-22T10:07:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56666,
    longitude: 126.9796,
    timestamp: '2024-08-22T10:08:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.56668,
    longitude: 126.9798,
    timestamp: '2024-08-22T10:09:00.000Z',
  },
  {
    courierId: 123,
    latitude: 37.5667,
    longitude: 126.98,
    timestamp: '2024-08-22T10:10:00.000Z',
  },
]

export const mockOrderResponse = {
  response: {
    orderId: 1,
    orderTime: '2024-08-24 09:15',
    orderStatus: 'pending',
    orderPrice: 35500,
    store: {
      storeId: 2,
      storeName: '홍길동 한식당',
      storeAddress: {
        latitude: 37.5665,
        longitude: 126.978,
        address: '서울시 블라',
        addressDetail: '몇동 몇호',
        zipCode: '12345',
      },
    },
    menus: [
      {
        menuId: 2,
        menuName: '치킨',
        menuCount: 1,
        optionGroup: [
          {
            optionGroupId: 2,
            optionGroupName: '야채',
            option: [
              {
                optionId: 2,
                optionName: '파 추가',
              },
            ],
          },
        ],
      },
      {
        menuId: 3,
        menuName: '치킨무',
        menuCount: 1,
        optionGroup: [
          {
            optionGroupId: 3,
            optionGroupName: '야채',
            option: [
              {
                optionId: 4,
                optionName: '파 추가',
              },
            ],
          },
        ],
      },
    ],
    orderAddress: {
      addressId: 2,
      latitude: 37.5667,
      longitude: 126.98,
      address: '서울시 블라',
      addressDetail: '몇동 몇호',
      zipCode: '12345',
    },
  },
  statusCode: 200,
  msg: 'success',
}

export const orderHandlers = [
  http.get(`${BASE_URL}/order/pending`, async () => {
    await delay(1000)
    return HttpResponse.json(mockOrderResponse)
  }),
  http.delete(`${BASE_URL}/order/pending`, async () => {
    await delay(1000)
    return HttpResponse.json({
      response: {
        orderId: 2,
      },
      statusCode: 200,
      msg: 'success',
    })
  }),
  http.get(`${BASE_URL}/order/1/stream`, () => {
    const stream = new ReadableStream({
      start(controller) {
        let counter = 0

        const orderStatus = [
          {
            orderId: 12,
            orderStatus: 'pending',
            timestamp: '2024-08-22T10:00:00Z',
          },
          {
            orderId: 12,
            orderStatus: 'accepted',
            timestamp: '2024-08-22T10:05:00Z',
          },
          {
            orderId: 12,
            orderStatus: 'preparing',
            timestamp: '2024-08-22T10:10:00Z',
          },
          {
            orderId: 12,
            orderStatus: 'delivering',
            timestamp: '2024-08-22T10:15:00Z',
          },
          {
            orderId: 12,
            orderStatus: 'delivered',
            timestamp: '2024-08-22T10:20:00Z',
          },
        ]

        function push() {
          if (counter < 5) {
            // 5번의 이벤트를 보낼 예시
            const data = JSON.stringify(orderStatus[counter])
            controller.enqueue(encoder.encode(`event:orderStatusUpdate\ndata:${data}\n\n`))
            counter++
            setTimeout(push, 3000)
          } else {
            controller.close() // 모든 데이터 전송 후 스트림 닫기
          }
        }

        push() // 첫 번째 데이터 전송 시작
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }),
  http.get(`${BASE_URL}/delivery/1/location`, () => {
    const stream = new ReadableStream({
      start(controller) {
        let counter = 0

        function push() {
          if (counter < 10) {
            // 10번의 이벤트를 보낼 예시
            const data = JSON.stringify(orderStatus[counter])
            controller.enqueue(encoder.encode(`event:orderStatusUpdate\ndata:${data}\n\n`))
            counter++
            setTimeout(push, 100)
          } else {
            controller.close() // 모든 데이터 전송 후 스트림 닫기
          }
        }

        push() // 첫 번째 데이터 전송 시작
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }),
]
