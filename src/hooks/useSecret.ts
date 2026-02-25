import { useCallback } from "react";
import { useSecretsStore } from "@/store/useSecretsStore";
import {
  CreateSecretSchema,
  UpdateSecretSchema,
} from "@/lib/validations/secret";
import { toast } from "react-toastify";

export function useSecrets() {
  const {
    secrets,
    filters,
    pagination,
    isLoading,
    setSecrets,
    setPagination,
    setIsLoading,
    setPage,
  } = useSecretsStore();

  const fetchSecrets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: filters.search,
        type: filters.type,
        orderBy: filters.orderBy,
        order: filters.order,
        page: pagination.page.toString(),
        perPage: pagination.perPage.toString(),
        ...(filters.favorite !== null && {
          favorite: String(filters.favorite),
        }),
      });

      const res = await fetch(`/api/secrets?${params}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      setSecrets(json.data);
      setPagination(json.meta);
    } catch {
      toast.error("Error al cargar los secretos");
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.perPage, setSecrets, setPagination, setIsLoading]);

  const createSecret = async (data: CreateSecretSchema) => {
    try {
      const res = await fetch("/api/secrets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      toast.success("¡Secreto creado! 🎉");
      await fetchSecrets();
      return true;
    } catch {
      toast.error("Error al crear el secreto");
      return false;
    }
  };

  const updateSecret = async (data: UpdateSecretSchema) => {
    try {
      const res = await fetch(`/api/secrets/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      toast.success("¡Secreto actualizado! ✅");
      await fetchSecrets();
      return true;
    } catch {
      toast.error("Error al crear el secreto");
      return false;
    }
  };

  const deleteSecret = async (id: string) => {
    try {
      const res = await fetch(`/api/secrets/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      toast.success("Secreto eliminado 🗑️");
      await fetchSecrets();
      return true;
    } catch {
      toast.error("Error al crear el secreto");
      return false;
    }
  };

  const toggleFavorite = async (id: string, favorite: boolean) => {
    try {
      const res = await fetch(`/api/secrets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !favorite }),
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.error);

      await fetchSecrets();
      return true;
    } catch {
      toast.error("Error al crear el secreto");
      return false;
    }
  };

  return {
    secrets,
    filters,
    pagination,
    isLoading,
    fetchSecrets,
    createSecret,
    updateSecret,
    deleteSecret,
    toggleFavorite,
    setPage,
  };
}
