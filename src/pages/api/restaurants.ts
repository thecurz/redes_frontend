import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from "dotenv"
dotenv.config()
export default async function getRestaurants(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(`${process.env.BASE_URL}/api/restaurants/`)
    const data = await response.json()

    res.status(200).json(data)
}