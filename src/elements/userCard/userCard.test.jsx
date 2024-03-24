
import UserCard from './userCard';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';



test('renders user name and sets opacity based on active prop', () => {
  const user = { name: 'Antonio Silva', userPhoto: 'photo.jpg' };

  // Renderizar com active = true
  const { getByText, rerender } = render(<UserCard user={user} active={true} />);
  expect(getByText('Antonio Silva')).toBeInTheDocument();
  expect(getByText('Antonio Silva').closest('.user-card')).toHaveStyle('opacity: 1');

  // Renderizar com active = false
  rerender(<UserCard user={user} active={false} />);
  expect(getByText('Antonio Silva').closest('.user-card')).toHaveStyle('opacity: 0.5');
});

test('renders user photo', () => {
    const user = { name: 'Antonio Silva', userPhoto: 'photo.jpg' };
    const { getByAltText } = render(<UserCard user={user} active={true} />);
    expect(getByAltText('Antonio Silva')).toBeInTheDocument();
  });
  
  test('does not render user card when no user is provided', () => {
    const { queryByTestId } = render(<UserCard user={null} active={true} />);
    expect(queryByTestId('user-card')).toBeNull();
  });
  
 

