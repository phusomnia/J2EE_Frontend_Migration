import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStore } from '@/stores/FormStore';
import { FormInput } from '@/components/_Form';
import { Form } from '@/components/ui/form';
import { queryClient } from '@/lib/ReactQuery';
import { useSignIn as signInApi } from './hooks/mutation/useSignIn';

export function SignInLayout() {
  return (
    <>
      <SignIn />
    </>
  );
}

export function SignIn() {
  const formSchema = z.object({
    username: z.string().min(1, { error: 'Tên không được để trống' }),
    password: z.string().min(1, { error: 'Mat khau không được để trống' }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit, control, clearErrors, reset } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const isError = Boolean(error);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signInApi(data);
      if (res && (res as any).success) {
        console.log('Sign in successful:', res);
  queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        reset();
      } else {
        // API returned a non-ok payload
        setError((res as any).message || 'Đăng nhập thất bại');
      }
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Đăng nhập</h2>
          <Form {...form}>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormInput
                  className="w-full"
                  control={control}
                  name="username"
                  placeHolder="Tên tài khoản"
                  clearErrors={clearErrors}
                />
              </div>

              <div>
                <FormInput
                  className="w-full"
                  control={control}
                  name="password"
                  placeHolder="Mật khẩu"
                  clearErrors={clearErrors}
                />
              </div>

              {isError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">Có lỗi: {String(error?.message || error)}</div>
              )}

              <div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </div>

              <div className="text-sm text-center text-gray-500">
                <a className="underline" href="#">Quên mật khẩu?</a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
