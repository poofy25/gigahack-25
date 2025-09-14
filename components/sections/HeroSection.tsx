import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  highlightText?: string;
  highlightColor?: string;
}

export function HeroSection({ 
  title, 
  description, 
  highlightText,
  highlightColor = '#0ea5e9'
}: HeroSectionProps) {
  const renderTitle = () => {
    if (highlightText) {
      const parts = title.split(highlightText);
      return (
        <>
          <span 
            className="text-white tracking-[var(--h-2-letter-spacing)] font-h-2 [font-style:var(--h-2-font-style)] font-[number:var(--h-2-font-weight)] leading-[var(--h-2-line-height)] text-[length:var(--h-2-font-size)]"
          >
            {parts[0]}
          </span>
          <span 
            className="tracking-[var(--h-2-letter-spacing)] font-h-2 [font-style:var(--h-2-font-style)] font-[number:var(--h-2-font-weight)] leading-[var(--h-2-line-height)] text-[length:var(--h-2-font-size)]"
            style={{ color: highlightColor }}
          >
            {highlightText}
          </span>
          <span 
            className="text-white tracking-[var(--h-2-letter-spacing)] font-h-2 [font-style:var(--h-2-font-style)] font-[number:var(--h-2-font-weight)] leading-[var(--h-2-line-height)] text-[length:var(--h-2-font-size)]"
          >
            {parts[1]}
          </span>
        </>
      );
    }
    
    return (
      <span className="text-white tracking-[var(--h-2-letter-spacing)] font-h-2 [font-style:var(--h-2-font-style)] font-[number:var(--h-2-font-weight)] leading-[var(--h-2-line-height)] text-[length:var(--h-2-font-size)]">
        {title}
      </span>
    );
  };

  return (
    <section className="flex flex-col w-[350px] h-[100px] items-center gap-3 relative flex-[0_0_auto]">
      <h1 className="relative self-stretch mt-[-1.00px] font-h-2 font-[number:var(--h-2-font-weight)] text-transparent text-[length:var(--h-2-font-size)] text-center tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] [font-style:var(--h-2-font-style)]">
        {renderTitle()}
      </h1>

      <p className="relative self-stretch font-detail font-[number:var(--detail-font-weight)] text-zinc-400 text-[length:var(--detail-font-size)] text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] [font-style:var(--detail-font-style)]">
        {description}
      </p>
    </section>
  );
}
