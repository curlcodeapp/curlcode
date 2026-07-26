-- M4: user overrides on recommendations (SDS §19 "keep a poorly rated product" /
-- "reject a recommendation"). Overrides record the user's decision without changing
-- the deterministic evaluation classification itself (SDS §27 acceptance criteria).

create table overrides (
  id uuid primary key default gen_random_uuid(),
  routine_step_id uuid not null references routine_steps (id) on delete cascade,
  product_id text,
  system_decision text not null check (system_decision in ('replace_product', 'add_step')),
  user_decision text not null check (user_decision in ('retain_product', 'dismissed')),
  override_reason text,
  created_at timestamptz not null default now()
);

alter table overrides enable row level security;

create policy "overrides_select_own" on overrides
  for select using (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = overrides.routine_step_id and routines.user_id = auth.uid()
    )
  );
create policy "overrides_insert_own" on overrides
  for insert with check (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = overrides.routine_step_id and routines.user_id = auth.uid()
    )
  );
create policy "overrides_delete_own" on overrides
  for delete using (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = overrides.routine_step_id and routines.user_id = auth.uid()
    )
  );

grant select, insert, delete on overrides to authenticated;
