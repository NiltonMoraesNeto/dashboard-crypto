"use client";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { FormCad } from "@/components/common/form-cad-user";
import { formPerfilSchema } from "@/schemas/perfil-schema";
import apiViaCep from "@/services/apiViaCep";
import { createLogin } from "@/services/login";
import { usuarioPost } from "@/services/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Conta() {
  const form = useForm<z.infer<typeof formPerfilSchema>>({
    resolver: zodResolver(formPerfilSchema),
    defaultValues: {
      nome: "",
      email: "",
      dateCreated: "",
      sexo: "",
      telefone: "",
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
    },
  });

  const { getValues, setValue } = form;

  async function handlePesquisar() {
    const cep = getValues("cep");

    try {
      const response = await apiViaCep.get(`${cep}/json`);

      if (response.data && response.data.erro !== "true") {
        setValue("logradouro", response.data.logradouro || "");
        setValue("bairro", response.data.bairro || "");
        setValue("cidade", response.data.localidade || "");
        setValue("estado", response.data.uf || "");
      } else {
        toast.error("Erro CEP", {
          description: "CEP não encontrado ou inválido",
        });
      }
    } catch {
      toast.error("Erro CEP", {
        description: "CEP não encontrado ou inválido",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formPerfilSchema>) {
    const response = await usuarioPost(values);
    console.log("🚀  response - ", response);

    if (response && response.status === 201) {
      const responseLogin = await createLogin(values.email, "teste");
      console.log("🚀  responseLogin - ", responseLogin);
      toast.success("Perfil", {
        description: "Usuário criado com sucesso",
      });
    } else {
      toast.error("Perfil", {
        description: "Não foi possível criar o usuário os dados",
      });
    }
  }
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Adicionar usuário</h1>
        <FormCad
          form={form}
          onSubmit={onSubmit}
          handlePesquisar={handlePesquisar}
        />
      </div>
    </ProtectedRoute>
  );
}
