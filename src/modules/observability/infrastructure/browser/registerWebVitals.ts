import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

type WebVitalSnapshot = Pick<
  Metric,
  'delta' | 'id' | 'name' | 'navigationType' | 'rating' | 'value'
>;

const endpoint = import.meta.env.PUBLIC_WEB_VITALS_ENDPOINT;

const reportMetric = (metric: Metric): void => {
  const snapshot: WebVitalSnapshot = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  window.__PORTFOLIO_WEB_VITALS__ ??= {};
  window.__PORTFOLIO_WEB_VITALS__[metric.name] = snapshot;
  window.dispatchEvent(new CustomEvent('portfolio:web-vital', { detail: snapshot }));

  if (!endpoint || navigator.doNotTrack === '1') return;

  navigator.sendBeacon(endpoint, JSON.stringify(snapshot));
};

export const registerWebVitals = (): void => {
  onCLS(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
};
