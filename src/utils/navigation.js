import Router from '../routes/Router';

const navigate = path => {
  history.pushState(null, null, path);
  Router();
};

export default navigate;
