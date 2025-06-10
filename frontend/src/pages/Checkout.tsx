import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { Button } from "../components/Button";

interface CheckoutFormData {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cpf: string;
  birthYear: number;
}

const schema: yup.ObjectSchema<CheckoutFormData> = yup.object({
  fullName: yup.string().required("Nome é obrigatório"),
  cardNumber: yup.string().required("Número do cartão é obrigatório"),
  expirationDate: yup.string().required("Validade é obrigatória"),
  cvv: yup.string().required("CVV é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  birthYear: yup
    .number()
    .typeError("Ano de nascimento inválido")
    .required("Ano de nascimento é obrigatório"),
});

const formatCPF = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const formatCard = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .substring(0, 5);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  padding: 1rem;
  background-color: #4a83d8;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    max-width: 600px;
    padding: 3rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #222;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

export const Checkout: React.FC = () => {
  const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isValid },
} = useForm<CheckoutFormData>({
  resolver: yupResolver(schema),
  mode: 'onChange',
});

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments`,
        data
      );
      alert(response.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Erro ao processar pagamento.";
        alert(msg);
      } else {
        alert("Erro inesperado.");
      }
    }
  };

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <SectionTitle>Dados do Cartão</SectionTitle>
            <Input<CheckoutFormData>
              label="Nome completo"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
            />
            <Input<CheckoutFormData>
              label="Número do Cartão"
              name="cardNumber"
              register={register}
              error={errors.cardNumber?.message}
              onValueChange={(val) => setValue('cardNumber', formatCard(val))}
            />
            <Input<CheckoutFormData>
              label="Validade (MM/AA)"
              name="expirationDate"
              register={register}
              error={errors.expirationDate?.message}
              onValueChange={(val) => setValue('expirationDate', formatExpiry(val))}

            />
            <Input<CheckoutFormData>
              label="CVV"
              name="cvv"
              register={register}
              error={errors.cvv?.message}
            />
          </Section>

          <Section>
            <SectionTitle>Informações Fiscais</SectionTitle>
            <Input<CheckoutFormData>
              label="CPF"
              name="cpf"
              register={register}
              error={errors.cpf?.message}
              onValueChange={(val) => setValue('cpf', formatCPF(val))}
            />
            <Input<CheckoutFormData>
              label="Ano de Nascimento"
              name="birthYear"
              type="number"
              register={register}
              error={errors.birthYear?.message}
            />
          </Section>

          <Button type="submit" disabled={!isValid}>
            Processar
          </Button>
        </form>
      </Card>
    </Container>
  );
};
