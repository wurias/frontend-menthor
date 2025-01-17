
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileElem');
    const fileList = document.getElementById('fileList');

    // Previne o comportamento padrão para eventos de arrastar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Adiciona e remove a classe 'hover' ao arrastar
    ['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    function highlight(e) {
        if (e.type === 'dragover') {
            dropArea.classList.add('hover');
        } else {
            dropArea.classList.remove('hover');
        }
    }

    // Lida com o evento de soltar
    dropArea.addEventListener('drop', handleDrop, false);
    dropArea.addEventListener('click', () => fileInput.click());

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        const fileArray = Array.from(files);
        fileList.innerHTML = '';
        fileArray.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file.name;
            fileList.appendChild(li);
        });
    }