import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
/**
 * Analytics component renders the SpeedInsights component
 * from Vercel's Speed Insights package to display performance
 * metrics for the application.
 */
const Analytics = () => {
  return (
    <>
      <SpeedInsights />
    </>
  );
};

export default Analytics;
