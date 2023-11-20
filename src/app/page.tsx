"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <main className='mx-48 mt-24 mb-12'>
      <MainRestaurants />
    </main>
  )
}

export function HeroImage() {
  return (
    <div className="flex items-center justify-center">
      <Image className='block' alt='' src={"/hero.jpg"} width={500} height={500} />
    </div>
  )
}
type Restaurant = {
  id: number;
  name: string;
  address: string;
  rating: number;
  cuisine_type: string;
  opening_time: string;
  closing_time: string;
}
export function MainRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    if (restaurants.length === 0) {
      fetch('/api/restaurants')
        .then(response => response.json())
        .then(data => setRestaurants(data))
    }
  }, [])

  return (
    <section className="bg-white py-8 min-h-3/4">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Restaurantes Destacados</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        {restaurants.map(restaurant => (
          <DisplayedRestaurant
            key={restaurant.id}
            id={restaurant.id}
            category={restaurant.cuisine_type}
            name={restaurant.name}
            description="lorem"
            opening_time={restaurant.opening_time}
            closing_time={restaurant.closing_time}
            imageSrc=''
          />
        ))}
      </div>
    </section>
  )
}

export function DisplayedRestaurant({ id, category, name, description, opening_time, closing_time, imageSrc }: { id: number, category: string, name: string, description: string, imageSrc: string, opening_time: string, closing_time: string }) {
  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
        <Link href={`/restaurantes/${id}`} className="flex items-center flex-wrap no-underline hover:no-underline">
          {imageSrc && <div>
            <Image alt={name} src={imageSrc} width={50} height={50} />
          </div>}
          <div>
            <p className="w-full text-gray-600 text-xs md:text-sm px-6">{category}</p>
            <div className="w-full font-bold text-xl text-gray-800 px-6">{name}.</div>
            <p className="text-gray-800 text-base px-6 mb-5">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}