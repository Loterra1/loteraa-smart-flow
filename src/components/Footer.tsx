import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-loteraa-gray/20 relative overflow-hidden">

      <div className="container px-4 sm:px-6 lg:px-8 py-12 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">LOTERAA</span>
            </Link>
            <p className="mt-4 text-white/70 max-w-xs">
              Building the future of IoT-Blockchain infrastructure.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.x.com/loteraa1" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://t.me/+Xn1PZ7DMaVo5M2E0" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/use-cases" className="text-white/70 hover:text-white transition-colors">Use Cases</Link></li>
              <li><Link to="/researchers" className="text-white/70 hover:text-white transition-colors">For Researchers</Link></li>
              <li><Link to="/developer-docs" className="text-white/70 hover:text-white transition-colors">Documentation</Link></li>
              <li><a href="https://disruptors99s-organization.gitbook.io/loteraa-whitepaper" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Whitepaper</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-loteraa-gray/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Loteraa. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-white/50 text-sm">
              Building the future of IoT-Blockchain infrastructure
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
