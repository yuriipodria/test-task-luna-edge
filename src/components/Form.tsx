import { useForm } from "react-hook-form";
import { PokemonSelect } from "./PokemonSelect";
import { FormFields } from "../types/FormFields";
import { Input } from "./Input";
import { useCallback } from "react";

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = useCallback((data: FormFields) => {
    console.log("Form submitted:", data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        register={register("firstName", {
          required: "First name is required",
          pattern: {
            value: /^[a-zA-Z]{2,12}$/,
            message: "Only letters (a-z, A-Z) are allowed, between 2 and 12 characters",
          },
        })}
        error={errors.firstName}
        label="First name"
        placeholder="John"
        required={true}
        info="Enter your first name"
      />

      <Input
        register={register("lastName", {
          required: "Last name is required",
          pattern: {
            value: /^[a-zA-Z]{2,12}$/,
            message: "Only letters (a-z, A-Z) are allowed, between 2 and 12 characters"
          },
        })}
        error={errors.lastName}
        label="Last name"
        placeholder="Doe"
        required={true}
        info="Enter your last name"
      />

      <PokemonSelect control={control} error={errors.selectedPokemons} />

      <button
        type="submit"
        className="size-max cursor-pointer self-center rounded-sm border-0 bg-purple-800 p-2 text-white shadow"
      >
        Start your journey!
      </button>
    </form>
  );
};
