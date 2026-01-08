import { Github, Linkedin } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Developed with <span className="text-red-500 animate-pulse">❤️</span> by diego4lbarracin
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/diego4lbarracin"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="GitHub"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/diego4lbarracin"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
