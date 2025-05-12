function H1({ children }) {
  return (
    <h1 className="text-6xl font-bold">
      {children}
    </h1>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-3xl font-bold">
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3 className="text-2xl font-bold">
      {children}
    </h3>
  );
}

function H4({ children }) {
  return (
    <h4 className="text-xl font-bold">
      {children}
    </h4>
  );
}

function H5({ children }) {
  return (
    <h5 className="text-lg font-bold">
      {children}
    </h5>
  );
}

function H6({ children }) {
  return (
    <h6 className="text-base font-bold">
      {children}
    </h6>
  );
}

function P({ children }) {
  return (
    <p className="text-base">
      {children}
    </p>
  );
}

function SmallText({ children }) {
  return (
    <small className="text-sm">
      {children}
    </small>
  );
}

function Subtitle({ children }) {
  return (
    <h2 className="text-lg italic">
      {children}
    </h2>
  );
}

export { H1, H2, H3, H4, H5, H6, P, SmallText, Subtitle };