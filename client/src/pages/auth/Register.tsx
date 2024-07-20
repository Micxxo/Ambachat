import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FlexContainer from "@/components/ui/container/FlexContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSchema } from "@/lib/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { z } from "zod";

const Register = () => {
  const [showPass, setShowPass] = useState<{
    password: boolean;
    confirm: boolean;
  }>({
    password: false,
    confirm: false,
  });

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AuthSchema>) => {
    console.log(data);
  };
  return (
    <Card className="w-full md:w-1/2 lg:w-[30%] border-[1px] border-b-4 border-white bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-bold text-white text-2xl">
          Ambachat{" "}
          <span className="text-xs font-medium tracking-wide">Register </span>
        </CardTitle>
        <CardDescription>Your chatting provider app.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-center gap-4"
        >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        className="text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="example@gmail.com"
                        className="text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel className="text-white">Password</FormLabel>
                    <FlexContainer>
                      <FormControl>
                        <>
                          <Input
                            id="password"
                            type={showPass.password ? "text" : "password"}
                            className="text-white border-r-0 rounded-tr-none rounded-br-none flex-1"
                            placeholder="Password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={"secondary"}
                            size={"icon"}
                            onClick={() =>
                              setShowPass((prev) => ({
                                ...prev,
                                password: !prev.password,
                              }))
                            }
                            className="rounded-md border-l-0 rounded-tl-none rounded-bl-none"
                          >
                            {showPass.password ? (
                              <FaRegEyeSlash />
                            ) : (
                              <FaRegEye />
                            )}
                          </Button>
                        </>
                      </FormControl>
                    </FlexContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel className="text-white">
                      Confirm Password
                    </FormLabel>
                    <FlexContainer>
                      <FormControl>
                        <>
                          <Input
                            id="password"
                            type={showPass.confirm ? "text" : "password"}
                            className="text-white border-r-0 rounded-tr-none rounded-br-none flex-1"
                            placeholder="Password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={"secondary"}
                            size={"icon"}
                            onClick={() =>
                              setShowPass((prev) => ({
                                ...prev,
                                confirm: !prev.confirm,
                              }))
                            }
                            className="rounded-md border-l-0 rounded-tl-none rounded-bl-none"
                          >
                            {showPass.confirm ? (
                              <FaRegEyeSlash />
                            ) : (
                              <FaRegEye />
                            )}
                          </Button>
                        </>
                      </FormControl>
                    </FlexContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/">
              <Button type="button" variant="outline" className="text-white">
                Login
              </Button>
            </Link>
            <Button variant={"secondary"} type="submit">
              Register
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Register;
