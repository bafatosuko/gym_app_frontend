import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {registerSchema, type RegisterFields} from "@/api/register.ts";
import { registerUser } from "@/api/register.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFields) => {
    try {

      const { confirmPassword, ...dataToSend } = data;

      // console.log("Sending:", dataToSend); // debug

      await registerUser(dataToSend);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-8 space-y-4 border rounded text-center mt-8"
    >
      <h1>Register</h1>

      <div>
        <Label htmlFor="username">Email</Label>
        <Input id="username" type="text" {...register("username")} disabled={isSubmitting} />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} disabled={isSubmitting} />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Repeat your Password</Label>
        <Input id="confirmPassword" type="password" {...register("confirmPassword")} disabled={isSubmitting} />
        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <Label htmlFor="lastname">Lastname</Label>
        <Input id="lastname" type="text" {...register("lastname")} disabled={isSubmitting} />
        {errors.lastname && <p className="text-red-600">{errors.lastname.message}</p>}
      </div>

      <div>
        <Label htmlFor="firstname">Firstname</Label>
        <Input id="firstname" type="text" {...register("firstname")} disabled={isSubmitting} />
        {errors.firstname && <p className="text-red-600">{errors.firstname.message}</p>}
      </div>

      <div>
        <Label htmlFor="dateOfBirth">Date Of Birth</Label>
        <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} disabled={isSubmitting} />
        {errors.dateOfBirth && <p className="text-red-600">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className="border rounded p-2 w-full"
          {...register("gender")}
          disabled={isSubmitting}
        >
          <option value="">-- Select gender --</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
      </div>

      <Button type="submit" className="mt-2 p-5 bg-blue-400" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterPage;
