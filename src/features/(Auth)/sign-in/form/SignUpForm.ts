import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(1, { error: "Tên không được để trống" }),
  password: z.string().min(1, { error: "Mật khẩu không được để trống" }),
});

export type FormData = z.infer<typeof formSchema>;
