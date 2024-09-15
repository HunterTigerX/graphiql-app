import { render, screen, within } from '@testing-library/react';
import TeamMemberCard from './TeamMemberCard';
import { describe, it, expect } from 'vitest';

describe('Team member card', () => {
  it('it should render correctly with the passed props', () => {
    const testProps = {
      name: 'Ivan Ivanov',
      role: 'test',
      description: 'lorem',
      imageSrc: '/images/avatar.jpg',
      githubLink: 'https://github.com/ivanivanov',
    };

    render(<TeamMemberCard {...testProps} />);

    expect(screen.getByText(testProps.name)).toBeInTheDocument();

    expect(screen.getByText(testProps.role)).toBeInTheDocument();

    expect(screen.getByText(testProps.description)).toBeInTheDocument();

    const avatar = screen.getByAltText(testProps.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', testProps.imageSrc);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', testProps.githubLink);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener');
  });
});

it('the GitHub link has the correct attributes', () => {
  const testProps = {
    name: 'Ivan Ivanov',
    role: 'test',
    description: 'lorem',
    imageSrc: '/images/avatar.jpg',
    githubLink: 'https://github.com/ivanivanov',
  };

  render(<TeamMemberCard {...testProps} />);

  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toHaveAttribute('href', testProps.githubLink);
  expect(githubLink).toHaveAttribute('target', '_blank');
  expect(githubLink).toHaveAttribute('rel', 'noopener');
});

it('it should correctly handle the absence of a description', () => {
  const testProps = {
    name: 'Ivan Ivanov',
    role: 'test',
    description: '',
    imageSrc: '/images/avatar2.jpg',
    githubLink: 'https://github.com/petrpetrov',
  };

  render(<TeamMemberCard {...testProps} />);

  const card = screen.getByText(testProps.name).closest('div');

  expect(within(card!).queryByText(/description/i)).not.toBeInTheDocument();

  expect(screen.getByAltText(testProps.name)).toBeInTheDocument();
  expect(screen.getByText(testProps.role)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', testProps.githubLink);
});
