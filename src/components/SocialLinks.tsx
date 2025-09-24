const SocialLinks = () => {
  const socialLinks = [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "YouTube", url: "#" },
    { name: "Bandcamp", url: "#" },
  ];

  return (
    <>
      {/* Desktop vertical social links */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-8">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              className="social-vertical hover:opacity-70 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile horizontal social links */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                className="text-xs font-medium tracking-wide uppercase text-gray-600 hover:opacity-70 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLinks;