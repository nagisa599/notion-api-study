import { notion } from "@/utils/notionClient";
import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // すべてのオリジンからのアクセスを許可　後から変更する。
  "Access-Control-Allow-Methods": "GET", // 許可されるHTTPメソッド
  "Access-Control-Allow-Headers": "Content-Type", // 許可されるヘッダー
  "Content-Type": "application/json",
};

export async function GET() {
  try {
    const databaseId = process.env.NEXT_PUBLIC_DB_URL || "DEFAULT_DATABASE_ID";
    const notionResponse = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(notionResponse);
    const Response = await Promise.all(
      notionResponse.results.map(async (result: any) => {
        const id = result.id; // eslint-disable-line
        const title = result.properties.name.title[0].plain_text; // eslint-disable-line
        return { id, title };
      })
    );
    return new NextResponse(JSON.stringify(Response), {
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
