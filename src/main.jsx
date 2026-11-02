import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import QuotePage from './QuotePage.jsx'
import BookSnagging from './BookSnagging.jsx'
import BlogPage from './BlogPage.jsx'
import BlogPost from './BlogPost.jsx'

const path = window.location.pathname

const isQuotePage = path.endsWith('/quote') || path.endsWith('/quote/')
const isSnaggingPage = path.endsWith('/book-snagging') || path.endsWith('/book-snagging/')
const isBlogIndex = path.endsWith('/blog') || path.endsWith('/blog/')
const blogSlugMatch = path.match(/\/blog\/([^/]+)\/?$/)
const blogSlug = blogSlugMatch ? blogSlugMatch[1] : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isQuotePage ? (
      <QuotePage />
    ) : isSnaggingPage ? (
      <BookSnagging />
    ) : isBlogIndex ? (
      <BlogPage />
    ) : blogSlug ? (
      <BlogPost slug={blogSlug} />
    ) : (
      <App />
    )}
  </StrictMode>,
)
