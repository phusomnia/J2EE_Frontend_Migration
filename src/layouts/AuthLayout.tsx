import { AuthProvider } from "@/context/auth/AuthProvider";

export default function AuthLayout({ children }: any) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
