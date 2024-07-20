import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import FlexContainer from "@/components/ui/container/FlexContainer";
import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AuthSchema>) => {
    console.log(data);
  };
  return (
    <Card className="w-full md:w-1/2 lg:w-[30%] border-[1px] border-b-4 border-white bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-bold text-white text-2xl">
          Ambachat
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
                            type={showPass ? "text" : "password"}
                            className="text-white border-r-0 rounded-tr-none rounded-br-none flex-1"
                            placeholder="Password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={"secondary"}
                            size={"icon"}
                            onClick={() => setShowPass(!showPass)}
                            className="rounded-md border-l-0 rounded-tl-none rounded-bl-none"
                          >
                            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
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
            <Link to="/register">
              <Button type="button" variant="outline" className="text-white">
                Register
              </Button>
            </Link>
            <Button variant={"secondary"} type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Login;
