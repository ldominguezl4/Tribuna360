// src/pages/Multimedia.js (VERSIÓN FINAL Y ESTABLE DE DEMO LOCAL - SIN FIREBASE)
import React, { useState, useEffect, useRef } from 'react';
import CardPost from '../components/CardPost';
import { Send, Upload, Trash2, Loader2, X } from 'lucide-react'; 

// Función de utilidad para generar IDs únicos
const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

// Datos de posts de demostración
const dummyPosts = [
    {
        id: generateUniqueId(),
        text: "¡Gran partido hoy en el 'Estadio App'! La hinchada está encendida y el ambiente es increíble. ¡Vamos UCV, por la victoria! #FuerzaPoetas #UCV",
        imageUrl: "https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=UCV+en+Accion", 
        username: "HinchaCesarVallejo",
        initial: "H",
        userId: "demo_user_001",
        time: "Hace 10 min",
        likes: 15,
        comments: 3,
        isLiked: false,
        commentsList: [
            { id: generateUniqueId(), author: "Fanatico_1", text: "¡Así se juega, muchachos!" },
            { id: generateUniqueId(), author: "DePaseoUY", text: "El mejor ambiente en el estadio." },
            { id: generateUniqueId(), author: "Canchero_SV", text: "Hoy ganamos sí o sí." },
        ]
    },
    {
        id: generateUniqueId(),
        text: "Esperando la alineación oficial. ¿Quién creen que será el crack del partido? ¡Mis fichas a #YorleysMenas! ⚽",
        imageUrl: "", 
        username: "GolazoVallejiano",
        initial: "G",
        userId: "demo_user_002",
        time: "Hace 25 min",
        likes: 8,
        comments: 1,
        isLiked: false,
        commentsList: [
            { id: generateUniqueId(), author: "LaVallejo", text: "Hoy es el día de #RazielGarcia 💪" },
        ]
    },
    {
        id: generateUniqueId(),
        text: "¡La previa del partido está con todo! 🎉 Vamos por esos 3 puntos. 🏆",
        imageUrl: "https://via.placeholder.com/600x400/1D4ED8/FFFFFF?text=Previa+Estadio",
        username: "TribunaNorteUCV",
        initial: "T",
        userId: "demo_user_003",
        time: "Hace 45 min",
        likes: 20,
        comments: 5,
        isLiked: false,
        commentsList: [
            { id: generateUniqueId(), author: "HinchadaActiva", text: "¡Qué emoción! 🥳" },
            { id: generateUniqueId(), author: "SiempreUCV", text: "Vamos Poetas!" },
        ]
    }
];

