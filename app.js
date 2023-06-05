document.addEventListener('DOMContentLoaded', function() {
  const elementsContainer = document.getElementById('elements-container');
  const addElementBtn = document.getElementById('add-element-btn');

  // Загрузка элементов при загрузке страницы
  loadElements();

  addElementBtn.addEventListener('click', function() {
    addElement();
  });

  elementsContainer.addEventListener('click', function(event) {
    const target = event.target;
    const element = target.closest('.element');

    if (!element) {
      return;
    }

    if (target.classList.contains('context-menu')) {
      showContextMenu(element);
    } else if (target.classList.contains('move-up')) {
      moveElementUp(element);
    } else if (target.classList.contains('move-down')) {
      moveElementDown(element);
    } else if (target.classList.contains('edit')) {
      editText(element);
    } else if (target.classList.contains('delete')) {
      deleteElement(element);
    }
  });

  elementsContainer.addEventListener('keydown', function(event) {
    const element = event.target.closest('.element');

    if (!element) {
      return;
    }

    if (event.key === 'Enter') {
      if (element.classList.contains('editing')) {
        updateElementText(element);
      }
    } else if (event.key === 'Escape') {
      if (element.classList.contains('editing')) {
        cancelEdit(element);
      }
    }
  });

  function loadElements() {
    // Имитация запроса на сервер
    setTimeout(function() {
      var elements = [
        { number: 1, text: 'Элемент 1' },
        { number: 2, text: 'Элемент 2' },
        { number: 3, text: 'Элемент 3' }
      ];

      displayElements(elements);
    }, 500);
  }

  function addElement() {
  // Имитация запроса на сервер
    setTimeout(function() {
      const newElement = { number: elementsContainer.children.length, text: 'Новый элемент' };

      // Создание нового элемента
      const elementDiv = createNewElement(newElement);

      elementDiv.classList.add('show');

      // Получение родительского элемента кнопки "Добавить элемент"
      const parentElement = addElementBtn.parentNode;

      // Вставка нового элемента перед кнопкой "Добавить элемент"
      parentElement.insertBefore(elementDiv, addElementBtn);
    }, 500);
  }

  function updateElementNumbers() {
    const elementsContainer = document.getElementById('elements-container');
    const elements = Array.from(elementsContainer.getElementsByClassName('element'));
    // Обновление числовых значений элементов
    elements.forEach(function(element, index) {
      const numberDiv = element.querySelector('.number');
      console.log(numberDiv)
      numberDiv.textContent = index + 1;
    });
  }

  function moveElementUp(element) {
    // Имитация запроса на сервер
    setTimeout(function() {
      // Изменение порядка элемента в интерфейсе
      const prevElement = element.previousElementSibling;
      if (prevElement && prevElement !== addElementBtn) {
        elementsContainer.insertBefore(element, prevElement);
      }
      updateElementNumbers();
    }, 500);
    
  }

  function moveElementDown(element) {
    // Имитация запроса на сервер
    setTimeout(function() {
      // Изменение порядка элемента в интерфейсе
      const nextElement = element.nextElementSibling;
      if (nextElement && nextElement.classList.contains('element')) {
        elementsContainer.insertBefore(nextElement, element);
      }
    }, 500);
    updateElementNumbers()
  }

  function updateElementText(element) {
    // Имитация запроса на сервер
    setTimeout(function() {
      const input = element.querySelector('.description input');
      const newText = input.value;

      // Обновление текста элемента в интерфейсе
      const descriptionDiv = element.querySelector('.description');
      descriptionDiv.textContent = newText;

      element.classList.remove('editing');
    }, 500);
  }

  function cancelEdit(element) {
    const descriptionDiv = element.querySelector('.description');
    const input = element.querySelector('.description input');
    input.value = descriptionDiv.textContent;

    element.classList.remove('editing');
  }

  function showContextMenu(element) {
    const contextMenuDropdown = element.querySelector('.context-menu-dropdown');
    contextMenuDropdown.style.display = 'block';

    document.addEventListener('click', function hideContextMenu(event) {
      if (!event.target.classList.contains('context-menu')) {
        contextMenuDropdown.style.display = 'none';
        document.removeEventListener('click', hideContextMenu);
      }
    });
  }

  function editText(element) {
    const descriptionDiv = element.querySelector('.description');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = descriptionDiv.textContent;

    descriptionDiv.innerHTML = '';
    descriptionDiv.appendChild(input);
    input.focus();
    input.select();

    element.classList.add('editing');
  }

  function deleteElement(element) {
    element.classList.add('hide');
    // Имитация запроса на сервер
    setTimeout(function() {
      // Удаление элемента из интерфейса
      elementsContainer.removeChild(element);
      updateElementNumbers();
    }, 500);
  }

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createNewElement(data) {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('element');

    // Генерация случайного цвета для градиента справа
    const randomColor = generateRandomColor();

    // Создание градиентного фона
    elementDiv.style.background = `linear-gradient(to right, white, ${randomColor})`;

    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.textContent = data.number;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.textContent = data.text;

    const contextMenuDiv = document.createElement('div');
    contextMenuDiv.classList.add('context-menu');
    contextMenuDiv.textContent = '...';

    const contextMenuDropdownDiv = document.createElement('div');
    contextMenuDropdownDiv.classList.add('context-menu-dropdown');
    contextMenuDropdownDiv.innerHTML = `
      <ul>
        <li class="move-up">Передвинуть вверх</li>
        <li class="move-down">Передвинуть вниз</li>
        <li class="edit">Редактировать</li>
        <li class="delete">Удалить</li>
      </ul>
    `;

    elementDiv.appendChild(numberDiv);
    elementDiv.appendChild(descriptionDiv);
    elementDiv.appendChild(contextMenuDiv);
    elementDiv.appendChild(contextMenuDropdownDiv);

    return elementDiv;
  }

  function displayElements(elements) {
    const addElementBtn = document.getElementById('add-element-btn');
    const parentElement = addElementBtn.parentNode;

    elements.forEach(function(elementData) {
      const elementDiv = createNewElement(elementData);
      parentElement.insertBefore(elementDiv, addElementBtn);
    });
  }
});