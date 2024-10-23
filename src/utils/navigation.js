import Router from '../routes/Router';

export const navigate = path => {
  history.pushState(null, null, path);
  Router();
};
