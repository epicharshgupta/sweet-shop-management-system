const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-1 mt-2">
      <div className="max-w-6xl mx-auto text-center opacity-80">
        <p className="text-lg">© {new Date().getFullYear()} SweetShop. All Rights Reserved.</p>
        <p className="text-sm mt-1">Premium Indian Sweets • Fresh • Authentic • Delivered Fast</p>
      </div>
    </footer>
  );
};

export default Footer;
