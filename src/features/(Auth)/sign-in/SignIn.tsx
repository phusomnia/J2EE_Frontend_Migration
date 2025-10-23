import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { queryClient, useMutation } from "@/lib/ReactQuery";
import { formSchema, type FormData } from "./form/SignUpForm";
import { useSignIn } from "../api/useAuth";
import { Spinner } from "@/components/ui/spinner";

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
  const { isError, isPending, isSuccess, mutate } = useSignIn();

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
              <Button type="submit" disabled={isPending}>
                <Status isPending={isPending} name={"Đăng nhập"} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
