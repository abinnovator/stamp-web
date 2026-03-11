export default function DocsPage() {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      {/* 1. The script tag to load Scalar */}
      <script
        id="api-reference"
        data-url="https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.json" // Replace with your OpenAPI JSON URL later
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    </main>
  );
}