export default function StoreLocator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-teko">Store Locator</h1>
      <p className="mb-4">Find a store near you:</p>
      <ul className="list-disc pl-6">
        <li>New York City: 123 Fashion Ave, New York, NY 10001</li>
        <li>Los Angeles: 456 Style Blvd, Los Angeles, CA 90001</li>
        <li>Chicago: 789 Trend St, Chicago, IL 60601</li>
      </ul>
    </div>
  )
}

