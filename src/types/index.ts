import { SecretType } from "@/generated/prisma";

// ===========================
// USER TYPES
// ===========================

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// ===========================
// SECRET TYPES
// ===========================

export { SecretType };

export type Secret = {
  id: string;
  title: string;
  secret: string;
  type: SecretType;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type SecretWithUser = Secret & {
  user: Pick<User, "id" | "name" | "email" | "image">;
};

// ===========================
// FORM TYPES
// ===========================

export type CreateSecretInput = Pick<Secret, "title" | "secret" | "type" | "favorite">;

export type UpdateSecretInput = Partial<CreateSecretInput> & {
  id: string;
};

// ===========================
// FILTER & PAGINATION TYPES
// ===========================

export type SecretFilters = {
  search: string;
  type: SecretType | "all";
  favorite: boolean | null;
  orderBy: "createdAt" | "updatedAt" | "title";
  order: "asc" | "desc";
};

export type PaginationMeta = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type PaginatedSecrets = {
  data: Secret[];
  meta: PaginationMeta;
};

// ===========================
// API RESPONSE TYPES
// ===========================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};