import { useRouter } from "next/router";
import { useEffect } from "react";

export const useUtmTracker = () => {
  const router = useRouter();
  const { utm_source, utm_medium, utm_campaign } = router.query;

  useEffect(() => {
    if (utm_source) {
      sessionStorage.setItem("utmSource", utm_source);
    }
    if (utm_medium) {
      sessionStorage.setItem("utmMedium", utm_medium);
    }
    if (utm_campaign) {
      sessionStorage.setItem("utmCampaign", utm_campaign);
    }

    const sourceUrlKey = "source_url";
    const timestampKey = "source_url_timestamp";
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const storedTimestamp = sessionStorage.getItem(timestampKey);
    const isExpired =
      !storedTimestamp || now - parseInt(storedTimestamp, 10) > oneDay;

    if (
      typeof window !== "undefined" &&
      (isExpired || !sessionStorage.getItem(sourceUrlKey))
    ) {
      const fullUrl = window.location.origin + router.asPath;
      sessionStorage.setItem(sourceUrlKey, fullUrl);
      sessionStorage.setItem(timestampKey, now.toString());
    }
  }, [router.query]);
};
