
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Welcome to the Product Store
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        This modern Single Page Application (SPA) fetches real-time product data from the <strong>FakeStoreAPI</strong>, showcasing a seamless e-commerce experience. 
        Built with React, it features dynamic routing, state management, reusable components, and advanced filtering/pagination for effortless browsing.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Key Features</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Responsive Design</li>
            <li>• Search & Filters</li>
            <li>• Dark Mode Toggle</li>
            <li>• Favorites (localStorage)</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Why FakeStoreAPI?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Simulates a real e-commerce backend with products, categories, pricing, and ratings—perfect for demoing API integration without auth hassles.
          </p>
        </div>
      </div>
      <Link
        to="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
      >
        Explore Products
      </Link>
    </div>
  );
}