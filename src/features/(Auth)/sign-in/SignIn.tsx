import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { formSchema, type FormData } from "./form/SignUpForm";
import { Spinner } from "@/components/ui/spinner";
import { toast, Toaster } from "sonner";
import { queryClient, useMutation } from "@/lib/ReactQuery";
import Metadata from "@/utils/Metadata";

export function SignIn() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { handleSubmit, control, clearErrors } = form;

  function useSignIn() {
    return useMutation(
      {
        mutationFn: async (payload: FormData) => {
          const res = await fetch(`${Metadata.base_api}/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include",
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          return data;
        },
        onSuccess: () => {
          toast.success("Đăng nhập thành công!", {
            duration: 3000,
            style: {
              color: "green",
            },
          });
          console.log("Success");
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
  const { isPending, mutate } = useSignIn();

  function onSubmit(data: any) {
    console.log("Validate data: ", data);
    mutate(data);
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
          ...Loading
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
              name="password"
              placeHolder="Mật khẩu"
              clearErrors={clearErrors}
            />
            <div className="col-span-2 flex gap-4 mt-4">
              <Button type="submit" disabled={isPending}>
                <Status isPending={isPending} name={"Đăng nhập"} />
              </Button>
            </div>
            <div>Hoặc</div>
            <div className="col-span-2 flex gap-4 mt-4">
              <Button
                type="button"
                onClick={handleGoogle}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Đăng nhập với Google
              </Button>
            </div>
            <div>
              Bạn là người mới ?{" "}
              <a href={`${Metadata.base_url}/sign-up`}>Đăng ký</a>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
