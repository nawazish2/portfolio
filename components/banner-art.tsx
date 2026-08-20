export function BannerArt() {
  return (
    <div className="banner-art absolute inset-0 overflow-hidden bg-[#1a2420]" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banner.gif"
        alt=""
        width={800}
        height={336}
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
