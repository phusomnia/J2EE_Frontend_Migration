import { FormInput } from "@/components/_Form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthProvider, useAuth } from "@/features/(Auth)/AuthProvider";
import { CookiesProvider } from "react-cookie";

const VNNumberRegex =
  /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

const profileSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Tên người dùng không được để trống" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || VNNumberRegex.test(val), {
      message: "Số điện thoại không hợp lệ",
    }),
  email: z.string().email({ message: "Email không hợp lệ" }),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(1, "Mật khẩu không được để trống"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function SettingsLayout() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <Settings />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

function Settings() {
  const { token, decodedToken } = useAuth();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: decodedToken?.username ?? "",
      phone: decodedToken?.phone ?? "",
      email: decodedToken?.email ?? "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = profileForm;

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = passwordForm;

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      console.log("Profile updated:", data);
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      console.log("Password changed:", data);
      toast.success("Đổi mật khẩu thành công");
      resetPassword();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Có lỗi xảy ra khi đổi mật khẩu");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl space-y-8">
      <Toaster position="top-center" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Tên người dùng *
                  </label>
                  <FormInput
                    control={profileControl}
                    name="username"
                    placeholder="Nhập tên người dùng"
                    error={profileErrors.username?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Email *
                  </label>
                  <FormInput
                    control={profileControl}
                    name="email"
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    error={profileErrors.email?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Số điện thoại *
                  </label>
                  <FormInput
                    control={profileControl}
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    error={profileErrors.phone?.message}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => resetProfile()}
                >
                  Hủy
                </Button>
                <Button type="submit">Lưu thông tin</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Đổi mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Mật khẩu hiện tại *
                  </label>
                  <FormInput
                    control={passwordControl}
                    name="currentPassword"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    error={passwordErrors.currentPassword?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Mật khẩu mới *
                  </label>
                  <FormInput
                    control={passwordControl}
                    name="newPassword"
                    type="password"
                    placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                    error={passwordErrors.newPassword?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Xác nhận mật khẩu mới *
                  </label>
                  <FormInput
                    control={passwordControl}
                    name="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    error={passwordErrors.confirmPassword?.message}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => resetPassword()}
                  disabled={isPasswordSubmitting}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isPasswordSubmitting}>
                  {isPasswordSubmitting ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
