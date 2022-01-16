import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container-lg d-flex align-items-center justify-content-center flex-column h-100">
      <h1 className="text-center">{ t('not found description') }</h1>
      <nav>
        <Link to="/">{ t('links.home') }</Link>
      </nav>
    </div>
  );
};

export default NotFound;
