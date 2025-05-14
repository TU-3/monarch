function H1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`text-6xl font-bold ${className || ""}`}>
      {children}
    </h1>
  );
}

function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl font-bold ${className || ""}`}>
      {children}
    </h2>
  );
}

function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-2xl font-bold ${className || ""}`}>
      {children}
    </h3>
  );
}

function H4({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={`text-xl font-bold ${className || ""}`}>
      {children}
    </h4>
  );
}

function H5({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h5 className={`text-lg font-bold ${className || ""}`}>
      {children}
    </h5>
  );
}

function H6({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h6 className={`text-base font-bold ${className || ""}`}>
      {children}
    </h6>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base ${className || ""}`}>
      {children}
    </p>
  );
}

function SmallText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <small className={`text-sm ${className || ""}`}>
      {children}
    </small>
  );
}

function Subtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-lg italic ${className || ""}`}>
      {children}
    </h2>
  );
}

export { H1, H2, H3, H4, H5, H6, P, SmallText, Subtitle };