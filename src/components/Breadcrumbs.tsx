import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Hop as Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm contrast-text-secondary mb-6">
      <Link
        to="/"
        className="flex items-center hover:contrast-text transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className="hover:contrast-text transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="contrast-text font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
