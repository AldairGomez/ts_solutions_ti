import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        className="transition-opacity duration-700 pointer-events-none"
      >
        <Particles
          id="tsparticles"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 120,
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 180,
                  links: { opacity: 0.8, color: "#1b61f2" },
                },
                push: {
                  quantity: 4,
                },
              },
            },
            particles: {
              color: { value: "#1b61f2" },
              links: {
                color: "#1b61f2",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: { enable: true, width: 800, height: 800 },
                value: 80,
              },
              opacity: {
                value: { min: 0.3, max: 0.8 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
    </ParticlesProvider>
  );
}
