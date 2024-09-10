import { authHandlers } from './auth'
import { memberHandlers } from './member'
import { orderHandlers } from './order'
import { reviewHandlers } from './review'

export const handlers = [...reviewHandlers, ...orderHandlers, ...authHandlers, ...memberHandlers]
