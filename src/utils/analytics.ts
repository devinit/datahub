// const originalGoogleAnalyticsID = 'UA-80274731-1';
const newGoogleAnalyticsID = 'UA-122244396-1';

export const updateAnalytics = (pageTitle: string, pagePath: string) => {
  if ((window as any).ga) {
    (window as any).ga('set', 'page', pagePath);
  }
  if ((window as any).gtag) {
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', newGoogleAnalyticsID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }

};
