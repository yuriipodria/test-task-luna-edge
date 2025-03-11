import { Badge } from "./Badge";

interface Props {
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen items-start justify-center overflow-y-hidden">
      <div className="mt-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-8 text-xl font-semibold">
          Create your pokemon team!
        </h2>

        {children}
      </div>
    </div>
  );
};
