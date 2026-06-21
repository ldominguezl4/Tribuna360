// src/components/CardPost.js (Versión Final de DEMO con Comentarios)
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Trash2, Send, Loader2 } from 'lucide-react';

function CardPost({ post, onDelete, onLike, onAddComment, onShare }) {
    const [showComments, setShowComments] = useState(false); 
    const [newCommentText, setNewCommentText] = useState(''); 
    const [isCommenting, setIsCommenting] = useState(false); 

    const handleCommentSubmit = () => {
        if (!newCommentText.trim() || isCommenting) return;

        setIsCommenting(true);
        // Simulación de envío
        setTimeout(() => {
            onAddComment(newCommentText); 
            setNewCommentText('');
            setIsCommenting(false);
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    {post.initial}
                </div>
                <div>
                    <p className="font-semibold text-white">{post.username}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                </div>
                {post.isMyPost && onDelete && (
                    <button 
                        onClick={onDelete} 
                        className="ml-auto text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-700 transition"
                        title="Eliminar esta publicación"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <p className="text-gray-300 mb-3">{post.text}</p>

            {post.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden">
                    <img src={post.imageUrl} alt="Publicación" className="w-full h-auto object-cover" />
                </div>
            )}

            <div className="flex items-center text-gray-400 text-sm mb-3">
                <button 
                    onClick={onLike}
                    className={`flex items-center mr-4 p-1 rounded-md hover:bg-gray-700 transition ${post.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                >
                    <Heart size={18} className="mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                </button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center mr-4 p-1 rounded-md hover:bg-gray-700 transition"
                >
                    <MessageCircle size={18} className="mr-1" />
                    <span>{post.comments}</span>
                </button>
                <button 
                    onClick={onShare}
                    className="flex items-center p-1 rounded-md hover:bg-gray-700 transition"
                >
                    <Share2 size={18} className="mr-1" />
                    <span>Compartir</span>
                </button>
            </div>

            {/* Sección de Comentarios */}
            {showComments && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                    <h3 className="text-md font-semibold text-gray-300 mb-3">Comentarios</h3>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {(post.commentsList && post.commentsList.length > 0) ? (
                            post.commentsList.map(comment => (
                                <div key={comment.id} className="bg-gray-700 p-2 rounded-lg text-sm">
                                    <p className="font-bold text-blue-300">{comment.author}</p>
                                    <p className="text-gray-200">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center">Sé el primero en comentar.</p>
                        )}
                    </div>
                    
                    {/* Caja para escribir nuevo comentario */}
                    <div className="flex items-center mt-3">
                        <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe un comentario..."
                            rows="1"
                            className="flex-grow p-2 bg-gray-700 text-white rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none overflow-hidden"
                            style={{minHeight: '40px', maxHeight: '100px'}} 
                        ></textarea>
                        <button
                            onClick={handleCommentSubmit}
                            disabled={!newCommentText.trim() || isCommenting}
                            className={`ml-2 p-2 rounded-full transition ${
                                (newCommentText.trim() && !isCommenting)
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isCommenting ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <Send size={20} />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardPost;