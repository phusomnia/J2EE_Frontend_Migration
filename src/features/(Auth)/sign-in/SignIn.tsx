import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { formSchema, type FormData } from "./form/SignUpForm";
import { Spinner } from "@/components/ui/spinner";
import { toast, Toaster } from "sonner";
import { queryClient, useMutation } from "@/lib/ReactQuery";

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
        mutationFn: async (data: FormData) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const req = await fetch("http://localhost:8080/api/v1/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });

          const res = await req.json();
          console.log(res);
          if (res.statusCode !== 200) {
            throw new Error(res.message);
          }

          return res;
        },
        onSuccess: (res: any) => {
          toast.success("Đăng nhập thành công!", {
            duration: 3000,
            style: {
              color: "green",
            },
          });
          console.log("Success:", res);
        },
        onError: (error: any) => {
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

  function handleGoogleSignIn() {
    console.log("Google sign-in clicked");
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
            <div>Hoặc đăng nhập bằng:</div>
            <div className="col-span-2 flex gap-4 mt-4">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Status name={"Google"} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
