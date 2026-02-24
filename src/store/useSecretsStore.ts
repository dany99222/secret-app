import { create } from "zustand";
import { SecretType } from "@/generated/prisma";
import { SecretFilters, PaginationMeta, Secret } from "@/types";

type SecretsStore = {
  // Estado
  secrets: Secret[];
  filters: SecretFilters;
  pagination: PaginationMeta;
  isLoading: boolean;

  // Acciones de filtros
  setSearch: (search: string) => void;
  setType: (type: SecretType | "all") => void;
  setFavorite: (favorite: boolean | null) => void;
  setOrderBy: (orderBy: SecretFilters["orderBy"]) => void;
  setOrder: (order: "asc" | "desc") => void;
  resetFilters: () => void;

  // Acciones de paginación
  setPage: (page: number) => void;

  // Acciones de secretos
  setSecrets: (secrets: Secret[]) => void;
  setPagination: (pagination: PaginationMeta) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const defaultFilters: SecretFilters = {
  search: "",
  type: "all",
  favorite: null,
  orderBy: "createdAt",
  order: "desc",
};

const defaultPagination: PaginationMeta = {
  total: 0,
  page: 1,
  perPage: 6,
  totalPages: 0,
};

export const useSecretsStore = create<SecretsStore>((set) => ({
  // Estado inicial
  secrets: [],
  filters: defaultFilters,
  pagination: defaultPagination,
  isLoading: false,

  // Acciones de filtros
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
      pagination: { ...state.pagination, page: 1 }, // reset página al buscar
    })),

  setType: (type) =>
    set((state) => ({
      filters: { ...state.filters, type },
      pagination: { ...state.pagination, page: 1 },
    })),

  setFavorite: (favorite) =>
    set((state) => ({
      filters: { ...state.filters, favorite },
      pagination: { ...state.pagination, page: 1 },
    })),

  setOrderBy: (orderBy) =>
    set((state) => ({
      filters: { ...state.filters, orderBy },
    })),

  setOrder: (order) =>
    set((state) => ({
      filters: { ...state.filters, order },
    })),

  resetFilters: () =>
    set({ filters: defaultFilters, pagination: defaultPagination }),

  // Acciones de paginación
  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  // Acciones de secretos
  setSecrets: (secrets) => set({ secrets }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));