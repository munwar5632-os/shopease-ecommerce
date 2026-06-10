const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container-custom py-8 text-center">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        <p className="text-gray-400 text-sm mt-2">
          Built with React, Node.js, and MongoDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
