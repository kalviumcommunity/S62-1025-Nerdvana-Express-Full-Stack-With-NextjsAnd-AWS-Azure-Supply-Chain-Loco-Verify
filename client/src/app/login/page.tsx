import AuthForm from "@/app/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AuthForm type="login" />
    </div>
  );
}
