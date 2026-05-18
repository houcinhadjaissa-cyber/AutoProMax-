export interface Product {
  id: string
  name: string
  price: number
  image?: string
  category?: string
}

export const products: Product[] = [
  { id: '1', name: 'Brake Pad Set Pro', price: 6499, category: 'Brakes' },
  { id: '2', name: 'Oil Filter Premium', price: 2499, category: 'Filters' },
  { id: '3', name: 'LED Headlight Kit', price: 12999, category: 'Lighting' },
  { id: '4', name: 'Air Filter Sport', price: 3499, category: 'Filters' },
]
