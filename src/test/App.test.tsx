// Smoke tests for the main route shell and a few public pages.
import { render, screen } from '@testing-library/react'
import App from '../App'

const renderAtRoute = (route = '/home') => {
  window.history.pushState({}, 'Test page', route)
  return render(<App />)
}

test('renders the landing page', () => {
  renderAtRoute('/home')
  expect(
    screen.getByRole('heading', {
      name: 'Masterpiece comes with immaculate craftsmanship',
    })
  ).toBeInTheDocument()
})

test('renders the not found page for unknown routes', async () => {
  renderAtRoute('/unknown')
  expect(await screen.findByRole('heading', { name: '404 - Page Not Found' })).toBeInTheDocument()
})

test('renders the paused service page', async () => {
  renderAtRoute('/service')
  expect(await screen.findByRole('heading', { name: 'Commissions are paused' })).toBeInTheDocument()
  expect(screen.queryByText(/Keyboard Build Service/i)).not.toBeInTheDocument()
})

test('renders the policies page with anchor navigation', async () => {
  renderAtRoute('/policies')

  expect(await screen.findByRole('heading', { name: 'Term of Service' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Return Policy' })).toBeInTheDocument()

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' })
  expect(privacyLinks.some((link) => link.getAttribute('href') === '#privacy-policy')).toBe(true)
})
