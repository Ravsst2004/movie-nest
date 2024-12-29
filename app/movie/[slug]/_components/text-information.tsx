import React from "react";

const TextInformation = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <span className="font-semibold">{label}:</span>{" "}
      <span>
        <p>{children}</p>
      </span>
    </div>
  );
};

export default TextInformation;
