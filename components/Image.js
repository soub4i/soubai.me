export default function Image({ alt, src, previewSrc, webpSrc, className }) {
  // Simplified image component for terminal theme
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: '100%', height: 'auto' }}
      loading="lazy"
    />
  );
}
