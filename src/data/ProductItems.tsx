import {
  HeartOutline,
  UserOutline,
  SmileOutline,
  AppstoreOutline,
} from 'antd-mobile-icons'
import React from 'react'

export interface CatalogItem {
  id: string
  title: string
  priceName: string
  price: number
  description?: string
  icon: React.ReactNode
  bgColor: string
  hoverBgColor: string
}

export const productItems: CatalogItem[] = [
  {
    id: 'parasites',
    icon: <HeartOutline style={{ fontSize: 24, color: '#ff6b6b' }} />,
    title: 'Питание при лечении паразитов',
    priceName: '10 тыс.',
    price: 10000,
    description: '',
    bgColor: '#fff5f0',
    hoverBgColor: '#ffe8e0',
  },
  {
    id: 'anemia',
    icon: <HeartOutline style={{ fontSize: 24, color: '#ff6b6b' }} />,
    title: 'Анемия',
    priceName: '30 тыс.',
    price: 30000,
    description: '',
    bgColor: '#fff9f0',
    hoverBgColor: '#fff3e0',
  },
  {
    id: 'neyrovospolenie',
    icon: <UserOutline style={{ fontSize: 24, color: '#52c41a' }} />,
    title: 'Нейровоспаление',
    priceName: '30 тыс.',
    price: 30000,
    description: '',
    bgColor: '#d4f4dd',
    hoverBgColor: '#c1edd0',
  },
  {
    id: 'kandidoz',
    icon: <SmileOutline style={{ fontSize: 24, color: '#ff9966' }} />,
    title: 'Питание при кандидозе',
    priceName: '10 тыс.',
    price: 10000,
    description: '',
    bgColor: '#fff5f0',
    hoverBgColor: '#ffe8e0',
  },
  {
    id: 'tonzillin',
    icon: <AppstoreOutline style={{ fontSize: 24, color: '#ffcc66' }} />,
    title: 'Хронический тонзиллит',
    priceName: '30 тыс.',
    price: 30000,
    description: '',
    bgColor: '#fff9f0',
    hoverBgColor: '#fff3e0',
  },
]
