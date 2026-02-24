"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSecretSchema, CreateSecretSchema } from "@/lib/validations/secret";
import { Secret } from "@/types";
import { SecretType } from "@/generated/prisma";

type Props = {
  onSubmit: (data: CreateSecretSchema) => Promise<void | boolean>;
  onCancel: () => void;
  defaultValues?: Secret;
  isLoading?: boolean;
};
export default function SecretForm({ onSubmit, onCancel, defaultValues, isLoading }: Props) {
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: zodResolver(createSecretSchema),
  defaultValues: {
    title: "",
    secret: "",
    type: SecretType.normal,
    favorite: false as boolean,
  },
});

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        secret: defaultValues.secret,
        type: defaultValues.type,
        favorite: defaultValues.favorite,
      });
    }
  }, [defaultValues, reset]);

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Título</label>
        <input
          {...register("title")}
          placeholder="Nombre del secreto"
          className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Secreto */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Secreto</label>
        <textarea
          {...register("secret")}
          placeholder="Escribe tu secreto aquí..."
          rows={4}
          className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
        />
        {errors.secret && <p className="text-red-400 text-sm mt-1">{errors.secret.message}</p>}
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Tipo</label>
        <select
          {...register("type")}
          className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value={SecretType.normal}>Normal</option>
          <option value={SecretType.medio}>Medio</option>
          <option value={SecretType.hard}>Hard 🔥</option>
        </select>
        {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
      </div>

      {/* Favorito */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          {...register("favorite")}
          type="checkbox"
          className="w-4 h-4 accent-purple-500"
        />
        <span className="text-slate-300 text-sm">Marcar como favorito ⭐</span>
      </label>

      {/* Botones */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : defaultValues ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}