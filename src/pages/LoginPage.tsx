
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {Link} from "react-router";
import {type LoginFields, loginSchema} from "@/api/login.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/hooks/useAuth.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

  const {loginUser} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {

    try{
      await loginUser(data);
      toast.success("Login successfully");
      navigate("/");
    } catch (err) {
      toast.error(err instanceof  Error ? err.message : "Login failed.");
    }

  }


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-8 space-y-4 border rounded text-center mt-8  "
      >
        <h1>Login</h1>
        <div>
          <Label htmlFor="Email"   className="mb-2">Username</Label>
          <Input
            placeholder="Your Email"
            id="username"
            type="text"
            {...register("username")}
            disabled={isSubmitting}
            autoFocus
          />
          {errors.username && (
            <div className="text-red-900">{errors.username.message}</div>
          )}

        </div>

        <div>
          <Label htmlFor="password"   className="mb-2">Password</Label>
          <Input
            placeholder="Set your Password"
            id="password"
            type="password"
            {...register("password")}
            disabled={isSubmitting}

          />
          {errors.password && (
            <div className="text-red-900">{errors.password.message}</div>
          )}

        </div>



          <Button
            type="submit" className="mt-2 p-5"
            disabled={isSubmitting}
          >  {isSubmitting ? "Logging ..." : "Login"}
          </Button>

        <p>You dont have an account? <Link to="/register" className=" text-blue-400 hover:text-red-500 font-medium">Register</Link> </p>

      </form>
    </>

  )
}

export default LoginPage;