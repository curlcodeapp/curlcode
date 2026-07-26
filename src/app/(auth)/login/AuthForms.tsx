'use client';

import { useActionState, useState } from 'react';

import { signIn, signUp, type AuthActionState } from '@/features/auth/actions';

const INITIAL_STATE: AuthActionState = { error: null };

export function AuthForms() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginState, loginAction, loginPending] = useActionState(signIn, INITIAL_STATE);
  const [signupState, signupAction, signupPending] = useActionState(signUp, INITIAL_STATE);

  const action = mode === 'login' ? loginAction : signupAction;
  const state = mode === 'login' ? loginState : signupState;
  const pending = mode === 'login' ? loginPending : signupPending;

  return (
    <div className="flex w-full flex-col gap-3">
      <form action={action} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500"
        />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Password"
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500"
        />
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="text-sm font-medium text-violet-400"
      >
        {mode === 'login' ? "Don't have an account? Create one" : 'Already have an account? Log in'}
      </button>
    </div>
  );
}
