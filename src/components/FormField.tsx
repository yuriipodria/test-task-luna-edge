import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  info?: string;
}

export const FormField: React.FC<Props> = ({
  children,
  label,
  required,
  info,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="cursor-default font-semibold">{label}</span>

        {info && (
          <div className="group relative z-10 flex">
            <InformationCircleIcon className="size-5 cursor-pointer" />

            <span className="absolute top-full left-1/2 mt-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-all group-hover:block">
              {info}
            </span>
          </div>
        )}

        {required && <p className="text-red-500">*</p>}
      </div>

      <div className="relative flex flex-col gap-2">{children}</div>
    </div>
  );
};
