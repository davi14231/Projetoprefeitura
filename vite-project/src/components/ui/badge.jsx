// src/components/ui/badge.jsx
export function Badge({ children, className = "", ...props }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${className}`} {...props}>
      {children}
    </span>
  );
}