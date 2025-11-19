import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { queryClient, useMutation } from "@/lib/ReactQuery";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import Metadata from "@/utils/Metadata";

export function SignUp() {
  const formSchema = z.object({
    username: z.string().min(1, { error: "Tên không được để trống" }),
    email: z.email({ message: "Email không hợp lệ" }),
    password: z.string().min(1, { error: "Mat khau không được để trống" }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { handleSubmit, control, clearErrors } = form;

  const { isPending } = useSignUp();

  function useSignUp() {
    return useMutation(
      {
        mutationFn: async (payload: FormData) => {
          const res = await fetch(`${Metadata.base_api}/sign-up`, {
            method: "POST",
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
        onSuccess: () => {
          toast.success("Đăng ký thành công!", {
            duration: 3000,
            style: {
              color: "green",
            },
          });
        },
        onError: (error: Error) => {
          toast.error(error.message, {
            duration: 3000,
            style: {
              color: "red",
            },
          });
          console.error("Đăng ký thành thất bại:", error);
        },
      },
      queryClient
    );
  }

  function onSubmit(data: any) {
    console.log("Validate data: ", data);
    useSignUp().mutate(data);
  }

  function handleGoogle() {
    console.log("Google sign-in clicked");
    window.location.href = Metadata.auth_url;
  }

  function Status(props: any) {
    if (props.isPending) {
      return (
        <>
          <Spinner />
          ...Vui lòng chờ
        </>
      );
    }
    return <>{props.name}</>;
  }

  return (
    <>
      <div className="">
        <Toaster position="top-center" />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <FormInput
              className="mb-4"
              control={control}
              name="username"
              placeHolder="Tên tài khoản"
              clearErrors={clearErrors}
            />
            <FormInput
              className="mb-4"
              control={control}
              name="email"
              placeHolder="Tên email"
              clearErrors={clearErrors}
            />
            <FormInput
              className="mb-4"
              control={control}
              name="password"
              placeHolder="Mật khẩu"
              clearErrors={clearErrors}
            />
            <div className="col-span-2 flex gap-4 mt-4">
              <Button type="submit" disabled={isPending}>
                <Status isPending={isPending} name={"Đăng ký"} />
              </Button>
            </div>
            <div>
              Đã có mật khẩu ?{" "}
              <a href={`${Metadata.base_url}/sign-in`}>Đăng nhập tại đây</a>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
