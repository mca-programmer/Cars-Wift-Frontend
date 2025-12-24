import {motion, useAnimationControls} from "framer-motion";
import {useEffect} from "react";

const ThreeDRotation = ({text}) => {
    const controls = useAnimationControls();

    const rotateAnimation = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };

    const rotateLetter = {
        hidden: {
            rotateX: 90,
            opacity: 0,
            transformOrigin: "center",
        },
        visible: (i) => ({
            rotateX: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.6,
                ease: "easeInOut",
            },
        }),
    };

    useEffect(() => {
        controls.start("visible");
    }, [controls]);

    return (
        <motion.div
            className="text-[42px] md:text-6xl font-semibold text-center mt-4"
            style={{perspective: "1000px", transformStyle: "preserve-3d"}}
            initial="hidden"
            animate={controls}
            variants={rotateAnimation}
        >
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={rotateLetter}
                    className="inline-block"
                    style={{transformStyle: "preserve-3d"}}
                >
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default ThreeDRotation;
