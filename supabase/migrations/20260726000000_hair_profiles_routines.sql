-- M2: per-user HairProfile and Routine domain (SDS §5, §10, §11, §12, §13).
-- Product catalog stays mock-data for now (SDS §32 catalog coverage is an open input),
-- so routine_step_products.product_id is a plain text reference, not a foreign key.

create table hair_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  curl_pattern text not null,
  density text not null,
  porosity text not null,
  thickness text not null,
  scalp_type text not null,
  goal text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table hair_profiles enable row level security;

create policy "hair_profiles_select_own" on hair_profiles
  for select using (auth.uid() = user_id);
create policy "hair_profiles_insert_own" on hair_profiles
  for insert with check (auth.uid() = user_id);
create policy "hair_profiles_update_own" on hair_profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "hair_profiles_delete_own" on hair_profiles
  for delete using (auth.uid() = user_id);

create table routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  target_style_id text not null,
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  wash_cycle_days integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SDS §34.3: a user has at most one active routine at a time.
create unique index routines_one_active_per_user on routines (user_id) where status = 'active';

alter table routines enable row level security;

create policy "routines_select_own" on routines
  for select using (auth.uid() = user_id);
create policy "routines_insert_own" on routines
  for insert with check (auth.uid() = user_id);
create policy "routines_update_own" on routines
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "routines_delete_own" on routines
  for delete using (auth.uid() = user_id);

create table routine_steps (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references routines (id) on delete cascade,
  sequence integer not null,
  step_type text not null,
  requirement_level text not null,
  created_at timestamptz not null default now(),
  unique (routine_id, sequence)
);

alter table routine_steps enable row level security;

create policy "routine_steps_select_own" on routine_steps
  for select using (
    exists (select 1 from routines where routines.id = routine_steps.routine_id and routines.user_id = auth.uid())
  );
create policy "routine_steps_insert_own" on routine_steps
  for insert with check (
    exists (select 1 from routines where routines.id = routine_steps.routine_id and routines.user_id = auth.uid())
  );
create policy "routine_steps_update_own" on routine_steps
  for update using (
    exists (select 1 from routines where routines.id = routine_steps.routine_id and routines.user_id = auth.uid())
  ) with check (
    exists (select 1 from routines where routines.id = routine_steps.routine_id and routines.user_id = auth.uid())
  );
create policy "routine_steps_delete_own" on routine_steps
  for delete using (
    exists (select 1 from routines where routines.id = routine_steps.routine_id and routines.user_id = auth.uid())
  );

create table routine_step_products (
  id uuid primary key default gen_random_uuid(),
  routine_step_id uuid not null references routine_steps (id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique (routine_step_id, product_id)
);

alter table routine_step_products enable row level security;

create policy "routine_step_products_select_own" on routine_step_products
  for select using (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = routine_step_products.routine_step_id and routines.user_id = auth.uid()
    )
  );
create policy "routine_step_products_insert_own" on routine_step_products
  for insert with check (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = routine_step_products.routine_step_id and routines.user_id = auth.uid()
    )
  );
create policy "routine_step_products_delete_own" on routine_step_products
  for delete using (
    exists (
      select 1 from routine_steps
      join routines on routines.id = routine_steps.routine_id
      where routine_steps.id = routine_step_products.routine_step_id and routines.user_id = auth.uid()
    )
  );
