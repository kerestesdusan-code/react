CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "user" (
  id uuid CONSTRAINT users_pkey PRIMARY KEY DEFAULT gen_random_uuid(),
  email text CONSTRAINT users_email_key UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text,
  is_verified boolean NOT NULL DEFAULT false,
  email_verification_token_hash text,
  email_verification_expires_at timestamptz,
  avatar_url text
);

CREATE TABLE IF NOT EXISTS "group" (
  id uuid CONSTRAINT user_groups_pkey PRIMARY KEY DEFAULT gen_random_uuid(),
  name text CONSTRAINT user_groups_name_key UNIQUE NOT NULL,
  owner_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_groups_owner_id_fkey
    FOREIGN KEY (owner_id)
    REFERENCES "user"(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS user_has_group (
  user_id uuid NOT NULL,
  group_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_has_group_pkey PRIMARY KEY (user_id, group_id),
  CONSTRAINT user_has_group_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES "user"(id)
    ON DELETE CASCADE,
  CONSTRAINT user_has_group_group_id_fkey
    FOREIGN KEY (group_id)
    REFERENCES "group"(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_groups_owner_id
  ON "group" (owner_id);

CREATE INDEX IF NOT EXISTS idx_user_has_group_group_id
  ON user_has_group (group_id);
