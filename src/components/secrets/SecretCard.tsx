"use client";

import { Secret, SecretType } from "@/types";

type Props = {
  secret: Secret;
  onEdit: (secret: Secret) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
};

const typeBadge: Record<SecretType, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  medio: { label: "Medio", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  hard: { label: "Hard", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function SecretCard({ secret, onEdit, onDelete, onToggleFavorite }: Props) {
  const badge = typeBadge[secret.type];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-purple-500/50 transition">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold text-lg leading-tight">{secret.title}</h3>
        <button
          onClick={() => onToggleFavorite(secret.id, secret.favorite)}
          className="text-xl shrink-0 hover:scale-110 transition-transform"
        >
          {secret.favorite ? "⭐" : "☆"}
        </button>
      </div>

      {/* Secret */}
      <p className="text-slate-400 text-sm line-clamp-3">{secret.secret}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${badge.className}`}>
            {badge.label}
          </span>
          <span className="text-slate-500 text-xs">
            {new Date(secret.createdAt).toLocaleDateString("es-ES")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(secret)}
            className="text-xs bg-slate-700 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg transition"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(secret.id)}
            className="text-xs bg-slate-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}