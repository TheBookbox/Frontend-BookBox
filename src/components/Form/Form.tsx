"use client"

import Link from "next/link"
import { Input } from "../Input/Input"
import Image from "next/image"
import type { RootState } from "../../../store"
import { useSelector } from "react-redux"
import { Alert } from "../Alert"
import { type FormEvent, useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"

interface FormProps {
  mode: "login" | "register"
  action: (data: any) => void
}

export function Form(props: FormProps) {
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    props.action(e)
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-azul-medio font-serifDisplay">
              {props.mode === "register" ? (
                <>
                  Crie sua conta<span className="text-azul-primario">.</span>
                </>
              ) : (
                <>
                  Bem-vindo de volta<span className="text-azul-primario">.</span>
                </>
              )}
            </h1>
            <p className="text-gray-600 mt-2">
              {props.mode === "register"
                ? "Junte-se à nossa comunidade de leitores"
                : "Faça login para continuar sua jornada literária"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field - only for register */}
            {props.mode === "register" && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    autoFocus
                    className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azul-medio focus:border-azul-medio"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  autoFocus={props.mode === "login"}
                  className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azul-medio focus:border-azul-medio"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Sua senha"
                  className="pl-10 pr-10 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azul-medio focus:border-azul-medio"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {props.mode === "login" && (
                <div className="text-right">
                  <Link
                    href="/resetPassword"
                    className="text-sm text-azul-medio hover:text-azul-escuro transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-azul-medio text-white font-medium hover:bg-azul-escuro focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Processando...</span>
                </div>
              ) : props.mode === "register" ? (
                "Criar conta"
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-4">
              <Alert msg={error} type="alert-error" />
            </div>
          )}

          {/* Alternative action */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {props.mode === "register" ? (
                <>
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-azul-medio font-medium hover:underline">
                    Faça login
                  </Link>
                </>
              ) : (
                <>
                  Não tem uma conta?{" "}
                  <Link href="/register" className="text-azul-medio font-medium hover:underline">
                    Registre-se
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="bg-gray-50 p-6 flex justify-center">
          <Image
            src="/imgs/illustrations/undraw_access.svg"
            width={200}
            height={200}
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}

