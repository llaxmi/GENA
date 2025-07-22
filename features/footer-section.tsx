import { Footer } from "@/components/footer";

const FooterSection = () => {
  return (
    <div className="w-full">
      <Footer
        mainLinks={[
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2025 GENA",
          license: "All rights reserved",
        }}
      />
    </div>
  );
};

export default FooterSection;
