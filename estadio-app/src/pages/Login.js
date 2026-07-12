import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTACIÓN DE IMÁGENES (Ajustadas a tu árbol actual)
import tribunaLogo from "../pages/Tribuna360-logo.jpeg";
import ucvLogo from "./logo_ucv-removebg-preview.png";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 🔄 Estado para controlar qué vista mostrar: "login", "register" o "forgot"
  const [view, setView] = useState("login");

  // Estados para los nuevos formularios
  const [regUser, setRegUser] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      localStorage.setItem("isLoggedIn", "true");
    }
    navigate("/");
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    alert(`🎉 ¡Registro exitoso para ${regUser}! Ya puedes iniciar sesión.`);
    setView("login"); // Regresa al login tras registrarse
  };

  const handleSubmitForgot = (e) => {
    e.preventDefault();
    alert(`📩 Enlace enviado a: ${forgotEmail}. Revisa tu bandeja de entrada.`);
    setView("login"); // Regresa al login tras enviar correo
  };

  return (
    <div className="bg-[#0f172a] text-white flex flex-col justify-center items-center px-6 h-full w-full overflow-hidden">
      <div className="w-full max-w-sm flex flex-col items-center mt-2">
        
        {/* ── Logo Principal ── */}
        <div className="w-36 h-36 mb-2 flex items-center justify-center">
          <img 
            src={tribunaLogo} 
            alt="Tribuna 360 Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          />
        </div>

        {/* ── VISTA 1: INICIAR SESIÓN ── */}
        {view === "login" && (
          <>
            
            <p className="text-center text-gray-400 text-xs px-4 leading-relaxed mb-5">
              La primera plataforma inteligente que une accesibilidad, pasión e interacción en tiempo real para el hincha
            </p>

            <form onSubmit={handleSubmitLogin} className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Usuario o correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
              />
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setView("forgot")}
                  className="text-xs text-blue-400 font-semibold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Iniciar sesión
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-6 font-medium">
              ¿No tienes una cuenta?{" "}
              <button 
                type="button" 
                onClick={() => setView("register")}
                className="text-blue-400 font-bold hover:underline"
              >
                Regístrate
              </button>
            </p>
          </>
        )}

        {/* ── VISTA 2: FORMULARIO DE REGISTRO ── */}
        {view === "register" && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-xl font-bold text-center mb-1">Crear Cuenta Hincha</h2>
            <p className="text-center text-gray-400 text-xs mb-5">Únete a la experiencia Tribuna 360</p>
            
            <form onSubmit={handleSubmitRegister} className="w-full flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre de usuario completo"
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
              />
              <input
                type="password"
                placeholder="Contraseña de seguridad"
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-green-500/10"
              >
                Registrarme
              </button>
              <button 
                type="button" 
                onClick={() => setView("login")}
                className="text-xs text-gray-400 font-semibold hover:underline mt-2 text-center"
              >
                Volver al Inicio de Sesión
              </button>
            </form>
          </div>
        )}

        {/* ── VISTA 3: RECUPERAR CONTRASEÑA ── */}
        {view === "forgot" && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-xl font-bold text-center mb-1">Recuperar Contraseña</h2>
            <p className="text-center text-gray-400 text-xs mb-5">Ingresa tu correo para restaurar tus accesos</p>
            
            <form onSubmit={handleSubmitForgot} className="w-full flex flex-col gap-4">
              <input
                type="email"
                placeholder="Correo electrónico registrado"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="w-full bg-[#1e293b]/60 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3.5 text-sm text-white outline-none"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg"
              >
                Enviar Enlace de Recuperación
              </button>
              <button 
                type="button" 
                onClick={() => setView("login")}
                className="text-xs text-gray-400 font-semibold hover:underline mt-1 text-center"
              >
                Volver al Inicio de Sesión
              </button>
            </form>
          </div>
        )}

        {/* ── Logo Institucional UCV ── */}
        <div className="mt-6 w-12 h-12 opacity-80 flex items-center justify-center">
          <img 
            src={ucvLogo} 
            alt="Logo Institucional" 
            className="w-full h-full object-contain filter brightness-110"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;