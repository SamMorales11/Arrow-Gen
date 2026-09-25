/**
 * Image Optimization Utilities for Arrow Gen
 * Handles responsive scaling, modern formats (WebP/AVIF via CDN auto-format),
 * quality optimization, and blur-up placeholder helpers.
 */

export interface OptimizeImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'avif' | 'jpg'
  fit?: 'crop' | 'cover' | 'contain'
}

/**
 * Returns an optimized image URL for supported CDNs (e.g. Unsplash)
 * while preserving local assets and unknown endpoints safely.
 */
export function getOptimizedImageUrl(url: string, options: OptimizeImageOptions = {}): string {
  if (!url) return ''

  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    fit = 'crop'
  } = options

  try {
    // 1. Unsplash Images: leverage dynamic CDN parameters
    if (url.includes('images.unsplash.com')) {
      const parsedUrl = new URL(url)
      if (width) parsedUrl.searchParams.set('w', width.toString())
      if (height) parsedUrl.searchParams.set('h', height.toString())
      if (quality) parsedUrl.searchParams.set('q', quality.toString())
      if (format === 'auto') {
        parsedUrl.searchParams.set('auto', 'format')
      } else {
        parsedUrl.searchParams.set('fm', format)
      }
      if (fit) parsedUrl.searchParams.set('fit', fit)
      return parsedUrl.toString()
    }

    // 2. Picsum / Other CDN support
    if (url.includes('picsum.photos') && width && height) {
      return `https://picsum.photos/${width}/${height}`
    }

    // Return original url for local / static assets
    return url
  } catch {
    return url
  }
}

/**
 * Generates responsive srcset string for high-DPI (Retina) and multi-breakpoint delivery
 */
export function getImageSrcSet(url: string, widths: number[] = [640, 1024, 1440, 1920]): string {
  if (!url || !url.includes('images.unsplash.com')) return ''

  return widths
    .map(w => `${getOptimizedImageUrl(url, { width: w })} ${w}w`)
    .join(', ')
}
