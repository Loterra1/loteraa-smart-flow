import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function NavigationHeader() {
   const { user, signOut } = useAuth();
   const [isOpen, setIsOpen] = useState(false);

   const handleLogout = async () => {
      try {
         await signOut();
         setIsOpen(false);
      } catch (error) {
         console.error('Logout error:', error);
      }
   };

   return (
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-500/10 backdrop-blur-md border-b border-gray-200/20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                     <img
                        src="/lovable-uploads/11f2ee42-8141-4707-84c9-a0d05cec405c.png"
                        alt="Loteraa Logo"
                        className="w-10 h-10"
                     />
                     <span className="text-xl font-bold text-white">
                        LOTERAA
                     </span>
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden lg:flex items-center space-x-8">
                  {user && (
                     <Link
                        to="/dashboard"
                        className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                     >
                        Dashboard
                     </Link>
                  )}
                  <Link
                     to="/about"
                     className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                     About
                  </Link>
                  <Link
                     to="/stake"
                     className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                     Stake
                  </Link>
                  <Link
                     to="/data-feed"
                     className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                     Real-time Data Feed
                  </Link>
                  <Link
                     to="/ambassador"
                     className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                     Ambassador
                  </Link>
               </nav>

                 {/* Desktop Auth Section */}
                 <div className="hidden lg:flex items-center space-x-4">
                    {user ? (
                       <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 text-white/80">
                             <User className="h-4 w-4" />
                             <span className="text-sm font-medium">
                                {user.email}
                             </span>
                          </div>
                          <Button
                             onClick={handleLogout}
                             variant="outline"
                             size="sm"
                             className="bg-transparent border-white/20 text-white hover:bg-white/10"
                          >
                             <LogOut className="h-4 w-4 mr-2" />
                             Logout
                          </Button>
                       </div>
                    ) : (
                       <Link to="/signup">
                          <Button
                             variant="outline"
                             size="sm"
                             className="bg-transparent border-white/20 text-white hover:bg-white/10"
                          >
                             Sign Up
                          </Button>
                       </Link>
                    )}
                 </div>

               {/* Mobile Menu Button */}
               <div className="lg:hidden flex items-center">
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                     aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  >
                     {isOpen ? (
                        <X className="h-6 w-6" />
                     ) : (
                        <Menu className="h-6 w-6" />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
               isOpen
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0 overflow-hidden'
            }`}
         >
            <div className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/20">
               <div className="px-4 pt-4 pb-6 space-y-2">
                  {/* Navigation Links */}
                  {user && (
                     <Link
                        to="/dashboard"
                        className="text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                        onClick={() => setIsOpen(false)}
                     >
                        Dashboard
                     </Link>
                  )}
                  <Link
                     to="/about"
                     className="text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                     onClick={() => setIsOpen(false)}
                  >
                     About
                  </Link>
                  <Link
                     to="/stake"
                     className="text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                     onClick={() => setIsOpen(false)}
                  >
                     Stake
                  </Link>
                  <Link
                     to="/data-feed"
                     className="text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                     onClick={() => setIsOpen(false)}
                  >
                     Real-time Data Feed
                  </Link>
                  <Link
                     to="/ambassador"
                     className="text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                     onClick={() => setIsOpen(false)}
                  >
                     Ambassador
                  </Link>

                    {/* Mobile Auth Section */}
                    <div className="pt-4 border-t border-gray-200/20 mt-4">
                       {user ? (
                          <div className="space-y-3">
                             <div className="flex items-center px-4 py-2 text-white/80 bg-white/5 rounded-lg">
                                <User className="h-4 w-4 mr-2" />
                                <span className="text-sm">{user.email}</span>
                             </div>
                             <Button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                             >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                             </Button>
                          </div>
                       ) : (
                          <Link to="/signup" onClick={() => setIsOpen(false)}>
                             <Button
                                className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10 py-3 rounded-lg"
                             >
                                Sign Up
                             </Button>
                          </Link>
                       )}
                    </div>
               </div>
            </div>
         </div>
      </header>
   );
}
