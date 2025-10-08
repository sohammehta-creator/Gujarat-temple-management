
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-amber-800 text-amber-100">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4 font-decorative">Gujarat Darshan</h3>
                        <p className="text-sm text-amber-200">A smart initiative for safe and organized pilgrimage across Gujarat's sacred temples.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Live Dashboard</a></li>
                            <li><a href="#" className="hover:text-white">Book Darshan</a></li>
                            <li><a href="#" className="hover:text-white">Emergency SOS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Data Protection</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                        {/* Add social media icons here */}
                        <p className="text-sm">Stay connected for live updates.</p>
                    </div>
                </div>
                <div className="mt-12 border-t border-amber-700 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Gujarat Temple Management Authority. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
