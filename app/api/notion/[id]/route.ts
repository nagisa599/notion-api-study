import { NotionToMarkdown } from "notion-to-md";
import { NextResponse } from "next/server";
import { notion } from "@/utils/notionClient";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // すべてのオリジンからのアクセスを許可
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT", // 許可されるHTTPメソッド
  "Access-Control-Allow-Headers": "Content-Type", // 許可されるヘッダー
  "Content-Type": "application/json",
};
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);
    const response = mdString.parent;
    return new NextResponse(JSON.stringify(response), {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error(error); // エラーをコンソールに出力
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
}
