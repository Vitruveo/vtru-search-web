import { motion } from 'framer-motion';

export const ShowAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        style={{ height: '100%' }}
        initial={{ opacity: 0, y: -5 }}
        transition={{ type: 'spring' }}
        animate={{ opacity: 1, y: 0 }}
    >
        {children}
    </motion.div>
);
