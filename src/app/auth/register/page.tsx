
'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"

// Schema de validação com Zod
const registerSchema = z.object({
    username: z
        .string()
        .min(1, "Username é obrigatório")
        .min(3, "Username deve ter pelo menos 3 caracteres")
        .max(150, "Username deve ter no máximo 150 caracteres")
        .regex(/^[\w.@+-]+$/, "Username pode conter apenas letras, números e os caracteres @/./+/-/_"),
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido")
        .regex(
            /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/,
            "Somente e-mails dos domínios 'gmail.com' ou 'yahoo.com' são permitidos"
        ),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .regex(/^(?=.*[a-z])/, "Senha deve conter pelo menos uma letra minúscula")
        .regex(/^(?=.*[A-Z])/, "Senha deve conter pelo menos uma letra maiúscula")
        .regex(/^(?=.*\d)/, "Senha deve conter pelo menos um número"),
    password2: z
        .string()
        .min(1, "Confirmação de senha é obrigatória")
}).refine((data) => data.password === data.password2, {
    message: "As senhas não coincidem",
    path: ["password2"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        password2: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleInputChange = (field: keyof RegisterFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Limpar erro específico do campo quando o usuário começar a digitar
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        try {
            registerSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                    password2: formData.password2
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Tratar erros específicos do backend
                if (data.username) {
                    setErrors(prev => ({ ...prev, username: Array.isArray(data.username) ? data.username[0] : data.username }));
                }
                if (data.email) {
                    setErrors(prev => ({ ...prev, email: Array.isArray(data.email) ? data.email[0] : data.email }));
                }
                if (data.password) {
                    setErrors(prev => ({ ...prev, password: Array.isArray(data.password) ? data.password[0] : data.password }));
                }
                if (data.non_field_errors) {
                    setErrors(prev => ({ ...prev, general: Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors }));
                }
                
                // Se não há erros específicos, mostrar mensagem geral
                if (!data.username && !data.email && !data.password && !data.non_field_errors) {
                    setErrors({ general: data.message || 'Erro ao criar conta' });
                }
                return;
            }

            setSuccess("Conta criada com sucesso! Redirecionando...");
            
            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err: any) {
            setErrors({ general: 'Erro de conexão. Tente novamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Criar Conta
            </h2>
            <p className="text-gray-600 text-center mb-8">
                Junte-se a nós hoje mesmo
            </p>

            {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {errors.general}
                    </div>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-r-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {success}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.username 
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                        }`}
                        placeholder="Escolha um username único"
                    />
                    {errors.username && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.username}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.email 
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                        }`}
                        placeholder="seu@gmail.com ou seu@yahoo.com"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.password 
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                        }`}
                        placeholder="Mínimo 8 caracteres, com maiúscula, minúscula e número"
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password2">
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={(e) => handleInputChange('password2', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.password2 
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                        }`}
                        placeholder="Digite a senha novamente"
                    />
                    {errors.password2 && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.password2}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl mb-6"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Criando conta...
                        </div>
                    ) : 'Criar Conta'}
                </button>
            </form>

            <div className="text-center">
                <p className="text-gray-600">
                    Já tem uma conta?{' '}
                    <Link 
                        href="/login" 
                        className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                    >
                        Faça login
                    </Link>
                </p>
            </div>
        </>
    );
}