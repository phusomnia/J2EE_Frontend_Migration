import { queryClient, useMutation } from "@/lib/ReactQuery";

export function useSignIn() {
  return useMutation(
    {
      mutationFn: async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

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
      onSuccess: (res: any) => {
        console.log("Sign in successful:", res);
      },
      onError: (error: any) => {
        console.error("Sign in error:", error);
      },
    },
    queryClient
  );
}

export function useSignUp() {
  return useMutation(
    {
      mutationFn: async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("http://localhost:8080/api/v1/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        return response.json();
      },
      onSuccess: (res: any) => {
        console.log("Sign up successful:", res);
      },
      onError: (error: any) => {
        console.error("Sign up error:", error);
      },
    },
    queryClient
  );
}
