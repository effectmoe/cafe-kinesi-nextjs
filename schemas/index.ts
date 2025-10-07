import menuItem from './menuItem'
import category from './category'
import shopInfo from './shopInfo'
import news from './news'
import event from './event'
import blogPost from './blogPost'
import author from './author'

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
  // AI Chat & RAG
  chatConfiguration,
  aiGuardrails,
  aiProviderSettings,
  ragConfiguration
]