export default function StoreLocator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-teko">Store Locator</h1>
      <p className="mb-4">Find a store near you:</p>
      <ul className="list-disc pl-6">
        <li>Mumbai: 123 Fashion Street, Mumbai, Maharashtra 400001</li>
        <li>Delhi: 456 Style Avenue, Connaught Place, New Delhi 110001</li>
        <li>Bengaluru: 789 Trend Road, Koramangala, Bengaluru, Karnataka 560034</li>
      </ul>
    </div>
  );
}
