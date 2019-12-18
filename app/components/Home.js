// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Home() {
  return <Redirect to={routes.AUTH} />;
}
