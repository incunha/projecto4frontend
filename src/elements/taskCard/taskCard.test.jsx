import { render, fireEvent } from '@testing-library/react';
import TaskCard from './taskCard';

// Teste 1: Verifique se o componente TaskCard renderiza corretamente
test('renders TaskCard', () => {
  const task = { title: 'Test Task', priority: 100 };
  const { getByText } = render(<TaskCard task={task} active={true} />);
  expect(getByText('Test Task')).toBeInTheDocument();
});

// Teste 2: Verifique se o botão de exclusão é exibido para o ScrumMaster
test('shows delete button for ScrumMaster', () => {
    const task = { title: 'Test Task', priority: 100 };
    const loggedUser = { role: 'ScrumMaster' }; // Simula um usuário logado como ScrumMaster
    const { getByText } = render(<TaskCard task={task} active={true} loggedUser={loggedUser} />);
    expect(getByText('X')).toBeInTheDocument();
  });
  
  // Teste 3: Verifique se o botão de restauração é exibido para o Owner
  test('shows restore button for Owner', () => {
    const task = { title: 'Test Task', priority: 100 };
    const loggedUser = { role: 'Owner' }; // Simula um usuário logado como Owner
    const { getByAltText } = render(<TaskCard task={task} active={false} loggedUser={loggedUser} />);
    expect(getByAltText('Restore Icon')).toBeInTheDocument();
  });

// Teste 4: Verifique se o modal de confirmação de exclusão é exibido quando o botão de exclusão é clicado
test('shows delete confirmation modal on delete button click', () => {
  const task = { title: 'Test Task', priority: 100 };
  const { getByText } = render(<TaskCard task={task} active={true} />);
  fireEvent.click(getByText('X'));
  expect(getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
});

// Teste 5: Verifique se o modal de confirmação de restauração é exibido quando o botão de restauração é clicado
test('shows restore confirmation modal on restore button click', () => {
  const task = { title: 'Test Task', priority: 100 };
  const { getByAltText, getByText } = render(<TaskCard task={task} active={false} />);
  fireEvent.click(getByAltText('Restore Icon'));
  expect(getByText('Are you sure you want to restore this task?')).toBeInTheDocument();
});