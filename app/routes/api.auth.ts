import { json, type ActionFunctionArgs } from '@remix-run/cloudflare';
import { signIn, signUp } from '~/lib/auth/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  try {
    if (action === 'signup') {
      const user = await signUp(email, password, name);
      return json({ user });
    } else if (action === 'signin') {
      const user = await signIn(email, password);
      return json({ user });
    }
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }

  return json({ error: 'Invalid action' }, { status: 400 });
}
