import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const date = new Date();
  let currentYear = date.getFullYear();

  return (
    <footer className="bg-gray-200 flex flex-col justify-center items-center text-center space-y-4 py-4 px-2">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={120} height={50} className="w-32 h-auto sm:w-24 md:w-28 lg:w-32" />
        </Link>
      </div>
      <div>
        <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/wrestlers" className="hover:underline me-4 md:me-6">
              Wrestlers
            </Link>
          </li>
          <li>
            <Link href="/catalog" className="hover:underline me-4 md:me-6">
              Catalogs
            </Link>
          </li>
          <li>
            <Link href="/support" className="hover:underline me-4 md:me-6">
              Support
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline me-4 md:me-6">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:underline me-4 md:me-6">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline me-4 md:me-6">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="flex justify-center items-center text-center">
          <Link
            className="px-3.5 inline-flex items-center gap-x-2 text-sm text-white decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="#"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="#039be5"
                d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
              ></path>
              <path
                fill="#fff"
                d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
              ></path>
            </svg>
          </Link>
          <Link
            className="px-3.5 inline-flex items-center gap-x-2 text-sm text-white decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="#"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="#212121"
                fillRule="evenodd"
                d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#fff"
                d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
              ></path>
              <polygon
                fill="#fff"
                points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
              ></polygon>
              <polygon
                fill="#fff"
                points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
              ></polygon>
            </svg>
          </Link>
          <Link
            className="px-3.5 inline-flex items-center gap-x-2 text-sm text-white decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="#"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FF3D00"
                d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
              ></path>
              <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
            </svg>
          </Link>
          <Link
            className="px-3.5 inline-flex items-center gap-x-2 text-sm text-white decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="#"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0,0,256,256"
            >
              <g
                fill="#fffafa"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M16,3c-7.16752,0 -13,5.83248 -13,13v18c0,7.16752 5.83248,13 13,13h18c7.16752,0 13,-5.83248 13,-13v-18c0,-7.16752 -5.83248,-13 -13,-13zM16,5h18c6.08648,0 11,4.91352 11,11v18c0,6.08648 -4.91352,11 -11,11h-18c-6.08648,0 -11,-4.91352 -11,-11v-18c0,-6.08648 4.91352,-11 11,-11zM37,11c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM25,14c-6.06329,0 -11,4.93671 -11,11c0,6.06329 4.93671,11 11,11c6.06329,0 11,-4.93671 11,-11c0,-6.06329 -4.93671,-11 -11,-11zM25,16c4.98241,0 9,4.01759 9,9c0,4.98241 -4.01759,9 -9,9c-4.98241,0 -9,-4.01759 -9,-9c0,-4.98241 4.01759,-9 9,-9z"></path>
                </g>
              </g>
            </svg>
          </Link>
        </p>
      </div>
      <div>
        <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">
          Copyright © {currentYear} by{" "}
          <Link href="/" className="hover:underline">
            WrestleStuds.com
          </Link>
          . All Rights Reserved. Website Development by Web Style Media, LLC
        </span>
      </div>
    </footer>
  );
}
