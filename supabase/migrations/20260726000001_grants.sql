-- RLS policies only restrict rows for a role that already has table-level privileges.
-- The initial migration defined policies but never granted the privileges themselves.
grant select, insert, update, delete on hair_profiles to authenticated;
grant select, insert, update, delete on routines to authenticated;
grant select, insert, update, delete on routine_steps to authenticated;
grant select, insert, update, delete on routine_step_products to authenticated;
