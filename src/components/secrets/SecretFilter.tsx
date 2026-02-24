"use client";

import { useSecretsStore } from "@/store/useSecretsStore";
import { SecretType } from "@/generated/prisma";

export default function SecretFilters() {
  const { filters, setSearch, setType, setFavorite, setOrderBy, setOrder, resetFilters } =
    useSecretsStore();

  return (
    <div className="flex flex-col gap-3">
      {/* Búsqueda */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Buscar secretos..."
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />

      <div className="flex flex-wrap gap-2">
        {/* Filtro por tipo */}
        <select
          value={filters.type}
          onChange={(e) => setType(e.target.value as SecretType | "all")}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="all">Todos los tipos</option>
          <option value={SecretType.normal}>Normal</option>
          <option value={SecretType.medio}>Medio</option>
          <option value={SecretType.hard}>Hard 🔥</option>
        </select>

        {/* Filtro favoritos */}
        <select
          value={filters.favorite === null ? "" : String(filters.favorite)}
          onChange={(e) =>
            setFavorite(e.target.value === "" ? null : e.target.value === "true")
          }
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="">Todos</option>
          <option value="true">⭐ Favoritos</option>
          <option value="false">Sin favorito</option>
        </select>

        {/* Ordenar por */}
        <select
          value={filters.orderBy}
          onChange={(e) => setOrderBy(e.target.value as typeof filters.orderBy)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="createdAt">Fecha creación</option>
          <option value="updatedAt">Fecha actualización</option>
          <option value="title">Título</option>
        </select>

        {/* Orden */}
        <select
          value={filters.order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguos</option>
        </select>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm px-3 py-2 rounded-xl transition"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}