// src/pages/Profile.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Ticket, LogOut, Edit } from 'lucide-react';

const userProfile = {
    name: "Erik Davis",
    username: "HinchaUCV_2025",
    memberSince: "Enero 2025",
    avatarUrl: "https://via.placeholder.com/150/5A67D8/FFFFFF?text=UCV",
};

const userTickets = [
    { id: 101, match: "UCV vs Melgar", date: "15/11/2025", location: "Tribuna Norte", price: 50.00, status: "Usado" },
    { id: 102, match: "UCV vs Alianza Lima", date: "29/11/2025", location: "Zona VIP", price: 150.00, status: "Activo" },
    { id: 103, match: "UCV vs Sporting Cristal", date: "06/12/2025", location: "Sector General", price: 85.00, status: "Activo" },
];

function Profile() {
    const [tickets, setTickets] = useState(userTickets);

    return (
        <div className="p-4 bg-gray-900 min-w-full">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-400">
                MI PERFIL
            </h1>

            {/* Tarjeta del Perfil */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 border border-gray-700 text-center"
            >
                <img 
                    src={userProfile.avatarUrl} 
                    alt="Avatar de Usuario" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
                />
                
                <h2 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h2>
                <p className="text-blue-400 font-mono mb-3">@{userProfile.username}</p>
                <p className="text-sm text-gray-400">Miembro desde {userProfile.memberSince}</p>

                <div className="flex justify-center space-x-4 mt-4">
                    <button 
                        onClick={() => alert("Función de edición simulada.")}
                        className="flex items-center text-sm text-gray-300 hover:text-green-400 transition"
                    >
                        <Edit size={16} className="mr-1" />
                        Editar Perfil
                    </button>
                    <button 
                        onClick={() => alert("Cerrando sesión...")}
                        className="flex items-center text-sm text-gray-300 hover:text-red-400 transition"
                    >
                        <LogOut size={16} className="mr-1" />
                        Cerrar Sesión
                    </button>
                </div>
            </motion.div>

            {/* Sección de Entradas */}
            <h2 className="text-xl font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2 flex items-center">
                <Ticket size={20} className="mr-2 text-blue-400" /> Mis Entradas Compradas
            </h2>

            <div className="space-y-4 pb-20">
                {tickets.map(ticket => (
                    <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * tickets.indexOf(ticket) }}
                        className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-700"
                    >
                        <div>
                            <p className="font-bold text-lg text-white">{ticket.match}</p>
                            <p className="text-sm text-gray-400">{ticket.date} - {ticket.location}</p>
                            <p className="text-md font-semibold text-green-400 mt-1">S/{ticket.price.toFixed(2)}</p>
                        </div>
                        <span 
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                ticket.status === 'Activo' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}
                        >
                            {ticket.status}
                        </span>
                    </motion.div>
                ))}
            </div>
            
        </div>
    );
}

export default Profile;