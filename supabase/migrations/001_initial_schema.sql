create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.courses (
  id text primary key,
  title text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id text not null,
  passed boolean not null default false,
  attempted_at timestamptz not null default now()
);

create table public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  primary key (user_id, course_id, lesson_id)
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.progress enable row level security;

create policy "Users can view own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Users can update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id);
create policy "Published courses are public" on public.courses for select to anon, authenticated using (published = true);
create policy "Users can view own attempts" on public.quiz_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can insert own attempts" on public.quiz_attempts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can view own progress" on public.progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can insert own progress" on public.progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own progress" on public.progress for update to authenticated using ((select auth.uid()) = user_id);

insert into public.courses (id, title, published) values ('html-foundations', 'HTML, 문서의 뼈대부터', true) on conflict do nothing;
