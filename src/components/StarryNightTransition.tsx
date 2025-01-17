"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random";
import { motion } from 'framer-motion';

const glitchStyles = `
.glitch {
  position: relative;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                0.025em 0.04em 0 #fffc00;
  animation: glitch 725ms infinite;
}

.glitch span {
  position: absolute;
  top: 0;
  left: 0;
}

.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: 2px;
  text-shadow: -1px 0 #00fffc;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: -2px;
  text-shadow: -1px 0 #fc00ff, 2px 2px #00fffc;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
  animation-delay: 575ms;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                 -0.04em -0.025em 0 #fffc00;
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(11px, 9999px, 92px, 0);
  }
  5% {
    clip: rect(90px, 9999px, 44px, 0);
  }
  10% {
    clip: rect(47px, 9999px, 9px, 0);
  }
  15% {
    clip: rect(67px, 9999px, 98px, 0);
  }
  20% {
    clip: rect(26px, 9999px, 67px, 0);
  }
  25% {
    clip: rect(24px, 9999px, 13px, 0);
  }
  30% {
    clip: rect(88px, 9999px, 4px, 0);
  }
  35% {
    clip: rect(56px, 9999px, 92px, 0);
  }
  40% {
    clip: rect(28px, 9999px, 53px, 0);
  }
  45% {
    clip: rect(99px, 9999px, 34px, 0);
  }
  50% {
    clip: rect(23px, 9999px, 76px, 0);
  }
  55% {
    clip: rect(78px, 9999px, 92px, 0);
  }
  60% {
    clip: rect(46px, 9999px, 25px, 0);
  }
  65% {
    clip: rect(78px, 9999px, 93px, 0);
  }
  70% {
    clip: rect(100px, 9999px, 32px, 0);
  }
  75% {
    clip: rect(45px, 9999px, 56px, 0);
  }
  80% {
    clip: rect(12px, 9999px, 23px, 0);
  }
  85% {
    clip: rect(76px, 9999px, 89px, 0);
  }
  90% {
    clip: rect(32px, 9999px, 12px, 0);
  }
  95% {
    clip: rect(90px, 9999px, 56px, 0);
  }
  100% {
    clip: rect(67px, 9999px, 34px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(65px, 9999px, 23px, 0);
  }
  5% {
    clip: rect(12px, 9999px, 76px, 0);
  }
  10% {
    clip: rect(89px, 9999px, 34px, 0);
  }
  15% {
    clip: rect(23px, 9999px, 90px, 0);
  }
  20% {
    clip: rect(45px, 9999px, 12px, 0);
  }
  25% {
    clip: rect(67px, 9999px, 45px, 0);
  }
  30% {
    clip: rect(23px, 9999px, 87px, 0);
  }
  35% {
    clip: rect(98px, 9999px, 23px, 0);
  }
  40% {
    clip: rect(34px, 9999px, 78px, 0);
  }
  45% {
    clip: rect(87px, 9999px, 34px, 0);
  }
  50% {
    clip: rect(23px, 9999px, 90px, 0);
  }
  55% {
    clip: rect(45px, 9999px, 23px, 0);
  }
  60% {
    clip: rect(89px, 9999px, 45px, 0);
  }
  65% {
    clip: rect(23px, 9999px, 67px, 0);
  }
  70% {
    clip: rect(78px, 9999px, 89px, 0);
  }
  75% {
    clip: rect(34px, 9999px, 23px, 0);
  }
  80% {
    clip: rect(90px, 9999px, 45px, 0);
  }
  85% {
    clip: rect(23px, 9999px, 89px, 0);
  }
  90% {
    clip: rect(45px, 9999px, 23px, 0);
  }
  95% {
    clip: rect(67px, 9999px, 90px, 0);
  }
  100% {
    clip: rect(23px, 9999px, 34px, 0);
  }
}
`;

interface StarFieldProps {
  count?: number;
  radius?: number;
}

const StarField = ({ count = 5000, radius = 1.5 }: StarFieldProps) => {
  const ref = useRef<any>();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count), { radius: radius })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      ref.current.rotation.z -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

interface StarryNightTransitionProps {
  onEnter: () => void;
}

const StarryNightTransition: React.FC<StarryNightTransitionProps> = ({ onEnter }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [onEnter]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          style={{ background: 'radial-gradient(circle at center, #13111C, #000000)' }}
        >
          <Suspense fallback={null}>
            <StarField />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Press Enter Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center cursor-pointer select-none"
          onClick={onEnter}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="mb-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch"
                data-text="Tensor Club">
              Tensor Club
            </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
              Experience the future of AI-powered development. Join our innovative team in crafting the next generation of intelligent solutions.
            </p>
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl font-light tracking-[0.2em] text-white mb-4"
          >
            Press Enter
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.8
            }}
            className="h-[1px] w-[200px] mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
        </motion.div>
      </div>
      <style>{glitchStyles}</style>
    </div>
  );
};

export default StarryNightTransition;
