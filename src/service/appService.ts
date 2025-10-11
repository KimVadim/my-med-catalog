import axios from 'axios'
export const API_URL = 'https://palvenko-production.up.railway.app'

export const endpoints = {
  ADD_ORDER: `${API_URL}/endpoints/med/add-order`,
}

export interface AddOrder {
  firstName: string
  lastName: string
  phone: string
  product: string
  amount: number
  orderDt: string
}

export const addOrder = async (values: AddOrder) => {
  try {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      product: values.product,
      amount: values.amount,
      orderDt: values.orderDt,
    }

    const response = await axios.post(endpoints.ADD_ORDER, payload)

    console.log('Ответ сервера:', response.data)
    return response?.data?.message?.con_id
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка запроса:', error.response?.data)
    } else {
      console.error('Непредвиденная ошибка:', error)
    }
  }
}
