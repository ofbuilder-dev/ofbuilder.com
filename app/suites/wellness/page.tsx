// The old "AI Wellness & Faith" suite was split into Little Sparks (kids) and Noor (Islamic).
export default function WellnessRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/suites/noor/" />
      <link rel="canonical" href="https://ofbuilder.com/suites/noor/" />
      <p style={{ padding: 40, fontFamily: "sans-serif" }}>
        This suite has moved. <a href="/suites/noor/">Continue →</a>
      </p>
    </>
  );
}
