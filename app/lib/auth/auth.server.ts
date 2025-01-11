import bcrypt from 'bcryptjs';
import { supabase } from '~/lib/supabase/client';

export async function signUp(email: string, password: string, name: string) {
  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        name,
        password_hash: passwordHash
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    throw new Error('Invalid password');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}
