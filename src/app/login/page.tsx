"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLogin, login } from "@/services/login";
import { toast } from "sonner";
import { usuarioPost } from "@/services/usuario";
import { useTranslation } from "react-i18next";
import { FormCadPassword } from "@/components/specific/form-cad-password";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [newError, setNewError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas");
    }
  };

  const handleSubmitNewAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewError("");
    const success = await createLogin(newEmail, newPassword);

    if (success) {
      const newAccount = {
        email: newEmail,
      };
      await usuarioPost(newAccount);
      setIsOpen(false);
      toast.success(t("createLogin.apiTitle"), {
        description: t("createLogin.apiMsgSuccess"),
      });
    } else {
      toast.error(t("createLogin.apiTitle"), {
        description: t("createLogin.apiMsgError"),
      });
      setNewError(t("createLogin.apiMsgError"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">{t("login.title")}</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder={t("login.placeholderEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder={t("login.placeholderPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {t("login.buttonEnter")}
          </Button>
        </form>
      </div>
      <FormCadPassword
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newError={newError}
        handleSubmitNewAccount={handleSubmitNewAccount}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />
    </div>
  );
}
