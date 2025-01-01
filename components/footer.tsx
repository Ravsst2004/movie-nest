import React from "react";
import FooterList from "./footer-list";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const quickLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const contactUs = [
  {
    name: "Email",
    link: "mailto:support@movie_nest.com",
  },
  {
    name: "Phone",
    link: "tel:+123456789",
  },
];

const followUs = [
  {
    name: "Facebook",
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    link: "https://instagram.com",
  },
];

const legal = [
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Terms of Service",
    link: "/terms",
  },
  {
    name: "Cookie Policy",
    link: "/cookie-policy",
  },
];

const Footer = () => {
  return (
    <>
      <footer className="text-gray-900 dark:text-white py-8 mt-20 border-t">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <FooterList
            label="Quick Links"
            linkList={quickLinks}
          />
          <FooterList
            label="Contact Us"
            linkList={contactUs}
          />
          <FooterList
            label="Follow Us"
            linkList={followUs}
          />
          <FooterList
            label="Legal"
            linkList={legal}
          />

          <div className="footer-section col-span-1 md:col-span-2 lg:col-span-1">
            <h1 className="text-xl font-semibold mb-4">Newsletter</h1>
            <form
              action="#"
              className="flex flex-col space-y-4"
            >
              <Input
                type="email"
                placeholder="Email"
              />
              <Button type="button">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-900 dark:text-white">
          <p>
            &copy; {new Date().getFullYear()} Movie Nest . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
