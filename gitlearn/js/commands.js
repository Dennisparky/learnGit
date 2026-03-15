// Commands handling and rendering

function createCodeBlock(text, label) {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = text;
    pre.appendChild(code);

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', () => {
        copyToClipboard(text, button);
    });

    wrapper.appendChild(pre);
    wrapper.appendChild(button);
    return wrapper;
}

function copyToClipboard(text, button) {
    if (!navigator.clipboard) {
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        button.textContent = 'Copied';
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'Copy';
        }, 1500);
    });
}

function renderCommands(commands) {
    const container = document.getElementById('commands-container');
    if (!container) {
        return;
    }

    container.innerHTML = '';

    commands.forEach(command => {
        const card = document.createElement('article');
        card.className = 'command-card';
        card.dataset.name = command.name.toLowerCase();

        const title = document.createElement('div');
        title.className = 'command-name';
        title.textContent = command.name;

        const description = document.createElement('p');
        description.className = 'command-description';
        description.textContent = command.description;

        const syntaxWrapper = document.createElement('div');
        syntaxWrapper.className = 'command-syntax';
        const syntaxLabel = document.createElement('div');
        syntaxLabel.className = 'command-label';
        syntaxLabel.textContent = 'Syntax';
        syntaxWrapper.appendChild(syntaxLabel);
        syntaxWrapper.appendChild(createCodeBlock(command.syntax));

        const exampleWrapper = document.createElement('div');
        exampleWrapper.className = 'command-example';
        const exampleLabel = document.createElement('div');
        exampleLabel.className = 'command-label';
        exampleLabel.textContent = 'Example';
        exampleWrapper.appendChild(exampleLabel);
        exampleWrapper.appendChild(createCodeBlock(command.example));

        const notesWrapper = document.createElement('div');
        notesWrapper.className = 'command-notes';
        const notesLabel = document.createElement('div');
        notesLabel.className = 'command-label';
        notesLabel.textContent = 'Typical use case';
        const notesText = document.createElement('p');
        notesText.textContent = command.notes;
        notesWrapper.appendChild(notesLabel);
        notesWrapper.appendChild(notesText);

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(syntaxWrapper);
        card.appendChild(exampleWrapper);
        card.appendChild(notesWrapper);

        container.appendChild(card);
    });
}

function loadCommands() {
    fetch('data/commands.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load commands: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data.commands)) {
                renderCommands(data.commands);
            }
        })
        .catch(error => {
            const container = document.getElementById('commands-container');
            if (container) {
                container.innerHTML = `<p>Unable to load commands. ${error.message}</p>`;
            }
            console.error(error);
        });
}

window.addEventListener('DOMContentLoaded', loadCommands);
