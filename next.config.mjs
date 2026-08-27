/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "cda-sa.spider.ws",
      "dashboard.cdaaudit.in",
    ],
  },

  // Locations used to live under /location while the module was being built.
  // They sit at the root now, so anything still pointing at the old prefix is
  // sent to the matching page. Bare /location has no page any more.
  async redirects() {
    return [
      {
        source: "/location/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/location/:slug/:child",
        destination: "/:slug/:child",
        permanent: true,
      },
      // Privacy policy and terms used to be hand-written pages of their own.
      // They are CMS company pages now, so the old addresses point at them.
      {
        source: "/privacy-policy",
        destination: "/company/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-condition",
        destination: "/company/terms-and-conditions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;