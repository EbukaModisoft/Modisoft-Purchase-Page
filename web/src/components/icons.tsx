import type { SVGProps } from "react";

export function IconDotsVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

export function IconCheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.78-9.72a.75.75 0 0 0-1.06-1.06L9 10.94 7.28 9.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconExclamationTriangle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.99-1.742 2.99H3.48c-1.53 0-2.492-1.656-1.743-2.99l6.52-11.59ZM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1-8a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 10 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconSparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3.5 13.2 8.8 18.5 10 13.2 11.2 12 16.5 10.8 11.2 5.5 10 10.8 8.8 12 3.5Z" />
      <path d="M5 4.5 5.6 7 8.2 7.6 5.6 8.2 5 10.7 4.4 8.2 1.8 7.6 4.4 7 5 4.5Z" />
      <path d="M18.5 14.5 19 16.5 21 17 19 17.5 18.5 19.5 18 17.5 16 17 18 16.5 18.5 14.5Z" />
    </svg>
  );
}
