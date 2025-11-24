import AuthForm from "@/app/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AuthForm type="register" />
    </div>
  );
}
