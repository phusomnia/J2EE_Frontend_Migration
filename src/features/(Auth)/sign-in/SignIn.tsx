import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStore } from "@/stores/FormStore";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { queryClient, useMutation } from "@/lib/ReactQuery";

export function SignInLayout() {
  return (
    <>
      <SignIn />
    </>
  );
}

export function SignIn() {
  const formSchema = z.object({
    username: z.string().min(1, { error: "Tên không được để trống" }),
    password: z.string().min(1, { error: "Mat khau không được để trống" }),
  });

  type FormData = z.infer<typeof formSchema>;

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

  const mutation = useMutation(
    {
      mutationFn: async (data: FormData) => {
        const response = await fetch("http://localhost:8080/api/v1/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        return response.json();
      },
      onSuccess: (data) => {
        console.log("Sign in successful:", data);
      },
      onError: (error) => {
        console.error("Sign in error:", error);
      },
    },
    queryClient
  );

  function onSubmit(data: FormData) {
    console.log("Validate data: ", data);
    mutation.mutate(data);
  }

  return (
    <>
      <div className="">
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
              <Button type="submit">Sign-up</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
