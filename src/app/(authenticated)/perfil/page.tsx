"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { usuarioGet, usuarioPut } from "@/services/usuario";
import { Usuario } from "@/model/usuario-model";
import { formPerfilSchema } from "@/schemas/perfil-schema";
import apiViaCep from "@/services/apiViaCep";
import { toast } from "sonner";
import { FormCad } from "@/components/common/form-cad-user";

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);

          const response = await usuarioGet(user.email);
          setUserId(response.id);

          setUsuario(response);
        }
      }
    };
    fetchUser();
  }, []);

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

  useEffect(() => {
    if (usuario) {
      form.reset({
        nome: usuario.nome,
        email: usuario.email,
        dateCreated: usuario.dateCreated,
        sexo: usuario.sexo,
        telefone: usuario.telefone,
        cep: usuario.cep,
        logradouro: usuario.logradouro,
        bairro: usuario.bairro,
        cidade: usuario.cidade,
        estado: usuario.estado,
        numero: usuario.numero,
        complemento: usuario.complemento,
      });
    }
  }, [usuario, form]);

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
    const response = await usuarioPut(userId, values);
    if (response && response.status === 200) {
      toast.success("Perfil", {
        description: "Dados alterados com sucesso",
      });
    } else {
      toast.error("Perfil", {
        description: "Não foi possível alterar os dados",
      });
    }
  }
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Perfil - {usuario?.nome}</h1>
        <FormCad
          form={form}
          onSubmit={onSubmit}
          handlePesquisar={handlePesquisar}
        />
      </div>
    </ProtectedRoute>
  );
}
