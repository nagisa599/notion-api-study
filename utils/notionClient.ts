import { Client } from '@notionhq/client'

// Notion APIのクライアントを作成
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
})
