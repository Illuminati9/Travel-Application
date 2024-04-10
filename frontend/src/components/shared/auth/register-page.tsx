import { useState } from "react";
import CardWrapper from "./card-wrapper";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: sessionStorage.getItem("phoneNumber") ?? "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    try {
      setIsPending(true);
      await axiosInstance
        .post(`/api/v1/auth/signUp`, values)
        .then((res) => {
          console.log(res);
          setSuccess("Registration successful!");
          sessionStorage.clear();
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          setError(error.response.data.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center ">
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="w-full flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="First name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Last name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-x-2 ">
                <Input value={"+91"} className="w-[12%]" readOnly />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={true}
                          placeholder="Mobile number"
                          type="number"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Confirm password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter otp"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center"
            >
              {isPending && (
                <svg
                  viewBox="0 0 800 800"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={50}
                >
                  <circle
                    className="spinLoader2"
                    cx="400"
                    cy="400"
                    fill="none"
                    r="109"
                    strokeWidth="35"
                    stroke="#fff"
                    strokeDasharray="685 1400"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default RegisterForm;
