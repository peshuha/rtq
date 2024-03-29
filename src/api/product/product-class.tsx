export type TProduct = {
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
}

export type TUserLogin = {
    login: string,
    password: string,
    token: string
}