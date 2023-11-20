import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from "dotenv"
dotenv.config()
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(`${process.env.BASE_URL}/api/products/${req.query.id}/`)
    const data = await response.json()
    // res.status(200).json(`GET /products/${req.query.id}`)
    res.status(200).json(data)
}