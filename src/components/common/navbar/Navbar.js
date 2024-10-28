import { ADMIN_PATH, USER_PATH } from '../../../utils/constants';
import navigate from '../../../utils/navigation';
import './Navbar.css';

export function RenderNavbar(navbar, isUser, menu) {
  if (!navbar) {
    console.error('navbar element is not found');
    return;
  }

  const isActiveMenu = path => {
    const currentPath = window.location.pathname;

    if (path === '/admin') {
      return currentPath === '/admin';
    }

    if (path !== '/admin') {
      return (
        currentPath.startsWith(path) &&
        (currentPath === path || currentPath.charAt(path.length) === '/')
      );
    }

    return false;
  };

  navbar.addEventListener('click', e => {
    if (e.target.closest('.navbar-top')) {
      if (isUser) {
        navigate(USER_PATH.HOME);
      } else {
        navigate(ADMIN_PATH.HOME);
      }
    }
  });

  navbar.innerHTML = `
    <div class="navbar-top">
      <figure class="logo-circle"></figure>      
      <h1>DOPAMING</h1>
    </div>
    <ul class="menu">
      ${menu
        .map(menu => {
          const isActive = isActiveMenu(menu.path);
          return `
            <li class="menu-item">
              <a href="${menu.path}" class="menu-link ${isActive ? 'active' : ''}">
                <span class="material-symbols-rounded">${menu.icon}</span>   
                <span class="menu-link-title">${menu.title}</span>
              </a>
            </li>`;
        })
        .join('')}      
    </ul>
  `;
}