function Multimedia() {
    const [posts, setPosts] = useState(dummyPosts);
    const [newPostText, setNewPostText] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(''); 

    const [user, setUser] = useState({ uid: 'current_user_demo' }); 
    const [isPosting, setIsPosting] = useState(false); 
    const [loadingInitial, setLoadingInitial] = useState(true); 
    const [successMessage, setSuccessMessage] = useState('');

    const fileInputRef = useRef(null); 

    useEffect(() => {
        // Simulación de carga inicial
        const timer = setTimeout(() => {
            setLoadingInitial(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, []); 

    const createPost = () => {
        if (!newPostText.trim() || !user || isPosting) return;

        setIsPosting(true); 
        setSuccessMessage('Publicando...'); 

        setTimeout(() => {
            const newPost = {
                id: generateUniqueId(),
                text: newPostText,
                // Si hay imagen seleccionada, usamos una URL de placeholder, si no, vacío.
                imageUrl: newPostImage ? "https://via.placeholder.com/600x400/4B5563/FFFFFF?text=Imagen+Local" : '', 
                username: 'MiUsuarioDemo', 
                initial: 'M', 
                userId: user.uid, 
                time: "Ahora",
                likes: 0,
                comments: 0,
                isLiked: false,
                commentsList: [],
            };

            setPosts(prevPosts => [newPost, ...prevPosts]);
            
            setNewPostText('');
            setNewPostImage(null); 
            setImagePreviewUrl(''); 
            setSuccessMessage('¡Publicación creada con éxito! 🎉');

            setIsPosting(false); 
        }, 1500); 
    };

    const deletePost = (id) => {
        if (!user) return; 
        
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        setSuccessMessage('Publicación eliminada.');
    };
    
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setNewPostImage(file);
            setImagePreviewUrl(URL.createObjectURL(file)); 
            setSuccessMessage('');
        }
    };

    const removeImage = () => {
        setNewPostImage(null);
        setImagePreviewUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };
    
    const toggleLike = (id) => {
        setPosts(posts.map(post => 
            post.id === id ? { ...post, 
                likes: post.likes + (post.isLiked ? -1 : 1), 
                isLiked: !post.isLiked 
            } : post
        ));
    };

    const addComment = (postId, commentText) => {
        if (!commentText.trim()) return;
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComment = { 
                    id: generateUniqueId(), 
                    author: "MiUsuarioDemo", 
                    text: commentText 
                };
                return { 
                    ...post, 
                    commentsList: [...(post.commentsList || []), newComment],
                    comments: (post.comments || 0) + 1
                };
            }
            return post;
        }));
    };

    const activePost = posts.find(post => post.userId === user?.uid);

    if (loadingInitial) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <Loader2 className="animate-spin text-blue-400" size={32} />
                <p className="ml-2 text-blue-400">Iniciando Comunidad (Demo)...</p>
            </div>
        );
    }

    return (
        // Se eliminan todas las clases de formato (bg-gray-900, min-h-screen, max-w-xl, mx-auto)
        // Solo dejamos el padding, que es el estilo interno de la página.
        <div className="p-4"> 
            <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
                COMUNIDAD FUTBOLERA
            </h1>

            {/* Sección para crear post */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-8 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-3">Publicar algo...</h2>
                
                {activePost ? ( 
                    <div className="p-4 bg-blue-800/50 text-white rounded-lg mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <p className='text-sm mb-2 sm:mb-0'>
                            ℹ️ Ya tienes una publicación activa. Elimínala si deseas crear una nueva.
                        </p>
                        <button 
                            onClick={() => deletePost(activePost.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-700 transition self-end sm:self-center"
                            title="Eliminar publicación"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ) : ( 
                    <>
                        <textarea
                            value={newPostText}
                            onChange={(e) => {
                                setNewPostText(e.target.value);
                                setSuccessMessage('');
                            }}
                            placeholder="¿Qué pasa en el estadio? Máx 200 caracteres..."
                            maxLength="200"
                            rows="3"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        ></textarea>

                        {/* Previsualización de imagen */}
                        {imagePreviewUrl && (
                            <div className="relative mt-3 mb-3 w-32 h-32 rounded-lg overflow-hidden border border-gray-600">
                                <img src={imagePreviewUrl} alt="Previsualización" className="w-full h-full object-cover" />
                                <button 
                                    onClick={removeImage}
                                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                                    title="Quitar imagen"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-3">
                            {/* Botón para adjuntar archivo (Simulación) */}
                            <label className="flex items-center text-sm font-medium text-gray-400 hover:text-blue-400 cursor-pointer transition">
                                <Upload size={18} className="mr-2" />
                                <span className='truncate max-w-xs'>
                                    {newPostImage ? newPostImage.name : 'Adjuntar Archivo (Opcional)'}
                                </span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                    ref={fileInputRef} 
                                />
                            </label>

                            {/* Botón Publicar */}
                            <button
                                onClick={createPost}
                                disabled={!newPostText.trim() || isPosting}
                                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition ${
                                    (newPostText.trim() && !isPosting)
                                        ? 'bg-green-600 hover:bg-green-500 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isPosting ? (
                                    <Loader2 size={20} className="mr-2 animate-spin" />
                                ) : (
                                    <Send size={20} className="mr-2" />
                                )}
                                {isPosting ? 'Publicando...' : 'Publicar'}
                            </button>
                        </div>
                    </>
                )}
                
                {/* Mensaje de simulación */}
                {successMessage && (
                    <p className="mt-3 text-sm font-semibold text-green-400 text-center">{successMessage}</p>
                )}
            </div>

            {/* Lista de Publicaciones */}
            <h2 className="text-xl font-bold text-gray-300 mb-4 border-b border-gray-700 pb-2">
                Últimas Publicaciones
            </h2>
            
            <div className="space-y-4 pb-20">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <CardPost
                            key={post.id}
                            post={{ 
                                id: post.id,
                                initial: post.initial,
                                username: post.username,
                                time: post.time,
                                text: post.text,
                                imageUrl: post.imageUrl,
                                likes: post.likes || 0,
                                comments: post.comments || 0,
                                isMyPost: post.userId === user.uid,
                                commentsList: post.commentsList || [], 
                            }}
                            onDelete={post.userId === user.uid ? () => deletePost(post.id) : undefined}
                            onLike={() => toggleLike(post.id)}
                            onAddComment={(commentText) => addComment(post.id, commentText)} 
                            onShare={() => alert('Simulación: Opción de compartir para ' + post.username)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-10">No hay publicaciones aún. ¡Sé el primero!</p>
                )}
            </div>
        </div>
    );
}

export default Multimedia;