"use client";

import { useEffect, useState } from "react";
import { useSecrets } from "@/hooks/useSecret";
import { useSecretsStore } from "@/store/useSecretsStore";
import SecretCard from "@/components/secrets/SecretCard";
import SecretForm from "@/components/secrets/SecretForm";
import SecretFilters from "@/components/secrets/SecretFilter";
import { Secret } from "@/types";
import { CreateSecretSchema } from "@/lib/validations/secret";

export default function SecretsPage() {
  const { secrets, pagination, isLoading, fetchSecrets, createSecret, updateSecret, deleteSecret, toggleFavorite, setPage } = useSecrets();
  const { filters } = useSecretsStore();

  const [showForm, setShowForm] = useState(false);
  const [editingSecret, setEditingSecret] = useState<Secret | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch cuando cambian filtros o página
  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  const handleCreate = async (data: CreateSecretSchema) => {
    setFormLoading(true);
    const ok = await createSecret(data);
    setFormLoading(false);
    if (ok) setShowForm(false);
  };

  const handleUpdate = async (data: CreateSecretSchema) => {
    if (!editingSecret) return;
    setFormLoading(true);
    const ok = await updateSecret({ ...data, id: editingSecret.id });
    setFormLoading(false);
    if (ok) setEditingSecret(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este secreto?")) return;
    await deleteSecret(id);
  };

  const handleEdit = (secret: Secret) => {
    setEditingSecret(secret);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSecret(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mis Secretos 🔐</h1>
          <p className="text-slate-400 text-sm mt-1">{pagination.total} secretos en total</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingSecret(null); }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-xl transition"
        >
          + Nuevo
        </button>
      </div>

      {/* Formulario crear */}
      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">Nuevo secreto</h2>
          <SecretForm
            onSubmit={handleCreate}
            onCancel={handleCancelForm}
            isLoading={formLoading}
          />
        </div>
      )}

      {/* Formulario editar */}
      {editingSecret && (
        <div className="bg-slate-800 border border-purple-500/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">Editando: {editingSecret.title}</h2>
          <SecretForm
            onSubmit={handleUpdate}
            onCancel={handleCancelForm}
            defaultValues={editingSecret}
            isLoading={formLoading}
          />
        </div>
      )}

      {/* Filtros */}
      <SecretFilters />

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && secrets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <span className="text-6xl">🤫</span>
          <h3 className="text-white font-semibold text-xl">No hay secretos aquí</h3>
          <p className="text-slate-400">
            {filters.search || filters.type !== "all" || filters.favorite !== null
              ? "No encontramos secretos con esos filtros"
              : "¡Crea tu primer secreto!"}
          </p>
        </div>
      )}

      {/* Grid de secretos */}
      {!isLoading && secrets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secrets.map((secret) => (
            <SecretCard
              key={secret.id}
              secret={secret}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Paginación */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition"
          >
            ← Anterior
          </button>
          <span className="text-slate-400 text-sm">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}