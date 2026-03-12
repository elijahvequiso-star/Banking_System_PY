const PEVLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };
  const subSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-sm",
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizes[size]} font-extrabold tracking-tight`}>
        <span className="text-primary-foreground">P</span>
        <span className="text-primary-foreground">E</span>
        <span className="text-accent">V</span>
      </div>
      <span className={`${subSizes[size]} text-primary-foreground tracking-widest uppercase font-medium -mt-1`}>
        Banking System
      </span>
    </div>
  );
};

export default PEVLogo;
