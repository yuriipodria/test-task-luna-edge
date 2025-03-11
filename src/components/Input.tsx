import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./FormField";
import { FormFields } from "../types/FormFields";
import { UserIcon } from "@heroicons/react/24/solid";

interface Props {
  register: UseFormRegisterReturn<keyof FormFields>;
  label: string;
  placeholder: string;
  required?: boolean;
  info?: string;
  error: FieldError | undefined;
}

export const Input: React.FC<Props> = ({
  register,
  label,
  placeholder,
  required = false,
  info,
  error,
}) => {
  return (
    <FormField label={label} required={required} info={info}>
      <div className="absolute px-4 py-3">
        <UserIcon className="size-5" />
      </div>

      <input
        className="h-[40px] w-full rounded-lg py-3 pl-12 shadow outline outline-gray-300 transition hover:outline-3 hover:outline-purple-800 focus:outline-3 focus:outline-purple-800"
        {...register}
        type="text"
        placeholder={placeholder}
      />

      <p className="text-gray-400">{error?.message}</p>
    </FormField>
  );
};
