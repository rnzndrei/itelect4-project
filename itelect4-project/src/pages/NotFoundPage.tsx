// src/pages/NotFoundPage.tsx -- NEW FILE
import { Link } from "react-router";
function NotFoundPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        404 -- Page Not Found
      </h2>
      <Link to="/" className="text-blue-600 underline hover:text-blue-700">
        Go back to the Dashboard
      </Link>
    </div>
  );
}
export default NotFoundPage;
// Remember slide 14, where /anything-else gave a blank white page?
// The route that renders THIS page is on the next slide, and it is
// the last thing we add today.
