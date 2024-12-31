import Link from "next/link";
import React from "react";

const FooterList = ({
  label,
  linkList,
}: {
  label: string;
  linkList: { name: string; link: string }[];
}) => {
  return (
    <div className="footer-section">
      <h4 className="text-xl font-semibold mb-4">{label}</h4>
      <ul className="space-y-3">
        {linkList.map((link) => (
          <li key={link.name}>
            <Link
              href={link.link}
              className="hover:text-gray-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
