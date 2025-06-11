import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const PopupAnimation = ({
  children,
  delay = 0,
  className,
}: AnimationProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
};

export const HueAnimation = ({ children }: AnimationProps) => {
  return (
    <motion.div
      animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
      transition={{ repeat: Infinity, duration: 5 }}
    >
      {children}
    </motion.div>
  );
};

export const SlideLeftAnimation = ({ children, delay = 0 }: AnimationProps) => {
  return (
    <motion.div
      initial={{ x: 25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      {children}
    </motion.div>
  );
};
