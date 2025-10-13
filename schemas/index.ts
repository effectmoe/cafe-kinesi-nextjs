import menuItem from './menuItem'
import category from './category'
import shopInfo from './shopInfo'
import news from './news'
import event from './event'
import blogPost from './blogPost'
import author from './author'

// Course & Booking schemas
import instructor from './instructor'
import course from './course'
import booking from './booking'

// AI Chat & RAG schemas
import chatConfiguration from './chat/chatConfiguration'
import aiGuardrails from './ai/aiGuardrails'
import aiProviderSettings from './ai/aiProviderSettings'
import ragConfiguration from './rag/ragConfiguration'

export const schemaTypes = [
  menuItem,
  category,
  shopInfo,
  news,
  event,
  blogPost,
  author,
  // Course & Booking
  instructor,
  course,
  booking,
  // AI Chat & RAG
  chatConfiguration,
  aiGuardrails,
  aiProviderSettings,
  ragConfiguration
]