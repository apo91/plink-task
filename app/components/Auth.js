// @flow
import React from 'react';
import QRCode from 'qrcode.react';
// import { Link } from 'react-router-dom';
import styles from './Auth.css';
// import routes from '../constants/routes.json';

type Props = {
  qrSlug: string,
  qrConfirmationCountdown: number
};

export default ({ qrSlug, qrConfirmationCountdown }: Props) => (
  <div className={styles.container}>
    <div className={styles.spacer1} />
    <Logo />
    <div className={styles.spacer1} />
    <h2>Приветствуем, Plinker!</h2>
    <p>Отсканируйте QR-код через мобильное приложение</p>
    <div className={styles.spacer1} />
    <div className={styles.qrContainer}>
      {qrSlug && <QRCode value={qrSlug} renderAs="canvas" size={140} />}
    </div>
    <p>Обновление через {qrConfirmationCountdown}</p>
    <div className={styles.spacer1} />
    <a href="#">Как присоединить новое устройство?</a>
    <div className={styles.spacer2} />
    <div>Не можете отсканировать код?</div>
    <a href="#">Попробуйте другой способ</a>
    <div className={styles.spacer1} />
  </div>
);

function Logo() {
  return (
    <svg
      width="130"
      height="36"
      viewBox="0 0 130 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.264 20.616V28H72.898V9.66998H78.722C80.8194 9.66998 82.388 10.1596 83.428 11.139C84.468 12.1183 84.988 13.4573 84.988 15.156C84.988 16.872 84.4507 18.211 83.376 19.173C82.3013 20.135 80.75 20.616 78.722 20.616H75.264ZM78.514 18.64C79.9527 18.64 80.9883 18.3367 81.621 17.73C82.2537 17.1233 82.57 16.2653 82.57 15.156C82.57 14.012 82.2537 13.141 81.621 12.543C80.9883 11.945 79.9527 11.646 78.514 11.646H75.264V18.64H78.514ZM90.61 8.75998V28H88.244V8.75998H90.61ZM94.49 9.53998C94.49 9.10665 94.6373 8.75565 94.932 8.48698C95.2267 8.21832 95.6167 8.08398 96.102 8.08398C96.5873 8.08398 96.9773 8.21832 97.272 8.48698C97.5667 8.75565 97.714 9.10665 97.714 9.53998C97.714 9.97332 97.5667 10.3243 97.272 10.593C96.9773 10.8617 96.5873 10.996 96.102 10.996C95.6167 10.996 95.2267 10.8617 94.932 10.593C94.6373 10.3243 94.49 9.97332 94.49 9.53998ZM97.272 13.726V28H94.906V13.726H97.272ZM109.082 13.492C110.746 13.492 112.089 14.025 113.112 15.091C114.135 16.157 114.646 17.6953 114.646 19.706V28H112.28V19.914C112.28 18.4926 111.916 17.4007 111.188 16.638C110.46 15.8753 109.472 15.494 108.224 15.494C106.924 15.494 105.884 15.9143 105.104 16.755C104.324 17.5957 103.934 18.822 103.934 20.434V28H101.568V13.726H103.934V17.106C104.298 15.9446 104.944 15.052 105.871 14.428C106.798 13.804 107.869 13.492 109.082 13.492ZM126.612 28L121.152 21.578V28H118.786V8.75998H121.152V19.94L126.534 13.726H129.42L123.024 20.824L129.576 28H126.612Z"
        fill="#FAFAFA"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0203 5.7C11.1125 5.7 5.70644 11.1 5.70644 18C5.70644 24.9 11.1125 30.3 18.0203 30.3H27.0305V36H18.0203C8.10915 36 0 27.9 0 18C0 8.1 8.10915 0 18.0203 0H27.0305V5.7H18.0203ZM35.9052 20.85H24.1626V14.85H35.9052V20.85ZM41.9797 0H32.9695V5.7H41.9797C48.8875 5.7 54.2936 11.1 54.2936 18C54.2936 24.9 48.8876 30.3 41.9797 30.3H32.9695V36H41.9797C51.8909 36 60 27.9 60 18C60 8.1 51.8909 0 41.9797 0ZM16.329 16.1302H18.2213C19.1473 16.1302 19.872 16.8523 19.872 17.775C19.872 18.6977 19.1473 19.4198 18.2213 19.4198H16.329V21.3052C16.329 22.2279 15.6042 22.95 14.6782 22.95C13.7522 22.95 13.0275 22.2279 13.0275 21.3052V19.4198H11.1351C10.2091 19.4198 9.48438 18.6977 9.48438 17.775C9.48438 16.8523 10.2091 16.1302 11.1351 16.1302H13.0275V14.2448C13.0275 13.3221 13.7522 12.6 14.6782 12.6C15.6042 12.6 16.329 13.3221 16.329 14.2448V16.1302ZM42.5633 17.768C43.9956 17.768 45.1567 16.6111 45.1567 15.184C45.1567 13.7569 43.9956 12.6 42.5633 12.6C41.131 12.6 39.9699 13.7569 39.9699 15.184C39.9699 16.6111 41.131 17.768 42.5633 17.768ZM50.3505 20.359C50.3505 21.7861 49.1894 22.943 47.7571 22.943C46.3248 22.943 45.1637 21.7861 45.1637 20.359C45.1637 18.9319 46.3248 17.775 47.7571 17.775C49.1894 17.775 50.3505 18.9319 50.3505 20.359Z"
        fill="url(#paint0_linear)"
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="60"
        height="36"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0203 5.7C11.1125 5.7 5.70644 11.1 5.70644 18C5.70644 24.9 11.1125 30.3 18.0203 30.3H27.0305V36H18.0203C8.10915 36 0 27.9 0 18C0 8.1 8.10915 0 18.0203 0H27.0305V5.7H18.0203ZM35.9052 20.85H24.1626V14.85H35.9052V20.85ZM41.9797 0H32.9695V5.7H41.9797C48.8875 5.7 54.2936 11.1 54.2936 18C54.2936 24.9 48.8876 30.3 41.9797 30.3H32.9695V36H41.9797C51.8909 36 60 27.9 60 18C60 8.1 51.8909 0 41.9797 0ZM16.329 16.1302H18.2213C19.1473 16.1302 19.872 16.8523 19.872 17.775C19.872 18.6977 19.1473 19.4198 18.2213 19.4198H16.329V21.3052C16.329 22.2279 15.6042 22.95 14.6782 22.95C13.7522 22.95 13.0275 22.2279 13.0275 21.3052V19.4198H11.1351C10.2091 19.4198 9.48438 18.6977 9.48438 17.775C9.48438 16.8523 10.2091 16.1302 11.1351 16.1302H13.0275V14.2448C13.0275 13.3221 13.7522 12.6 14.6782 12.6C15.6042 12.6 16.329 13.3221 16.329 14.2448V16.1302ZM42.5633 17.768C43.9956 17.768 45.1567 16.6111 45.1567 15.184C45.1567 13.7569 43.9956 12.6 42.5633 12.6C41.131 12.6 39.9699 13.7569 39.9699 15.184C39.9699 16.6111 41.131 17.768 42.5633 17.768ZM50.3505 20.359C50.3505 21.7861 49.1894 22.943 47.7571 22.943C46.3248 22.943 45.1637 21.7861 45.1637 20.359C45.1637 18.9319 46.3248 17.775 47.7571 17.775C49.1894 17.775 50.3505 18.9319 50.3505 20.359Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="87.1215"
          y1="16.0334"
          x2="48.1899"
          y2="-36.8489"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB362" />
          <stop offset="0.324978" stopColor="#F06292" />
          <stop offset="1" stopColor="#651FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
