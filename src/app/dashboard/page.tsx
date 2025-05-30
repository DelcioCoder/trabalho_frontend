"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Filter, RefreshCw, AlertCircle, Download } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("barras");
  const [filterValue, setFilterValue] = useState("");

  // Cores para o gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    fetchCasos();
  }, []);

  async function fetchCasos() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:8000/api/casos-por-localidade/");
      if (!res.ok) throw new Error("Falha ao carregar dados de casos");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  // Formatar os dados para melhor visualização
  const totalCasos = data.reduce((total, item) => total + item.casos, 0);
  
  // Filtrar dados
  const filteredData = data.filter(item => 
    item.localidade.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dashboard de Monitoramento
          </h1>
          <p className="text-gray-600 text-lg">
            Acompanhamento de casos de paludismo por localidade
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 font-medium">Total de Casos</h3>
            <p className="text-3xl font-bold">{totalCasos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 font-medium">Localidades Monitoradas</h3>
            <p className="text-3xl font-bold">{data.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 font-medium">Média por Localidade</h3>
            <p className="text-3xl font-bold">{data.length ? Math.round(totalCasos / data.length) : 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 font-medium">Localidade com Maior Incidência</h3>
            <p className="text-3xl font-bold">{data.length ? data.reduce((max, item) => max.casos > item.casos ? max : item, {localidade: "-", casos: 0}).localidade : "-"}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Distribuição de Casos por Localidade
            </h2>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 bg-gray-100">
                  <Filter className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Filtrar localidades..."
                  className="p-2 focus:outline-none"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  onClick={() => setViewMode("barras")}
                  className={`px-4 py-2 rounded-l-md border ${viewMode === "barras" ? "bg-green-600 text-white" : "bg-gray-100"}`}
                >
                  Barras
                </button>
                <button
                  onClick={() => setViewMode("pizza")}
                  className={`px-4 py-2 rounded-r-md border ${viewMode === "pizza" ? "bg-green-600 text-white" : "bg-gray-100"}`}
                >
                  Pizza
                </button>
              </div>
              <button
                onClick={fetchCasos}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200 hover:bg-blue-100"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Download className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum dado encontrado para o filtro aplicado.</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              {viewMode === "barras" ? (
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="localidade" 
                      angle={-45} 
                      textAnchor="end"
                      height={70}
                      tick={{fontSize: 12}}
                    />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="casos" 
                      name="Casos de Paludismo" 
                      fill="#10b981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={500}>
                  <PieChart>
                    <Pie
                      data={filteredData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={180}
                      fill="#8884d8"
                      dataKey="casos"
                      nameKey="localidade"
                      label={({localidade, casos}) => `${localidade}: ${casos}`}
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${value} casos`, props.payload.localidade]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Dados Detalhados
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left font-semibold">Localidade</th>
                  <th className="py-3 px-4 text-left font-semibold">Casos Registrados</th>
                  <th className="py-3 px-4 text-left font-semibold">% do Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.localidade}</td>
                    <td className="py-3 px-4">{item.casos}</td>
                    <td className="py-3 px-4">
                      {totalCasos > 0 ? ((item.casos / totalCasos) * 100).toFixed(1) : 0}%
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${totalCasos > 0 ? (item.casos / totalCasos) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-500 py-6">
        <p>© 2025 Sistema de Monitoramento de Paludismo</p>
      </footer>
    </main>
  );
}