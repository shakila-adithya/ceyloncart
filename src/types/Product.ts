export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  tags?: string[]
  availabilityStatus?: string
  minimumOrderQuantity?: number
  shippingInformation?: string
  warrantyInformation?: string
  returnPolicy?: string
  reviews?: Review[]
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Category {
  slug: string
  name: string
  url: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken?: string
}

export interface LoginPayload {
  username: string
  password: string
}