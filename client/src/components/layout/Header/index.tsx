export default function index() {
  return (
    <nav className="p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">RBCMS</h1>
        <div className="space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-800">
            Features
          </a>
          <a href="#about" className="text-gray-600 hover:text-blue-800">
            About
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-800">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
