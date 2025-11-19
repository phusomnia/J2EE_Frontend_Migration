import { FormInput } from "@/components/_Form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Metadata from "@/utils/Metadata";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { queryClient, useMutation } from "@/lib/ReactQuery";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { AuthProvider } from "@/features/(Auth)/AuthProvider";
import { CookiesProvider } from "react-cookie";

export function SetPasswordLayout() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <SetPassword />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Email không đúng định dạng",
      }),
    password: z.string().min(1, { error: "Mật khẩu không được để trống" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;

function useSetPassword() {
  return useMutation(
    {
      mutationFn: async (payload: FormData) => {
        const res = await fetch(`${Metadata.base_api}/auth/set-password`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        return data;
      },
      onSuccess: (res: any) => {
        toast.success(res.message, {
          duration: 3000,
          style: {
            color: "green",
          },
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error(error.message, {
          duration: 3000,
          style: {
            color: "red",
          },
        });
      },
    },
    queryClient
  );
}

function SetPassword() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { handleSubmit, control, clearErrors } = form;

  const { isPending, mutate } = useSetPassword();

  function onSubmit(data: any) {
    console.log("Validate data: ", data);
    mutate(data);
  }

  function Status(props: any) {
    if (props.isPending) {
      return (
        <>
          <Spinner />
          ...Loading
        </>
      );
    }
    return <>{props.name}</>;
  }

  return (
    <div>
      <Toaster position="top-center" />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <FormInput
            control={control}
            name="email"
            placeHolder="Email"
            clearErrors={clearErrors}
          />
          <FormInput
            control={control}
            name="password"
            placeHolder="Mật khẩu mới"
            clearErrors={clearErrors}
          />
          <FormInput
            control={control}
            name="confirmPassword"
            placeHolder="Nhập lại mật khẩu"
            clearErrors={clearErrors}
          />
          <div className="col-span-2 flex gap-4 mt-4">
            <Button type="submit" disabled={isPending}>
              <Status isPending={isPending} name={"Lưu mật khẩu mới"} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
