import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/_Form";
import { Form } from "@/components/ui/form";
import { useSignUp } from "../api/useAuth";

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
  const { isError, isPending, isSuccess, mutate } = useSignUp();

  function onSubmit(data: any) {
    console.log("Validate data: ", data);
    mutate(data);
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
              <Button type="submit">Sign-up</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
