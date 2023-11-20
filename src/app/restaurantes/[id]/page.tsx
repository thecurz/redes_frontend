"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import Link from 'next/link'

type Restaurant = {
    id: number;
    name: string;
    address: string;
    rating: number;
    cuisine_type: string;
    opening_time: string;
    closing_time: string;
}
type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    is_available: boolean;
    restaurant: number;
}
export default function RestaurantPage({ params }: { params: { id: string } }) {
    // const router = useRouter()
    const id = params.id

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        // Fetch restaurant data
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))

        // Fetch product data
        fetch(`/api/products?id=${id}`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [id])

    if (!products) {
        return <div>Loading...</div>
    }

    return (
        <main className="min-h-3/4 mx-48 mt-24 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="mx-48 my-12 bg-white p-8 rounded shadow-md max-w-xl w-full">
                <h1 className="text-2xl text-black font-bold mb-4">{"Platos"}</h1>
                {products.map(product => (
                    <Link href={`/comprar/${id}`}>
                        <div key={product.id} className="mb-4 border-b pb-4 last:border-0">
                            <h2 className="text-xl text-black font-semibold">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}