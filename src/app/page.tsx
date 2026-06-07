'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => { document.body.classList.remove('landing-page'); };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer && e.deltaY !== 0 && window.innerWidth >= 1024) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel as any, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel as any);
      }
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="navbar" id="site-header">
        <div className="logo-container">
          <Link href="/" className="logo-text" aria-label="Out of Office Home">
            <svg width="139" height="63" viewBox="0 0 139 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2093_338)">
                <path d="M43.4365 16.5361C34.8374 16.5361 27.8399 23.5314 27.8399 32.1305C27.8399 33.2423 27.9569 34.3277 28.1797 35.3755C29.9665 37.3874 31.2549 39.8471 31.8549 42.5649C34.7117 45.7328 38.8458 47.727 43.4365 47.727C52.0355 47.727 59.0308 40.7295 59.0308 32.1305C59.0308 23.5314 52.0355 16.5361 43.4365 16.5361ZM51.4951 29.9884L48.0956 38.8588C47.7095 39.8648 46.5823 40.3677 45.5785 39.9817L36.7081 36.5822C35.7022 36.1962 35.1992 35.0689 35.5853 34.0651L38.9847 25.1948C39.3708 25.1948 40.4981 23.6858 41.5018 24.0719L50.3722 27.4714C51.3781 27.8574 51.8811 28.9847 51.4951 29.9884Z" fill="#5700FF" />
                <path d="M18.7357 0C10.1366 0 3.13916 6.99528 3.13916 15.5943C3.13916 24.1934 10.1344 31.1887 18.7335 31.1887C27.3326 31.1887 34.3278 24.1934 34.3278 15.5943C34.3278 6.99528 27.3348 0 18.7357 0ZM26.0464 19.638L17.5092 23.8029C16.5429 24.275 15.3759 23.8735 14.9039 22.9051L10.7389 14.3678C10.2668 13.4016 10.6683 12.2346 11.6367 11.7625L20.174 7.59753C21.1403 7.12544 22.3072 7.52693 22.7793 8.49537L26.9443 17.0327C27.4164 17.9989 27.0149 19.1659 26.0464 19.638Z" fill="#00CC8D" />
                <path d="M69.8801 21.9349C69.569 20.4415 69.536 18.9899 69.7786 17.5803C70.0213 16.1706 70.5375 14.847 71.3228 13.6094C72.0641 12.4292 73.006 11.4475 74.1487 10.6622C75.2915 9.87684 76.5489 9.34299 77.921 9.0562C79.2932 8.76942 80.6631 8.7606 82.0286 9.02752C83.3942 9.29445 84.6692 9.82169 85.8495 10.6114C87.0385 11.399 88.0224 12.3917 88.7989 13.5874C89.5754 14.7852 90.1225 16.1397 90.4358 17.6508C90.6983 18.9127 90.7689 20.1348 90.6498 21.3217C90.5284 22.5085 90.2174 23.6314 89.7122 24.6947C88.6643 26.9227 86.9988 28.6192 84.7112 29.7839C82.5735 30.7171 80.4403 30.9752 78.3159 30.5538C76.9592 30.2847 75.6952 29.7553 74.5238 28.9633C73.3083 28.1427 72.3067 27.1389 71.5236 25.9543C70.7404 24.7675 70.1911 23.4284 69.8801 21.9349ZM74.8304 20.9025C75.1966 22.6541 76.0128 24.0152 77.2857 24.9837C78.5564 25.9521 79.944 26.2808 81.444 25.9675C82.9552 25.6521 84.0979 24.8006 84.8722 23.4108C85.6465 22.021 85.8495 20.4437 85.4833 18.6833C85.1149 16.9118 84.2964 15.5419 83.0302 14.5735C81.7639 13.605 80.3741 13.2763 78.863 13.5918C77.3607 13.905 76.2202 14.7588 75.4437 16.1552C74.665 17.5516 74.462 19.1355 74.8304 20.9047V20.9025Z" fill="#5700FF" />
                <path d="M99.7055 13.1634L103.405 12.3913C103.577 12.356 103.747 12.4663 103.784 12.6384L106.405 25.2127C106.443 25.387 106.328 25.5591 106.151 25.592L102.745 26.2341C102.573 26.267 102.408 26.1547 102.373 25.9848L102.099 24.672C102.039 24.3899 101.669 24.3237 101.517 24.5664C101.115 25.2061 100.672 25.7289 100.184 26.137C99.5246 26.6908 98.7547 27.059 97.8745 27.2423C96.5487 27.518 95.4611 27.3479 94.6118 26.7327C93.7625 26.117 93.1845 25.0759 92.8801 23.6111L91.1417 15.2724C91.1064 15.1003 91.2167 14.9305 91.3888 14.893L95.1147 14.1164C95.2868 14.081 95.4567 14.1915 95.4942 14.3635L96.9766 21.4779C97.1134 22.1353 97.3516 22.6074 97.6914 22.8898C98.0311 23.172 98.4657 23.2582 98.9929 23.1479C99.754 22.9891 100.283 22.6096 100.583 22.0096C100.883 21.4095 100.934 20.6286 100.733 19.6646L99.4562 13.5385C99.4209 13.3664 99.5312 13.1965 99.7033 13.159L99.7055 13.1634Z" fill="#5700FF" />
                <path d="M108.004 20.1127L107.023 15.4051C106.988 15.233 106.818 15.1205 106.643 15.158L105.448 15.4073C105.276 15.4426 105.106 15.3323 105.068 15.1602L104.512 12.4909C104.477 12.3189 104.587 12.149 104.759 12.1115L105.955 11.8622C106.127 11.8269 106.24 11.6571 106.202 11.4828L105.543 8.31494C105.509 8.15831 105.598 8.00168 105.75 7.94874L109.467 6.63837C109.65 6.57439 109.847 6.68469 109.886 6.87441L110.654 10.5563C110.689 10.7283 110.859 10.8408 111.033 10.8033L113.37 10.3158C113.542 10.28 113.711 10.3908 113.749 10.5629L114.305 13.2322C114.34 13.4042 114.23 13.5741 114.058 13.6116L111.722 14.0991C111.55 14.1344 111.437 14.3043 111.475 14.4786L112.52 19.4928C112.756 20.6245 113.081 21.4099 113.491 21.8511C113.747 22.1246 114.102 22.3629 114.559 22.5636C114.834 22.6849 114.812 23.0842 114.521 23.1659L111.441 24.0284C110.555 24.2777 109.582 23.971 109.05 23.2169C109.046 23.2056 109.044 23.2056 109.039 23.2011C108.666 22.6651 108.32 21.6371 108.004 20.1149V20.1127Z" fill="#5700FF" />
                <path d="M69.5756 41.3961C69.5756 39.8717 69.8381 38.4444 70.3632 37.112C70.8882 35.7817 71.6625 34.5905 72.6861 33.5382C73.6524 32.5345 74.7752 31.7646 76.0525 31.2307C77.332 30.6969 78.671 30.4277 80.0741 30.4277C81.4749 30.4277 82.8184 30.6969 84.1023 31.2373C85.3862 31.7778 86.5245 32.5543 87.5194 33.5669C88.5231 34.5795 89.2842 35.7531 89.8004 37.0833C90.3166 38.4135 90.5747 39.8518 90.5747 41.3961C90.5747 42.6844 90.3938 43.8977 90.0342 45.0338C89.6747 46.1699 89.1386 47.2067 88.4283 48.1443C86.948 50.112 84.9692 51.4334 82.4941 52.1041C80.2108 52.5828 78.071 52.3975 76.0768 51.5526C74.8039 51.0121 73.6744 50.2356 72.6883 49.223C71.6647 48.1707 70.8904 46.986 70.3654 45.6647C69.8404 44.3433 69.5778 42.9204 69.5778 41.3961H69.5756ZM74.634 41.3961C74.634 43.1851 75.1569 44.6852 76.2047 45.8919C77.2504 47.0986 78.5409 47.7031 80.0763 47.7031C81.6205 47.7031 82.9132 47.1008 83.9545 45.8985C84.9957 44.6963 85.5163 43.194 85.5163 41.3939C85.5163 39.5849 84.9957 38.076 83.9545 36.8693C82.9132 35.6626 81.6205 35.0582 80.0763 35.0582C78.5409 35.0582 77.2504 35.6626 76.2047 36.8693C75.1591 38.076 74.634 39.5849 74.634 41.3939V41.3961Z" fill="#5700FF" />
                <path d="M99.8224 39.2165V41.9431C99.8224 42.1196 99.679 42.263 99.5025 42.263H97.0869C96.9104 42.263 96.767 42.4064 96.767 42.5829V51.3761C96.767 51.5526 96.6236 51.696 96.4472 51.696H92.5403C92.3638 51.696 92.2204 51.5526 92.2204 51.3761V42.5829C92.2204 42.4064 92.077 42.263 91.9006 42.263H89.7254C89.5489 42.263 89.4055 42.1196 89.4055 41.9431V39.2165C89.4055 39.04 89.5489 38.8966 89.7254 38.8966H91.9006C92.077 38.8966 92.2204 38.7532 92.2204 38.5768V37.7605C92.2204 36.17 92.4675 34.8045 92.9594 33.6684C92.9639 33.6573 92.9683 33.6463 92.9749 33.6353C93.5484 32.3315 94.7882 31.4447 96.2001 31.2748L99.6613 30.8557C99.851 30.8336 100.019 30.9814 100.019 31.1734V32.2058C98.9201 32.4815 98.1039 33.0044 97.5678 33.7765C97.0318 34.5486 96.7648 35.5964 96.7648 36.9222V38.5768C96.7648 38.7532 96.9082 38.8966 97.0847 38.8966H99.5003C99.6768 38.8966 99.8202 39.04 99.8202 39.2165H99.8224Z" fill="#5700FF" />
                <path d="M108.929 39.2165V41.9431C108.929 42.1196 108.785 42.263 108.609 42.263H104.914C104.737 42.263 104.594 42.4064 104.594 42.5829V51.3761C104.594 51.5526 104.274 51.696 104.274 51.696H100.367C100.191 51.696 100.047 51.5526 100.047 51.3761V42.5829C100.047 42.4064 99.904 42.263 99.7275 42.263H98.5054C98.3289 42.263 98.1855 42.1196 98.1855 41.9431V39.2165C98.1855 39.04 98.3289 38.8966 98.5054 38.8966H99.7275C99.904 38.8966 100.047 38.5768 100.047 38.5768V37.7605C100.047 36.17 100.294 34.8045 100.786 33.6684C100.791 33.6573 100.795 33.6463 100.802 33.6353C101.375 32.3315 102.615 31.4447 104.027 31.2748L107.488 30.8557C107.678 30.8336 107.846 30.9814 107.846 31.1734V32.2058C106.747 32.4815 105.931 33.0044 105.395 33.7765C104.859 34.5486 104.592 35.5964 104.592 36.9222V38.5768C104.592 38.7532 104.735 38.8966 104.912 38.8966H108.607C108.783 38.8966 108.927 39.04 108.927 39.2165H108.929Z" fill="#5700FF" />
                <path d="M107.656 35.0253C107.656 34.3437 107.892 33.7657 108.366 33.291C108.841 32.8167 109.419 32.5807 110.1 32.5807C110.791 32.5807 111.371 32.8145 111.841 33.2844C112.308 33.7543 112.545 34.3344 112.545 35.0253C112.545 35.707 112.308 36.2894 111.834 36.7725C111.36 37.2556 110.782 37.4961 110.1 37.4961C109.436 37.4961 108.865 37.2534 108.382 36.7637C107.899 36.2761 107.656 35.696 107.656 35.0231V35.0253ZM112.053 51.6984H108.19C108.013 51.6984 107.87 51.555 107.87 51.3785V39.2145C107.87 39.0381 108.011 38.8969 108.188 38.8947L112.05 38.8682C112.227 38.8682 112.372 39.1881 112.372 39.1881V51.3785C112.372 51.555 112.229 51.6984 112.053 51.6984Z" fill="#5700FF" />
                <path d="M125.417 50.7738C125.421 50.8951 125.355 51.012 125.247 51.0672C124.45 51.4643 123.264 51.762 122.555 51.9606C121.792 52.1746 121.009 52.2805 120.204 52.2805C118.073 52.2805 116.323 51.6408 114.953 50.3635C113.586 49.084 112.9 47.4648 112.9 45.5058C112.9 43.4697 113.636 41.7622 115.108 40.3834C116.581 39.0047 118.43 38.3164 120.656 38.3164C121.47 38.3164 122.266 38.409 123.043 38.5944C123.753 38.7642 124.439 39.009 125.103 39.3334C125.216 39.3885 125.286 39.5054 125.282 39.6312L125.207 42.8851C125.203 43.1167 124.962 43.2667 124.753 43.1674C124.093 43.2667 123.29 42.6093 122.765 42.4306C122.116 42.2078 121.512 42.0975 120.954 42.0975C119.95 42.0975 119.116 42.4019 118.454 43.013C117.79 43.624 117.459 44.3852 117.459 45.294C117.459 46.2603 117.766 47.0368 118.384 47.6236C118.999 48.2104 119.809 48.5038 120.813 48.5038C121.437 48.5038 122.105 48.3692 122.816 48.0979C123.405 47.8729 124.073 47.5354 124.819 47.0787C125.028 46.9508 125.3 47.0941 125.306 47.339L125.414 50.7738H125.417Z" fill="#5700FF" />
                <path d="M138.364 47.7121L138.267 50.8601C138.262 50.9814 138.192 51.0939 138.079 51.1424C137.225 51.5175 136.1 51.7976 135.315 51.9829C134.472 52.1815 133.619 52.2808 132.758 52.2808C130.627 52.2808 128.909 51.6675 127.601 50.4409C126.292 49.214 125.639 47.6172 125.639 45.6451C125.639 43.6729 126.354 41.8551 127.786 40.4388C129.215 39.0226 130.954 38.3145 132.999 38.3145C134.75 38.3145 136.189 38.8329 137.311 39.8697C138.434 40.9065 138.995 42.25 138.995 43.8979C138.995 44.1075 138.981 44.8972 138.957 45.4862C138.948 45.687 138.785 45.8458 138.582 45.8502L130.144 46.0179C129.946 46.0223 129.8 46.2076 129.837 46.4017C129.968 47.0944 130.312 47.668 130.868 48.1224C131.521 48.6585 132.346 48.9254 133.341 48.9254C134.042 48.9254 134.821 48.7732 135.677 48.471C136.383 48.2217 137.117 47.8731 137.883 47.4253C138.099 47.2974 138.373 47.4584 138.364 47.7099V47.7121ZM129.981 43.6795C129.924 43.8869 130.087 44.0898 130.303 44.0832L135.441 43.9266V43.728C135.441 43.0552 135.205 42.5037 134.73 42.0735C134.256 41.6433 133.661 41.4271 132.941 41.4271C132.136 41.4271 131.463 41.661 130.925 42.1309C130.477 42.5191 130.164 43.035 129.983 43.6817L129.981 43.6795Z" fill="#5700FF" />
                <path d="M114.484 28.9787C114.484 26.9426 115.15 25.266 116.48 23.949C117.81 22.632 119.493 21.9746 121.53 21.9746C123.566 21.9746 125.267 22.632 126.601 23.949C127.936 25.266 128.604 26.9426 128.604 28.9787C128.604 31.0149 127.936 32.6937 126.601 34.0151C125.267 35.3365 123.575 35.9961 121.53 35.9961C119.485 35.9961 117.821 35.3365 116.487 34.0151C115.152 32.6937 114.484 31.0149 114.484 28.9787ZM119.03 28.9787C119.03 30.0685 119.264 30.9465 119.734 31.6149C120.204 32.2833 120.802 32.616 121.532 32.616C122.262 32.616 122.86 32.2811 123.33 31.6083C123.8 30.9355 124.033 30.0597 124.033 28.9809C124.033 27.9022 123.8 27.0374 123.33 26.3602C122.862 25.6829 122.262 25.345 121.532 25.345C120.802 25.345 120.204 25.6807 119.734 26.3536C119.266 27.026 119.03 27.9022 119.03 28.9809V28.9787Z" fill="#5700FF" />
                <path d="M138.09 22.906V25.6326C138.09 25.8091 137.947 25.9525 137.77 25.9525H135.355C135.178 25.9525 135.035 26.095 135.035 26.2723V35.0655C135.035 35.242 134.891 35.3854 134.715 35.3854H130.808C130.632 35.3854 130.488 35.242 130.488 35.0655V26.2723C130.488 26.095 130.345 25.9525 130.168 25.9525H128.946C128.77 25.9525 128.626 25.8091 128.626 25.6326V22.906C128.626 22.7295 128.77 22.5861 128.946 22.5861H130.168C130.345 22.5861 130.488 22.4427 130.488 22.2662V21.45C130.488 19.8595 130.735 18.4939 131.227 17.3578C131.799 16.0475 133.021 15.1386 134.439 14.9665L137.929 14.5452C138.119 14.5231 138.286 14.6709 138.286 14.8628V15.6526C138.286 15.796 138.189 15.9195 138.053 15.9592C137.071 16.2482 136.332 16.749 135.836 17.4659C135.3 18.238 135.033 19.285 135.033 20.6139V22.2684C135.033 22.4449 135.176 22.5883 135.352 22.5883H137.768C137.945 22.5883 138.088 22.7317 138.088 22.9082L138.09 22.906Z" fill="#5700FF" />
                <path d="M31.8549 42.5653C30.0526 40.5666 28.7599 38.1025 28.1797 35.3758C25.2258 32.038 20.913 29.9336 16.1172 29.9336C7.23133 29.9336 0 37.1649 0 46.053C0 54.941 7.23133 62.1701 16.1172 62.1701C25.003 62.1701 32.2365 54.9388 32.2365 46.053C32.2365 44.855 32.1064 43.688 31.8549 42.5653ZM23.986 43.699L20.9417 52.6975C20.5976 53.7167 19.4924 54.2638 18.471 53.9196L9.47264 50.8753C8.45346 50.5312 7.90637 49.426 8.25051 48.4068L11.2948 39.4062C11.639 38.3871 12.7442 37.84 13.7633 38.184L22.7639 41.2284C23.7831 41.5725 24.3302 42.6778 23.986 43.699Z" fill="#FF0000" />
                <path d="M31.8549 42.5654C30.0526 40.5667 28.7599 38.1026 28.1797 35.376C29.9665 37.3879 31.2549 39.8476 31.8549 42.5654Z" fill="#5700FF" />
              </g>
              <defs>
                <clipPath id="clip0_2093_338">
                  <rect width="138.995" height="62.17" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>

        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} id="menu-toggle-btn" aria-label="Toggle Menu" onClick={toggleMenu}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="11" width="47" height="10" rx="5" fill="#5700FF" />
            <rect x="2" y="29" width="47" height="10" rx="5" fill="#5700FF" />
          </svg>
        </button>
      </header>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} id="nav-dropdown">
        <ul className="nav-links">
          <li><Link href="#hero" className="nav-link" onClick={closeMenu}>Books</Link></li>
          <li><Link href="/coming-soon" className="nav-link" onClick={closeMenu}>Insights</Link></li>
          <li><Link href="/bookshop" className="nav-link" onClick={closeMenu}>Shops</Link></li>
        </ul>
      </nav>

      <main className="scroll-container" id="scroll-container" ref={scrollContainerRef}>
    <div className="scroll-track">

      {/* 1. HERO SECTION */}
      <section className="section hero" id="hero">
        <div className="hero-copy">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                fill="black" />
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">NEW BOOK AVAILABLE FOR PRE-ORDER</div>
          </div>
          <div className="hero-header">
            <h1 className="hero-title"><span className="hero-line1">Life beyond</span><br /><span className="hero-line2">the job
                title.</span></h1>
            <p className="hero-desc">Out of Office is not a book about work. It is a playbook for navigating failed ventures,
              difficult transitions, and the courage to reinvent yourself, so you can step into the most meaningful season
              of your life.'</p>
          </div>
          <a href="/coming-soon" className="btn-cta btn-hero-cta">Pre-order Now</a>
        </div>

        <div className="hero-image-container">
          <img src="hero-book.png" alt="Out of Office Book Cover" className="hero-book-img" />
        </div>
      </section>

      {/* 2. "THERE IS MORE" SECTION */}
      <section className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max relative pt-[5rem] max-lg:flex-col max-lg:gap-[30px]" id="there-is-more">
        <div className="h-full flex -ml-[215px] max-lg:w-full max-lg:ml-0 max-lg:h-auto">
          <h2 className="font-serif text-[80px] font-bold italic leading-[1.1] text-[var(--color-purple-dark)] max-w-[630px] max-lg:text-[38px] max-lg:leading-[1.2] max-lg:max-w-full">"There is <span className="text-[var(--color-purple)]">more to life</span> than what you do for work."
          </h2>
        </div>

        <div className="w-[580px] px-[48px] pl-[60px] flex flex-col h-full max-lg:w-full max-lg:p-0 max-lg:h-auto">
          <p className="font-sans text-[16px] font-light leading-[1.6] text-[var(--color-purple-dark)] max-lg:text-[16px]">This is a playbook for young professionals, entrepreneurs, emerging leaders and leaders
            across every space of life who are ready to take bold steps with their future. It offers unconventional
            wisdom on how work really works, how life really unfolds, and what it takes to navigate both with clarity,
            courage and intent.<br /><br />Inside are hard earned insights on transitions, ambition, failure and
            reinvention. It is a guide for those who refuse to drift through life and are ready to make deliberate moves
            that shape meaningful work, grounded success and a life that actually reflects who they are becoming.</p>
        </div>

        <div className="absolute left-[260px] top-[240px] w-[300px] h-[300px] pointer-events-none z-[10] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:w-full max-lg:py-[20px] max-lg:h-auto">
          <img src="screenshots/brand_ornament.svg" alt="Brand Ornament" className="w-full h-full object-unset" />
        </div>
      </section>

      {/* 3. BEYOND THE BOOK SECTION */}
      <section className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max flex-col pr-[60px] max-lg:w-full max-lg:p-[60px_24px] max-lg:h-auto max-lg:border-r-0 max-lg:border-b max-lg:border-[var(--color-grey-border)] max-lg:flex" id="beyond-the-book">
        <div className="pl-[60px] mb-[24px] max-lg:pl-0 max-lg:mb-[30px]">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                fill="black" />
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">BEYOND THE BOOK</div>
          </div>
          <h2 className="font-serif text-[36px] font-bold text-[var(--color-purple-dark)] max-lg:text-[36px]">The OUT OF OFFICE <span className="text-[var(--color-purple)]">Experience</span></h2>
        </div>

        <div className="flex gap-[24px] pl-[60px] max-lg:flex-col max-lg:p-0 max-lg:gap-[30px]">
          {/* Card 1: Community */}
          <a href="/coming-soon" className="group w-[240px] h-auto no-underline text-[var(--color-purple-dark)] flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto">
            <div className="relative w-[240px] h-[200px] max-lg:w-full max-lg:h-[280px]">
              <svg className="w-full h-full block overflow-visible" viewBox="0 0 240 200">
                <defs>
                  <clipPath id="beyond-clip-1">
                    <path d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#beyond-clip-1)">
                  <image href="screenshots/beyond-community.webp" x="0" y="0" width="240" height="200" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
                </g>
                <path className="fill-none stroke-transparent stroke-[3px] transition-stroke duration-[0.3s] ease-[ease] pointer-events-none group-hover:stroke-[var(--color-purple)]" d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
              </svg>
              <span className="absolute bottom-[6px] right-[6px] w-[46px] h-[32px] bg-[#18063a] rounded-[16px] flex items-center justify-center transition-background duration-300 ease-[ease] group-hover:bg-[var(--color-purple)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 19L21 12L14 5" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg></span>
            </div>
            <div className="pt-[24px]">
              <h3 className="font-serif text-[20px] font-bold text-black mb-[8px] max-lg:text-[28px]">Out of Office Community</h3>
              <p className="font-sans text-[13px] font-light leading-[1.5] text-[var(--color-purple-dark)]">Join a growing space for thinkers, builders, and bold professionals who are
                redefining success beyond the desk.</p>
            </div>
          </a>

          {/* Card 2: Podcast */}
          <a href="/coming-soon" className="group w-[240px] h-auto no-underline text-[var(--color-purple-dark)] flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto">
            <div className="relative w-[240px] h-[200px] max-lg:w-full max-lg:h-[280px]">
              <svg className="w-full h-full block overflow-visible" viewBox="0 0 240 200">
                <defs>
                  <clipPath id="beyond-clip-2">
                    <path d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#beyond-clip-2)">
                  <image href="screenshots/beyond-podcast.webp" x="0" y="0" width="240" height="200" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
                </g>
                <path className="fill-none stroke-transparent stroke-[3px] transition-stroke duration-[0.3s] ease-[ease] pointer-events-none group-hover:stroke-[var(--color-purple)]" d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
              </svg>
              <span className="absolute bottom-[6px] right-[6px] w-[46px] h-[32px] bg-[#18063a] rounded-[16px] flex items-center justify-center transition-background duration-300 ease-[ease] group-hover:bg-[var(--color-purple)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 19L21 12L14 5" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg></span>
            </div>
            <div className="pt-[24px]">
              <h3 className="font-serif text-[20px] font-bold text-black mb-[8px] max-lg:text-[28px]">Out of Office Podcast</h3>
              <p className="font-sans text-[13px] font-light leading-[1.5] text-[var(--color-purple-dark)]">Real conversations on work, life, purpose, and the in between. Stories from
                people who stepped outside the expected.</p>
            </div>
          </a>

          {/* Card 3: Tour */}
          <a href="/coming-soon" className="group w-[240px] h-auto no-underline text-[var(--color-purple-dark)] flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto">
            <div className="relative w-[240px] h-[200px] max-lg:w-full max-lg:h-[280px]">
              <svg className="w-full h-full block overflow-visible" viewBox="0 0 240 200">
                <defs>
                  <clipPath id="beyond-clip-3">
                    <path d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#beyond-clip-3)">
                  <image href="screenshots/beyond-tours.webp" x="0" y="0" width="240" height="200" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
                </g>
                <path className="fill-none stroke-transparent stroke-[3px] transition-stroke duration-[0.3s] ease-[ease] pointer-events-none group-hover:stroke-[var(--color-purple)]" d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
              </svg>
              <span className="absolute bottom-[6px] right-[6px] w-[46px] h-[32px] bg-[#18063a] rounded-[16px] flex items-center justify-center transition-background duration-300 ease-[ease] group-hover:bg-[var(--color-purple)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 19L21 12L14 5" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg></span>
            </div>
            <div className="pt-[24px]">
              <h3 className="font-serif text-[20px] font-bold text-black mb-[8px] max-lg:text-[28px]">Out of Office Tour</h3>
              <p className="font-sans text-[13px] font-light leading-[1.5] text-[var(--color-purple-dark)]">A live experience that moves across cities, gathering leaders to rethink life,
                work, and what it means to truly live fully.</p>
            </div>
          </a>

          {/* Card 4: Newsletter */}
          <a href="/coming-soon" className="group w-[240px] h-auto no-underline text-[var(--color-purple-dark)] flex flex-col transition-transform duration-300 ease-[ease] max-lg:w-full max-lg:h-auto">
            <div className="relative w-[240px] h-[200px] max-lg:w-full max-lg:h-[280px]">
              <svg className="w-full h-full block overflow-visible" viewBox="0 0 240 200">
                <defs>
                  <clipPath id="beyond-clip-4">
                    <path d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#beyond-clip-4)">
                  <image href="screenshots/beyond-newsletter.webp" x="0" y="0" width="240" height="200" preserveAspectRatio="xMidYMid slice" className="transition-transform duration-[0.6s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-center group-hover:scale-[1.05]" />
                </g>
                <path className="fill-none stroke-transparent stroke-[3px] transition-stroke duration-[0.3s] ease-[ease] pointer-events-none group-hover:stroke-[var(--color-purple)]" d="M 14,0 H 226 A 14,14 0 0 1 240,14 V 138 A 12,12 0 0 1 228,150 H 191 A 16,16 0 0 0 175,166 V 188 A 12,12 0 0 1 163,200 H 14 A 14,14 0 0 1 0,186 V 14 A 14,14 0 0 1 14,0 Z" />
              </svg>
              <span className="absolute bottom-[6px] right-[6px] w-[46px] h-[32px] bg-[#18063a] rounded-[16px] flex items-center justify-center transition-background duration-300 ease-[ease] group-hover:bg-[var(--color-purple)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 19L21 12L14 5" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg></span>
            </div>
            <div className="pt-[24px]">
              <h3 className="font-serif text-[20px] font-bold text-black mb-[8px] max-lg:text-[28px]">Out of Office Newsletter</h3>
              <p className="font-sans text-[13px] font-light leading-[1.5] text-[var(--color-purple-dark)]">A weekly dose of unconventional wisdom, honest insights, and practical
                perspective for people choosing a different path.</p>
            </div>
          </a>
        </div>
      </section>

      {/* 4. SHOP SECTION */}
      <section className="section shop" id="shop">
        <div className="shop-header">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                fill="black" />
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">THE SHOP</div>
          </div>
          <div className="shop-title-row">
            <h2 className="shop-title">Wear the <span className="text-[var(--color-purple)]">movement</span></h2>
            <a href="/coming-soon" className="btn-shop-now">Shop Now</a>
          </div>
        </div>

        <div className="shop-slider">
          {/* Item 1: Journal */}
          <div className="shop-card card-journal">
            <h3 className="font-ui text-[24px] font-semibold text-[var(--color-purple-dark)] self-start max-lg:text-[28px]">Planner/Journal</h3>
            <div className="absolute pointer-events-none left-[70px] top-[70px] max-lg:h-[180px] max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto">
              <img src="product-journal.png" alt="Planner/Journal" className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110" />
            </div>
            <div className="hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]">
              <span className="font-ui text-[16px] font-semibold text-[var(--color-purple-dark)] underline decoration-[var(--color-purple-dark)] decoration-2 underline-offset-[6px]">₦20,000</span>
              <button className="w-[45px] h-[45px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 ease group-cart-hover:scale-[1.05] [&>svg]:w-full [&>svg]:h-full [&_rect]:fill-white [&_rect]:transition-fill [&_rect]:duration-300 [&_path]:fill-[var(--color-purple)] [&_path]:transition-fill [&_path]:duration-300 hover:[&_rect]:fill-[var(--color-purple-dark)] hover:[&_path]:fill-white" aria-label="Add to cart">
                <svg width="100" height="65" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="65" rx="32.5" />
                  <path
                    d="M60.5 25H56V23.5C56 21.9087 55.3679 20.3826 54.2426 19.2574C53.1174 18.1321 51.5913 17.5 50 17.5C48.4087 17.5 46.8826 18.1321 45.7574 19.2574C44.6321 20.3826 44 21.9087 44 23.5V25H39.5C39.1022 25 38.7206 25.158 38.4393 25.4393C38.158 25.7206 38 26.1022 38 26.5V43C38 44.1935 38.4741 45.3381 39.318 46.182C40.1619 47.0259 41.3065 47.5 42.5 47.5H57.5C58.6935 47.5 59.8381 47.0259 60.682 46.182C61.5259 45.3381 62 44.1935 62 43V26.5C62 26.1022 61.842 25.7206 61.5607 25.4393C61.2794 25.158 60.8978 25 60.5 25ZM47 23.5C47 22.7044 47.3161 21.9413 47.8787 21.3787C48.4413 20.8161 49.2044 20.5 50 20.5C50.7956 20.5 51.5587 20.8161 52.1213 21.3787C52.6839 21.9413 53 22.7044 53 23.5V25H47V23.5ZM59 43C59 43.3978 58.842 43.7794 58.5607 44.0607C58.2794 44.342 57.8978 44.5 57.5 44.5H42.5C42.1022 44.5 41.7206 44.342 41.4393 44.0607C41.158 43.7794 41 43.3978 41 43V28H44V29.5C44 29.8978 44.158 30.2794 44.4393 30.5607C44.7206 30.842 45.1022 31 45.5 31C45.8978 31 46.2794 30.842 46.5607 30.5607C46.842 30.2794 47 29.8978 47 29.5V28H53V29.5C53 29.8978 53.158 30.2794 53.4393 30.5607C53.7206 30.842 54.1022 31 54.5 31C54.8978 31 55.2794 30.842 55.5607 30.5607C55.842 30.2794 56 29.8978 56 29.5V28H59V43Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Item 2: T-Shirt */}
          <div className="shop-card card-tshirt">
            <h3 className="font-ui text-[24px] font-semibold text-[var(--color-purple-dark)] self-start max-lg:text-[28px]">T-Shirt</h3>
            <div className="absolute pointer-events-none left-[65px] top-[79px] max-lg:h-[180px] max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto">
              <img src="product-tshirt.png" alt="T-Shirt" className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110" />
            </div>
            <div className="hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]">
              <span className="font-ui text-[16px] font-semibold text-[var(--color-purple-dark)] underline decoration-[var(--color-purple-dark)] decoration-2 underline-offset-[6px]">₦20,000</span>
              <button className="w-[45px] h-[45px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 ease group-cart-hover:scale-[1.05] [&>svg]:w-full [&>svg]:h-full [&_rect]:fill-white [&_rect]:transition-fill [&_rect]:duration-300 [&_path]:fill-[var(--color-purple)] [&_path]:transition-fill [&_path]:duration-300 hover:[&_rect]:fill-[var(--color-purple-dark)] hover:[&_path]:fill-white" aria-label="Add to cart">
                <svg width="100" height="65" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="65" rx="32.5" />
                  <path
                    d="M60.5 25H56V23.5C56 21.9087 55.3679 20.3826 54.2426 19.2574C53.1174 18.1321 51.5913 17.5 50 17.5C48.4087 17.5 46.8826 18.1321 45.7574 19.2574C44.6321 20.3826 44 21.9087 44 23.5V25H39.5C39.1022 25 38.7206 25.158 38.4393 25.4393C38.158 25.7206 38 26.1022 38 26.5V43C38 44.1935 38.4741 45.3381 39.318 46.182C40.1619 47.0259 41.3065 47.5 42.5 47.5H57.5C58.6935 47.5 59.8381 47.0259 60.682 46.182C61.5259 45.3381 62 44.1935 62 43V26.5C62 26.1022 61.842 25.7206 61.5607 25.4393C61.2794 25.158 60.8978 25 60.5 25ZM47 23.5C47 22.7044 47.3161 21.9413 47.8787 21.3787C48.4413 20.8161 49.2044 20.5 50 20.5C50.7956 20.5 51.5587 20.8161 52.1213 21.3787C52.6839 21.9413 53 22.7044 53 23.5V25H47V23.5ZM59 43C59 43.3978 58.842 43.7794 58.5607 44.0607C58.2794 44.342 57.8978 44.5 57.5 44.5H42.5C42.1022 44.5 41.7206 44.342 41.4393 44.0607C41.158 43.7794 41 43.3978 41 43V28H44V29.5C44 29.8978 44.158 30.2794 44.4393 30.5607C44.7206 30.842 45.1022 31 45.5 31C45.8978 31 46.2794 30.842 46.5607 30.5607C46.842 30.2794 47 29.8978 47 29.5V28H53V29.5C53 29.8978 53.158 30.2794 53.4393 30.5607C53.7206 30.842 54.1022 31 54.5 31C54.8978 31 55.2794 30.842 55.5607 30.5607C55.842 30.2794 56 29.8978 56 29.5V28H59V43Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Item 3: Hoodie */}
          <div className="shop-card card-hoodie">
            <h3 className="font-ui text-[24px] font-semibold text-[var(--color-purple-dark)] self-start max-lg:text-[28px]">Hoodie</h3>
            <div className="absolute pointer-events-none -left-[15px] -top-[14px] max-lg:h-[180px] max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto">
              <img src="product-hoodie.png" alt="Hoodie" className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110" />
            </div>
            <div className="hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]">
              <span className="font-ui text-[16px] font-semibold text-[var(--color-purple-dark)] underline decoration-[var(--color-purple-dark)] decoration-2 underline-offset-[6px]">₦20,000</span>
              <button className="w-[45px] h-[45px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 ease group-cart-hover:scale-[1.05] [&>svg]:w-full [&>svg]:h-full [&_rect]:fill-white [&_rect]:transition-fill [&_rect]:duration-300 [&_path]:fill-[var(--color-purple)] [&_path]:transition-fill [&_path]:duration-300 hover:[&_rect]:fill-[var(--color-purple-dark)] hover:[&_path]:fill-white" aria-label="Add to cart">
                <svg width="100" height="65" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="65" rx="32.5" />
                  <path
                    d="M60.5 25H56V23.5C56 21.9087 55.3679 20.3826 54.2426 19.2574C53.1174 18.1321 51.5913 17.5 50 17.5C48.4087 17.5 46.8826 18.1321 45.7574 19.2574C44.6321 20.3826 44 21.9087 44 23.5V25H39.5C39.1022 25 38.7206 25.158 38.4393 25.4393C38.158 25.7206 38 26.1022 38 26.5V43C38 44.1935 38.4741 45.3381 39.318 46.182C40.1619 47.0259 41.3065 47.5 42.5 47.5H57.5C58.6935 47.5 59.8381 47.0259 60.682 46.182C61.5259 45.3381 62 44.1935 62 43V26.5C62 26.1022 61.842 25.7206 61.5607 25.4393C61.2794 25.158 60.8978 25 60.5 25ZM47 23.5C47 22.7044 47.3161 21.9413 47.8787 21.3787C48.4413 20.8161 49.2044 20.5 50 20.5C50.7956 20.5 51.5587 20.8161 52.1213 21.3787C52.6839 21.9413 53 22.7044 53 23.5V25H47V23.5ZM59 43C59 43.3978 58.842 43.7794 58.5607 44.0607C58.2794 44.342 57.8978 44.5 57.5 44.5H42.5C42.1022 44.5 41.7206 44.342 41.4393 44.0607C41.158 43.7794 41 43.3978 41 43V28H44V29.5C44 29.8978 44.158 30.2794 44.4393 30.5607C44.7206 30.842 45.1022 31 45.5 31C45.8978 31 46.2794 30.842 46.5607 30.5607C46.842 30.2794 47 29.8978 47 29.5V28H53V29.5C53 29.8978 53.158 30.2794 53.4393 30.5607C53.7206 30.842 54.1022 31 54.5 31C54.8978 31 55.2794 30.842 55.5607 30.5607C55.842 30.2794 56 29.8978 56 29.5V28H59V43Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Item 4: Cap */}
          <div className="shop-card card-cap">
            <h3 className="font-ui text-[24px] font-semibold text-[var(--color-purple-dark)] self-start max-lg:text-[28px]">Cap</h3>
            <div className="absolute pointer-events-none left-[35px] top-[55px] max-lg:h-[180px] max-lg:static max-lg:left-auto max-lg:top-auto max-lg:pointer-events-auto">
              <img src="product-cap.png" alt="Cap" className="w-full h-full object-contain block transition-transform duration-300 ease group-hover:scale-110" />
            </div>
            <div className="hidden max-lg:flex max-lg:justify-between max-lg:items-center max-lg:w-full max-lg:pt-[24px]">
              <span className="font-ui text-[16px] font-semibold text-[var(--color-purple-dark)] underline decoration-[var(--color-purple-dark)] decoration-2 underline-offset-[6px]">₦20,000</span>
              <button className="w-[45px] h-[45px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 ease group-cart-hover:scale-[1.05] [&>svg]:w-full [&>svg]:h-full [&_rect]:fill-white [&_rect]:transition-fill [&_rect]:duration-300 [&_path]:fill-[var(--color-purple)] [&_path]:transition-fill [&_path]:duration-300 hover:[&_rect]:fill-[var(--color-purple-dark)] hover:[&_path]:fill-white" aria-label="Add to cart">
                <svg width="100" height="65" viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="65" rx="32.5" />
                  <path
                    d="M60.5 25H56V23.5C56 21.9087 55.3679 20.3826 54.2426 19.2574C53.1174 18.1321 51.5913 17.5 50 17.5C48.4087 17.5 46.8826 18.1321 45.7574 19.2574C44.6321 20.3826 44 21.9087 44 23.5V25H39.5C39.1022 25 38.7206 25.158 38.4393 25.4393C38.158 25.7206 38 26.1022 38 26.5V43C38 44.1935 38.4741 45.3381 39.318 46.182C40.1619 47.0259 41.3065 47.5 42.5 47.5H57.5C58.6935 47.5 59.8381 47.0259 60.682 46.182C61.5259 45.3381 62 44.1935 62 43V26.5C62 26.1022 61.842 25.7206 61.5607 25.4393C61.2794 25.158 60.8978 25 60.5 25ZM47 23.5C47 22.7044 47.3161 21.9413 47.8787 21.3787C48.4413 20.8161 49.2044 20.5 50 20.5C50.7956 20.5 51.5587 20.8161 52.1213 21.3787C52.6839 21.9413 53 22.7044 53 23.5V25H47V23.5ZM59 43C59 43.3978 58.842 43.7794 58.5607 44.0607C58.2794 44.342 57.8978 44.5 57.5 44.5H42.5C42.1022 44.5 41.7206 44.342 41.4393 44.0607C41.158 43.7794 41 43.3978 41 43V28H44V29.5C44 29.8978 44.158 30.2794 44.4393 30.5607C44.7206 30.842 45.1022 31 45.5 31C45.8978 31 46.2794 30.842 46.5607 30.5607C46.842 30.2794 47 29.8978 47 29.5V28H53V29.5C53 29.8978 53.158 30.2794 53.4393 30.5607C53.7206 30.842 54.1022 31 54.5 31C54.8978 31 55.2794 30.842 55.5607 30.5607C55.842 30.2794 56 29.8978 56 29.5V28H59V43Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUTHOR SECTION */}
      <section className="h-full shrink-0 inline-flex align-top whitespace-normal min-w-[100vw] w-max pr-[60px] pb-[15px] relative max-lg:flex-col max-lg:w-full max-lg:p-[60px_24px] max-lg:h-auto max-lg:border-r-0 max-lg:border-b max-lg:border-[var(--color-grey-border)] max-lg:flex max-lg:gap-[40px]" id="author">
        <div className="w-[450px] p-[16px_0_64px_60px] flex flex-col justify-center h-full z-[1] shrink-0 max-lg:w-full max-lg:p-0 max-lg:h-auto">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                fill="black" />
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">THE AUTHOR</div>
          </div>
          <h2 className="font-serif text-[56px] font-bold leading-[1.08] text-[var(--color-purple-dark)] mb-[16px] max-lg:text-[48px] max-lg:mb-[20px]"><span className="text-[#21015F]">Solomon</span><br /><span
              className="text-[#5700FF] italic">Ayodele</span></h2>
          <p className="font-sans text-[16px] font-light leading-[1.68] text-[var(--color-purple-dark)] max-lg:text-[18px]">Solomon O. Ayodele is one of Africa's leading voices where innovation, leadership, and
            social transformation converge. With over a decade of experience in product and technology within the
            banking and financial technology ecosystem, he has built a reputation for designing and scaling
            customer-centered solutions, leading high-impact teams, and driving meaningful business transformation where
            people, product, process, and technology meet.</p>
        </div>

        <div className="w-[400px] h-[480px] relative -top-[4px] -ml-[35px] z-[2] shrink-0 flex items-center justify-center max-lg:w-full max-lg:py-[20px] max-lg:h-auto max-lg:ml-0 max-lg:top-0">
          <div className="w-full h-full bg-transparent overflow-hidden flex items-center justify-center max-lg:max-w-[320px] max-lg:h-[420px] max-lg:mx-auto">
            <img src="author-portrait.png" alt="Solomon Ayodele" className="w-full h-full object-cover block" />
          </div>
        </div>

        <div className="w-[800px] flex gap-[32px] h-full z-[1] shrink-0 max-lg:w-full max-lg:flex-col max-lg:p-0 max-lg:gap-[30px] max-lg:h-auto">
          <div className="w-[380px] flex flex-col max-lg:w-full">
            <p className="font-sans text-[16px] font-light leading-[1.68] text-justify text-[var(--color-purple-dark)] max-lg:text-[18px]">His professional journey spans critical roles such as his time at Standard Bank
              Group, where he contributed to advancing digital strategy, led end-to-end product development, facilitated
              enterprise-wide design thinking, and forged strategic partnerships that strengthened innovation culture
              across the organization. He currently leads as Head of Product & Technology Innovation at Wema Bank Plc,
              and serves as an advisory board member of three high-growth startups across Africa spanning health, legal,
              and financial services.
            </p>
            <p className="font-sans text-[16px] font-light leading-[1.68] text-justify text-[var(--color-purple-dark)] max-lg:text-[18px]" style={{ paddingTop: '10px' }}>
              Beyond the boardroom, Solomon is the Founder of Boys Quarters Africa, a pioneering social movement
              committed to raising a generation of emotionally grounded, socially responsible, and purpose-driven boys
              and men.
            </p>
          </div>

          <div className="w-[380px] flex flex-col max-lg:w-full">
            <p className="font-sans text-[16px] font-light leading-[1.68] text-justify text-[var(--color-purple-dark)] max-lg:text-[18px]">Through this work, he has built a global platform for redefining masculinity and
              leadership, engaging over 2 million boys and men across Africa through grassroots programs, policy
              engagement, and community transformation initiatives.</p>
            <p className="font-sans text-[16px] font-light leading-[1.68] text-justify text-[var(--color-purple-dark)] max-lg:text-[18px]" style={{ paddingTop: '10px' }}>
              In recognition of his work, he is a two-time
              recipient of The Future Awards Africa Prize for Intrapreneurship and for Activism and Advocacy, reflecting
              both his influence within corporate innovation and his commitment to societal change. His life's work is
              driven by a clear conviction: to shape the future of Africa through his faith, voice and the enabling
              power of technology.
            </p>

            <div className="mt-auto flex flex-col gap-[6px] max-lg:mt-0 max-lg:gap-[16px]">
              <h4 className="font-sans text-[16px] font-medium leading-[1.68] text-[var(--color-purple-dark)] max-lg:text-[20px]">Connect with Solomon</h4>
              <div className="flex gap-[16px]">
                <a href="/coming-soon" className="group/social w-[42px] h-[36px] rounded-[18px] border border-[var(--color-purple)] bg-transparent text-[var(--color-purple)] flex items-center justify-center cursor-pointer no-underline transition-all duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:bg-[var(--color-purple)] hover:text-white hover:border-[var(--color-purple)] [&>svg]:w-[18px] [&>svg]:h-[18px] hover:[&_.ig-inner]:fill-[var(--color-purple)]" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.4491 20.4496H16.8931V14.8805C16.8931 13.5525 16.8694 11.8429 15.0436 11.8429C13.1915 11.8429 12.9081 13.2899 12.9081 14.7838V20.4492H9.35203V8.99689H12.7658V10.562H12.8136C13.1553 9.97782 13.649 9.49726 14.2421 9.17149C14.8352 8.84572 15.5056 8.68693 16.1819 8.71203C19.7861 8.71203 20.4506 11.0828 20.4506 14.167L20.4491 20.4496ZM5.33963 7.43144C4.93148 7.43151 4.53247 7.31055 4.19307 7.08385C3.85367 6.85715 3.58913 6.53489 3.43287 6.15783C3.27661 5.78077 3.23566 5.36584 3.31521 4.96551C3.39477 4.56517 3.59125 4.19743 3.8798 3.90876C4.16835 3.6201 4.53602 3.42348 4.93631 3.34378C5.3366 3.26408 5.75152 3.30488 6.12863 3.46101C6.50573 3.61713 6.82807 3.88158 7.05489 4.22091C7.2817 4.56025 7.40281 4.95922 7.40288 5.36738C7.40293 5.63839 7.34959 5.90675 7.24593 6.15715C7.14227 6.40754 6.99032 6.63507 6.79873 6.82674C6.60714 7.0184 6.37966 7.17045 6.1293 7.27421C5.87895 7.37796 5.61062 7.43139 5.33963 7.43144ZM7.11765 20.4496H3.5579V8.99689H7.11765V20.4496ZM22.222 0.00163516H1.77099C1.30681 -0.00360329 0.859518 0.175663 0.52744 0.500042C0.195362 0.824421 0.00566506 1.26737 0 1.73156V22.2681C0.00547117 22.7325 0.195057 23.1758 0.527123 23.5005C0.85919 23.8252 1.30658 24.0048 1.77099 23.9999H22.222C22.6873 24.0057 23.1359 23.8266 23.469 23.5019C23.8027 23.1772 23.9936 22.7334 24 22.2681V1.73008C23.9934 1.26497 23.8024 0.821515 23.469 0.497144C23.1356 0.172773 22.6871 -0.00598143 22.222 0.000152822"
                      fill="currentColor" />
                  </svg>
                </a>
                <a href="/coming-soon" className="author-social-btn author-social-btn--ig" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9727 -0.0625C6.94974 -0.0625 5.48072 -0.0573162 5.19517 -0.0336251C4.16438 0.0520814 3.52297 0.214427 2.82417 0.562428C2.28564 0.829924 1.86092 1.13998 1.44176 1.57463C0.678384 2.36727 0.21573 3.34244 0.0482458 4.50161C-0.0331772 5.06435 -0.0568685 5.17912 -0.0616795 8.05354C-0.0635257 9.01168 -0.0616795 10.2727 -0.0616795 11.964C-0.0616795 16.9843 -0.0561319 18.4522 -0.0320678 18.7373C0.0512104 19.7406 0.208508 20.3718 0.541621 21.0623C1.17824 22.384 2.39408 23.3762 3.82646 23.7464C4.32243 23.8741 4.87021 23.9445 5.57344 23.9778C5.87139 23.9907 8.90824 24 11.9469 24C14.9857 24 18.0244 23.9963 18.3149 23.9815C19.1292 23.9432 19.602 23.8797 20.1248 23.7445C21.5664 23.3725 22.7601 22.3951 23.4096 21.0549C23.7363 20.3811 23.9019 19.7258 23.9769 18.7748C23.9932 18.5675 24 15.262 24 11.9609C24 8.65922 23.9926 5.35979 23.9763 5.15246C23.9004 4.18618 23.7348 3.53644 23.3976 2.84967C23.121 2.28749 22.8138 1.86765 22.3678 1.43839C21.5718 0.677946 20.5984 0.215164 19.4384 0.0478253C18.8764 -0.0334431 18.7644 -0.0575071 15.8886 -0.0625H11.9727Z" fill="currentColor"/>
                    <path className="ig-inner" d="M11.9737 3.02734C9.54398 3.02734 9.23905 3.03796 8.28474 3.08136C7.3323 3.12494 6.68218 3.27561 6.11332 3.4967C5.5249 3.72504 5.02575 4.03048 4.52847 4.52758C4.03082 5.0245 3.72513 5.52327 3.49588 6.11108C3.27407 6.6797 3.1231 7.32952 3.08023 8.28088C3.03755 9.23448 3.02637 9.53937 3.02637 11.9673C3.02637 14.3953 3.03718 14.699 3.08042 15.6526C3.12422 16.6044 3.27501 17.254 3.49606 17.8224C3.72476 18.4104 4.03044 18.9092 4.5279 19.4061C5.02501 19.9034 5.52415 20.2096 6.1122 20.4379C6.68142 20.659 7.33174 20.8097 8.28399 20.8533C9.2383 20.8967 9.54304 20.9073 11.9726 20.9073C14.4025 20.9073 14.7065 20.8967 15.6609 20.8533C16.6133 20.8097 17.2642 20.659 17.8334 20.4379C18.4216 20.2096 18.92 19.9034 19.4171 19.4061C19.9148 18.9092 20.2205 18.4104 20.4497 17.8226C20.6696 17.254 20.8206 16.6042 20.8654 15.6528C20.9082 14.6992 20.9194 14.3953 20.9194 11.9673C20.9194 9.53936 20.9082 9.23467 20.8654 8.28107C20.8206 7.32933 20.6696 6.6797 20.4497 6.11127C20.2205 5.52327 19.9148 5.02449 19.4171 4.52758C18.9195 4.03029 18.4218 3.72485 17.8328 3.49669C17.2625 3.27561 16.612 3.12494 15.6596 3.08136C14.7052 3.03796 14.4014 3.02734 11.9709 3.02734H11.9737ZM11.1711 4.6384C11.4093 4.63803 11.6751 4.6384 11.9737 4.6384C14.3625 4.6384 14.6456 4.64697 15.5889 4.68981C16.4612 4.72967 16.9346 4.87531 17.25 4.99767C17.6675 5.15971 17.9652 5.35341 18.2781 5.66631C18.5912 5.97921 18.7851 6.27721 18.9476 6.69441C19.0701 7.00917 19.216 7.48224 19.2557 8.35389C19.2986 9.29631 19.3079 9.57941 19.3079 11.9653C19.3079 14.3511 19.2986 14.6342 19.2557 15.5766C19.2158 16.4483 19.0701 16.9214 18.9476 17.2361C18.7855 17.6533 18.5912 17.9504 18.2781 18.2631C17.965 18.576 17.6677 18.7697 17.25 18.9317C16.935 19.0547 16.4612 19.1999 15.5889 19.2398C14.6458 19.2826 14.3625 19.2919 11.9737 19.2919C9.58479 19.2919 9.30167 19.2826 8.35855 19.2398C7.48626 19.1996 7.01284 19.0539 6.69728 18.9316C6.27977 18.7695 5.98154 18.5758 5.66842 18.2629C5.35528 17.95 5.16144 17.6528 4.99891 17.2354C4.87645 16.9206 4.73051 16.4475 4.69081 15.5759C4.64794 14.6335 4.63937 14.3504 4.63937 11.963C4.63937 9.57569 4.64794 9.29407 4.69081 8.35166C4.7307 7.48001 4.87645 7.00694 4.99891 6.6918C5.16106 6.2746 5.35528 5.9766 5.66842 5.66371C5.98154 5.3508 6.27977 5.15711 6.69728 4.9947C7.01265 4.87177 7.48626 4.7265 8.35855 4.68645C9.18387 4.6492 9.50372 4.63803 11.1711 4.63616V4.6384ZM16.7494 6.12281C16.1566 6.12281 15.6758 6.60278 15.6758 7.19523C15.6758 7.78751 16.1566 8.26803 16.7494 8.26803C17.3421 8.26803 17.823 7.78751 17.823 7.19523C17.823 6.60296 17.3421 6.12244 16.7494 6.12244V6.12281ZM11.9737 7.37626C9.43643 7.37626 7.37927 9.4319 7.37927 11.9673C7.37927 14.5027 9.43643 16.5574 11.9737 16.5574C14.511 16.5574 16.5674 14.5027 16.5674 11.9673C16.5674 9.4319 14.5108 7.37626 11.9735 7.37626H11.9737ZM11.9737 8.98733C13.6206 8.98733 14.9559 10.3214 14.9559 11.9673C14.9559 13.613 13.6206 14.9473 11.9737 14.9473C10.3266 14.9473 8.99152 13.613 8.99152 11.9673C8.99152 10.3214 10.3266 8.98733 11.9737 8.98733Z" fill="white"/>
                  </svg>
                </a>
                <a href="/coming-soon" className="group/social w-[42px] h-[36px] rounded-[18px] border border-[var(--color-purple)] bg-transparent text-[var(--color-purple)] flex items-center justify-center cursor-pointer no-underline transition-all duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:bg-[var(--color-purple)] hover:text-white hover:border-[var(--color-purple)] [&>svg]:w-[18px] [&>svg]:h-[18px] hover:[&_.ig-inner]:fill-[var(--color-purple)]" aria-label="X">
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.8431 0H22.4964L14.5169 9.1812L23.9384 21.6311H16.5358L10.7675 14.0843L4.13395 21.6311H0.480691L9.037 11.825L0 0H7.59492L12.8345 6.92195L18.8431 0ZM17.5452 19.4199H19.5641L6.48933 2.06697H4.27815L17.5452 19.4199Z"
                      fill="currentColor" />
                  </svg>
                </a>
                <a href="/coming-soon" className="group/social w-[42px] h-[36px] rounded-[18px] border border-[var(--color-purple)] bg-transparent text-[var(--color-purple)] flex items-center justify-center cursor-pointer no-underline transition-all duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:bg-[var(--color-purple)] hover:text-white hover:border-[var(--color-purple)] [&>svg]:w-[18px] [&>svg]:h-[18px] hover:[&_.ig-inner]:fill-[var(--color-purple)]" aria-label="Website">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.92531 22.3951C6.89031 22.3951 6.84365 22.4185 6.80865 22.4185C4.54531 21.2985 2.70198 19.4435 1.57031 17.1801C1.57031 17.1451 1.59365 17.0985 1.59365 17.0635C3.01698 17.4835 4.48698 17.7985 5.94531 18.0435C6.20198 19.5135 6.50531 20.9718 6.92531 22.3951Z"
                      fill="currentColor" />
                    <path
                      d="M22.4299 17.1918C21.2749 19.5135 19.3499 21.3918 17.0049 22.5235C17.4482 21.0418 17.8215 19.5485 18.0665 18.0435C19.5365 17.7985 20.9832 17.4835 22.4065 17.0635C22.3949 17.1101 22.4299 17.1568 22.4299 17.1918Z"
                      fill="currentColor" />
                    <path
                      d="M22.5232 6.9949C21.0532 6.55156 19.5715 6.1899 18.0665 5.93323C17.8215 4.42823 17.4599 2.9349 17.0049 1.47656C19.4199 2.63156 21.3682 4.5799 22.5232 6.9949Z"
                      fill="currentColor" />
                    <path
                      d="M6.9249 1.60531C6.5049 3.02865 6.20156 4.47531 5.95656 5.94531C4.45156 6.17865 2.95823 6.55198 1.47656 6.99531C2.60823 4.65031 4.48656 2.72531 6.80823 1.57031C6.84323 1.57031 6.8899 1.60531 6.9249 1.60531Z"
                      fill="currentColor" />
                    <path
                      d="M16.072 5.68801C13.3654 5.38467 10.6354 5.38467 7.92871 5.68801C8.22038 4.08967 8.59371 2.49134 9.11871 0.951341C9.14204 0.858008 9.13038 0.788008 9.14204 0.694674C10.0637 0.473008 11.0087 0.333008 12.0004 0.333008C12.9804 0.333008 13.937 0.473008 14.847 0.694674C14.8587 0.788008 14.8587 0.858008 14.882 0.951341C15.407 2.50301 15.7804 4.08967 16.072 5.68801Z"
                      fill="currentColor" />
                    <path
                      d="M5.68801 16.072C4.07801 15.7804 2.49134 15.407 0.951341 14.882C0.858008 14.8587 0.788008 14.8704 0.694674 14.8587C0.473008 13.937 0.333008 12.992 0.333008 12.0004C0.333008 11.0204 0.473008 10.0637 0.694674 9.15371C0.788008 9.14204 0.858008 9.14204 0.951341 9.11871C2.50301 8.60538 4.07801 8.22038 5.68801 7.92871C5.39634 10.6354 5.39634 13.3654 5.68801 16.072Z"
                      fill="currentColor" />
                    <path
                      d="M23.6665 12.0004C23.6665 12.992 23.5265 13.937 23.3049 14.8587C23.2115 14.8704 23.1415 14.8587 23.0482 14.882C21.4965 15.3954 19.9099 15.7804 18.3115 16.072C18.6149 13.3654 18.6149 10.6354 18.3115 7.92871C19.9099 8.22038 21.5082 8.59371 23.0482 9.11871C23.1415 9.14204 23.2115 9.15371 23.3049 9.15371C23.5265 10.0754 23.6665 11.0204 23.6665 12.0004Z"
                      fill="currentColor" />
                    <path
                      d="M16.072 18.3115C15.7804 19.9215 15.407 21.5082 14.882 23.0482C14.8587 23.1415 14.8587 23.2115 14.847 23.3049C13.937 23.5265 12.9804 23.6665 12.0004 23.6665C11.0087 23.6665 10.0637 23.5265 9.14204 23.3049C9.13038 23.2115 9.14204 23.1415 9.11871 23.0482C8.60538 21.4965 8.22038 19.9215 7.92871 18.3115C9.28204 18.4632 10.6354 18.5682 12.0004 18.5682C13.3654 18.5682 14.7304 18.4632 16.072 18.3115Z"
                      fill="currentColor" />
                    <path
                      d="M16.3902 16.3902C13.4723 16.7584 10.5271 16.7584 7.60912 16.3902C7.24097 13.4723 7.24097 10.5271 7.60912 7.60912C10.5271 7.24097 13.4723 7.24097 16.3902 7.60912C16.7584 10.5271 16.7584 13.4723 16.3902 16.3902Z"
                      fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER SECTION */}
      <section className="inline-flex min-w-[100vw] w-max h-full max-lg:p-[60px_24px] max-lg:h-auto" id="newsletter">
        <div className="w-full px-[60px] flex flex-col h-full max-lg:p-0">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z" fill="black"/>
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">THE NEWSLETTER</div>
          </div>
          <div className="max-w-[500px]">
            <h2 className="font-serif text-[64px] font-bold leading-[1.08] text-[var(--color-purple-dark)] mb-[16px] max-lg:text-[48px] max-lg:leading-[1.1]"><span style={{ color: "#21015F" }}>Stay in</span> <span style={{ color: "#5700FF" }}>the loop</span></h2>
            <p className="font-sans text-[16px] font-light leading-[1.68] text-[var(--color-purple-dark)] mb-[24px] max-lg:text-[18px]">Join thousands of readers who get weekly reflections on purpose, identity, and what
              it means to live a full life.</p>
          </div>

          <form className="flex flex-col gap-[24px] items-start max-lg:w-full" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }}>
            <input type="email" placeholder="Your email address" className="w-[400px] h-[50px] rounded-[40px] max-lg:w-full border border-[var(--color-purple-dark)] px-[24px] font-sans text-[14px] text-[var(--color-purple-dark)] bg-transparent outline-none transition-all duration-300 ease focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]" required />
            <button type="submit" className="inline-flex items-center justify-center w-[150px] h-[50px] py-[15px] rounded-[47px] bg-[#00CC8D] text-[var(--color-purple-dark)] font-ui text-[16px] font-medium tracking-[-0.02em] no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-[var(--color-purple)] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Subscribe</button>
          </form>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section className="inline-flex min-w-[100vw] w-max relative pr-[6rem] items-start h-full max-lg:flex-col max-lg:p-[60px_24px] max-lg:h-auto max-lg:w-full" id="contact">
        <div className="w-[460px] pl-[60px] flex flex-col shrink-0 max-lg:w-full max-lg:p-0 max-lg:h-auto">
          <div className="flex items-center gap-[10px] mb-[12px] max-lg:mb-[16px] max-lg:gap-[12px]">
            <svg className="" width="50" height="6" viewBox="0 0 50 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z" fill="black"/>
            </svg>
            <div className="font-serif text-[13px] font-bold text-[var(--color-purple-dark)]">GET IN TOUCH</div>
          </div>
          <h2 className="font-serif text-[64px] font-bold leading-[1.08] text-[var(--color-purple-dark)] mb-[24px] max-lg:text-[48px]">Let's <span className="text-[var(--color-purple)]">Talk</span></h2>

          <form className="flex flex-col gap-0 items-start max-lg:w-full" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <input type="text" placeholder="Your Name" className="w-[380px] h-[50px] mb-[16px] rounded-[40px] max-lg:w-full border border-[var(--color-purple-dark)] px-[24px] font-sans text-[14px] text-[var(--color-purple-dark)] bg-transparent outline-none transition-all duration-300 ease focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]" required />
            <input type="email" placeholder="Your email address" className="w-[380px] h-[50px] mb-[16px] rounded-[40px] max-lg:w-full border border-[var(--color-purple-dark)] px-[24px] font-sans text-[14px] text-[var(--color-purple-dark)] bg-transparent outline-none transition-all duration-300 ease focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]" required />
            <textarea placeholder="How can we help you?" className="w-[380px] h-[100px] mb-[24px] rounded-[20px] max-lg:w-full border border-[var(--color-purple-dark)] p-[20px_24px] font-sans text-[14px] text-[var(--color-purple-dark)] bg-transparent outline-none resize-none transition-all duration-300 ease focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]" required></textarea>
            <button type="submit" className="inline-flex items-center justify-center w-[150px] py-[15px] rounded-[47px] bg-[#00CC8D] text-[var(--color-purple-dark)] font-ui text-[14px] font-medium no-underline cursor-pointer overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:bg-[var(--color-purple)] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(87,0,255,0.2)]">Send Message</button>
          </form>
          <div className="mt-[24px] font-sans text-[13px] text-[var(--color-purple-dark)] opacity-60 max-lg:relative max-lg:bottom-auto max-lg:left-auto max-lg:mt-[40px] max-lg:pt-[20px] max-lg:border-t max-lg:border-[var(--color-grey-border)]">
            <p>© 2026 Solomon Ayodele · Out of Office</p>
          </div>
        </div>

        <div className="w-[320px] pl-[32px] pt-[64px] flex flex-col gap-[20px] shrink-0 max-lg:w-full max-lg:px-0 max-lg:pt-[40px] max-lg:h-auto max-lg:gap-[30px]">
          {/* Web detail */}
          <div className="flex items-center gap-[10px] max-lg:gap-[16px]">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-[var(--color-purple)] max-lg:w-[44px] max-lg:h-[44px] [&>svg]:w-[24px] [&>svg]:h-[24px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 8.99961C8.84 7.04961 15.16 7.04961 21 8.99961" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[16px] font-bold text-[var(--color-purple-dark)] leading-[1.2] max-lg:text-[18px]">Website</span>
              <a href="/coming-soon" className="font-serif text-[16px] font-medium text-[var(--color-purple)] no-underline transition-colors duration-300 ease hover:text-[var(--color-purple-dark)] max-lg:text-[16px]">www.solomonayodele.com</a>
            </div>
          </div>

          {/* Email detail */}
          <div className="flex items-center gap-[10px] max-lg:gap-[16px]">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-[var(--color-purple)] max-lg:w-[44px] max-lg:h-[44px] [&>svg]:w-[24px] [&>svg]:h-[24px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                  stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="currentColor"
                  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[16px] font-bold text-[var(--color-purple-dark)] leading-[1.2] max-lg:text-[18px]">Email</span>
              <a href="mailto:contact.solomonayodele@gmail.com" className="font-serif text-[16px] font-medium text-[var(--color-purple)] no-underline transition-colors duration-300 ease hover:text-[var(--color-purple-dark)] max-lg:text-[16px]">contact.solomonayodele@gmail.com</a>
              <a href="mailto:me@solomonayodele.com" className="font-serif text-[16px] font-medium text-[var(--color-purple)] no-underline transition-colors duration-300 ease hover:text-[var(--color-purple-dark)] max-lg:text-[16px]">me@solomonayodele.com</a>
            </div>
          </div>

          {/* Phone detail */}
          <div className="flex items-center gap-[10px] max-lg:gap-[16px]">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-[var(--color-purple)] max-lg:w-[44px] max-lg:h-[44px] [&>svg]:w-[24px] [&>svg]:h-[24px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7V17C20 21 19 22 15 22H9C5 22 4 21 4 17V7C4 3 5 2 9 2H15C19 2 20 3 20 7Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 5.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path
                  d="M12.0002 19.1C12.8562 19.1 13.5502 18.406 13.5502 17.55C13.5502 16.694 12.8562 16 12.0002 16C11.1442 16 10.4502 16.694 10.4502 17.55C10.4502 18.406 11.1442 19.1 12.0002 19.1Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[16px] font-bold text-[var(--color-purple-dark)] leading-[1.2] max-lg:text-[18px]">Phone</span>
              <a href="tel:+2347037373284" className="font-serif text-[16px] font-medium text-[var(--color-purple)] no-underline transition-colors duration-300 ease hover:text-[var(--color-purple-dark)] max-lg:text-[16px]">+234 703 737 3284</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>


    </>
  );
}