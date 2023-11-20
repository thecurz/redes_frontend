import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from "dotenv"
dotenv.config()
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { nombre, apellido, telefono, direccion, pago } = req.body;
    const response = await fetch(`${process.env.BASE_URL}/api/create_receipt/`, {
        method: 'POST',
        body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            direccion,
            pago
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response.status)
    res.status(200).json(response.status);
}