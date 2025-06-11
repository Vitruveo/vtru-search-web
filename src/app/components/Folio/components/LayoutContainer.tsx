import { twMerge } from "tailwind-merge";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutContainer = ({
  children,
  className,
}: LayoutContainerProps) => {
  return (
    <div
      className={twMerge(
        "flex overflow-hidden z-10 w-full h-screen relative p-0 gap-8 justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};
