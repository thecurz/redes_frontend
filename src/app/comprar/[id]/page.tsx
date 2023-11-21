"use client"
import { useState } from 'react'

export default function Comprar({ params }: { params: { id: string } }) {
    const id = params.id

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [pago, setPago] = useState('')
    const [saleStatus, setSaleStatus] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const venta = { nombre, apellido, telefono, direccion, pago, product: id }

        const response = await fetch('/api/venta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        })

        if (response.ok) {
            setSaleStatus(true);
            console.log('Venta submitted successfully')
        } else {
            // Handle error
            console.error('Error submitting venta')
        }
    }

    return (
        <main className="min-h-3/4 mx-48 mt-24 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-xl w-full">
                <form onSubmit={handleSubmit} className="text-black space-y-4">
                    <label className="block">
                        <span className="text-black">Nombre:</span>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Apellido:</span>
                        <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 text-black">Numero de telefono:</span>
                        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Direccion:</span>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Metodo de pago:</span>
                        <input type="text" value={pago} onChange={e => setPago(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <button type="submit" className="w-full py-2 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500 focus:outline-none">Submit</button>
                </form>
                {saleStatus && <div className="bg-white p-8 rounded shadow-md max-w-xl w-full">
                    <h1 className="text-black text-2xl font-bold mb-4">{"Venta realizada"}</h1></div>}
            </div>

        </main>
    )
}