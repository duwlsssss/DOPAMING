import './style.css';
//import { getItem } from './utils/storage';

import Layout from './components/layouts/Layout';
import Route from './routes/Route';
class App {
  constructor() {
    this.layout = new Layout();
    this.Route = new Route();

    this.render();
  }

  // getUserRole() {
  //   return getItem('admin') || '';
  // }

  render() {
    const layoutComponent = new Layout();
    layoutComponent.render();
    this.Route.init();
  }
}

document.addEventListener('DOMContentLoaded', new App());
