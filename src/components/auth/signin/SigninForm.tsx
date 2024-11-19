'use client';

import { signin } from '@/server-actions/auth/signin';
import { Alert, Button, Card, Label, TextInput } from 'flowbite-react';
import { useActionState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

export function SigninForm() {
  const [state, formAction] = useActionState(signin, {});

  return (
    <Card className='w-full max-w-lg'>
      <form className='flex flex-col gap-4' action={formAction}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            id='email'
            name='email'
            type='email'
            placeholder='name@example.com'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password' value='Password' />
          </div>
          <TextInput id='password' name='password' type='password' required />
        </div>

        {state.error && (
          <div>
            <Alert color='failure' icon={HiInformationCircle}>
              {state.error.message}
            </Alert>
          </div>
        )}

        <Button color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </Card>
  );
}
