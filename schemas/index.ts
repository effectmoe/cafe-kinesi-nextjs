// AI-Firstスキーマ（最優先）
import person from './ai-first/person'
import service from './ai-first/service'
import organization from './ai-first/organization'
import aiContent from './ai-first/aiContent'

// ドキュメントスキーマ
import blogPost from './documents/blogPost'
import author from './documents/author'
import category from './documents/category'
import event from './documents/event'
import news from './documents/news'
import menuItem from './documents/menuItem'
import shopInfo from './documents/shopInfo'
import page from './documents/page'
import homepage from './documents/homepage'
import siteSettings from './documents/siteSettings'
import course from './documents/course'
import schoolPage from './documents/schoolPage'
import instructor from './documents/instructor'
import instructorPage from './documents/instructorPage'
import profilePage from './documents/profilePage'
import aboutPage from './documents/aboutPage'
import representative from './representative'
import { faq } from './faq'
import faqCard from './documents/faqCard'
import chatModal from './documents/chatModal'
import booking from './documents/booking'

// AI/RAGスキーマ
import chatConfiguration from './chat/chatConfiguration'
import aiGuardrails from './ai/aiGuardrails'
import aiProviderSettings from './ai/aiProviderSettings'
import ragConfiguration from './rag/ragConfiguration'
import { knowledgeBase } from './rag/knowledgeBase'

// オブジェクトスキーマ
import seo from './objects/seo'
import schemaOrg from './objects/schemaOrg'
import hero from './objects/hero'
import cta from './objects/cta'
import feature from './objects/feature'
import testimonial from './objects/testimonial'
import categoryCard from './objects/categoryCard'
import socialLink from './objects/socialLink'
import navigationMenu from './objects/navigationMenu'

// コンポーネントスキーマ
import customImage from './components/customImage'
import portableText from './components/portableText'
import videoEmbed from './components/videoEmbed'
import socialEmbed from './components/socialEmbed'
import codeBlock from './components/codeBlock'

export const schemaTypes = [
  // AI-First エンティティ（最優先）
  person,
  service,
  organization,
  aiContent,

  // ドキュメント
  blogPost,
  author,
  category,
  event,
  news,
  menuItem,
  shopInfo,
  page,
  homepage,
  siteSettings,
  course,
  schoolPage,
  instructor,
  instructorPage,
  profilePage,
  aboutPage,
  representative,
  faq,
  faqCard,
  chatModal,
  booking,

  // AI/RAG設定
  chatConfiguration,
  aiGuardrails,
  aiProviderSettings,
  ragConfiguration,
  knowledgeBase,

  // オブジェクト
  seo,
  schemaOrg,
  hero,
  cta,
  feature,
  testimonial,
  categoryCard,
  socialLink,
  navigationMenu,

  // コンポーネント
  customImage,
  portableText,
  videoEmbed,
  socialEmbed,
  codeBlock
]