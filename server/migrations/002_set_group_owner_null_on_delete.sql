ALTER TABLE "group"
DROP CONSTRAINT user_groups_owner_id_fkey;

ALTER TABLE "group"
ADD CONSTRAINT user_groups_owner_id_fkey
FOREIGN KEY (owner_id)
REFERENCES "user"(id)
ON DELETE SET NULL;
