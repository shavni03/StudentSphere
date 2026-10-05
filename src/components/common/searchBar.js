import { createIcon } from '../../icons.js';

export function renderSearchBar({ value = '', placeholder = 'Search...', id = 'main-search-input' }) {
  return `
    <div style="position: relative; width: 100%; max-width: 480px;">
      <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; display: flex; align-items: center;">
        ${createIcon('search', 18, 'var(--text-muted)')}
      </span>
      <input
        type="text"
        id="${id}"
        value="${value ? value.replace(/"/g, '&quot;') : ''}"
        placeholder="${placeholder}"
        class="form-input"
        style="padding-left: 38px; padding-right: 36px; height: 42px; border-radius: var(--radius-md); background-color: var(--bg-secondary); border: 1px solid var(--border-medium); font-size: 0.875rem;"
      />
      ${value ? `
        <button
          id="${id}-clear-btn"
          title="Clear search"
          style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center;"
        >
          ${createIcon('x', 14, 'currentColor')}
        </button>
      ` : ''}
    </div>
  `;
}

export function bindSearchBarEvents(container, id, onSearch, debounceMs = 300) {
  const input = container.querySelector(`#${id}`);
  if (!input) return;

  let timer = null;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch(e.target.value);
    }, debounceMs);
  });

  const clearBtn = container.querySelector(`#${id}-clear-btn`);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      onSearch('');
    });
  }
}
