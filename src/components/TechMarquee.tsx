import React from 'react';

const technologies = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' }
];

// Duplicamos el array para lograr el efecto infinito sin cortes
const duplicatedTechs = [...technologies, ...technologies];

export default function TechMarquee() {

  return (
    <div className="w-full overflow-hidden py-8 relative">
      {/* Gradientes laterales para difuminar la entrada y salida */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-marquee w-max hover:[animation-play-state:paused]">
        {duplicatedTechs.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 px-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <img 
              src={tech.icon} 
              alt={`${tech.name} logo`} 
              className={`h-12 w-12 object-contain ${tech.name === 'Django' ? 'dark:invert' : ''}`}
              loading="lazy"
            />
            <span className="text-xl font-bold font-display text-slate-700 dark:text-slate-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
